var fini = false;

var LevelGeneration = function () {
    'use strict';

    //Singleton
    if (LevelGeneration.prototype.instance) {
        return LevelGeneration.prototype.instance;
    }
    LevelGeneration.prototype.instance = this;

    /*Attributs de classes*/
    var JSONlevel = "",
        id = 0,
        obstacles = [],
        availableDirection = [],
    //Laisser un temps de repos entre 2 obstacle de 40 frame min
        cooldown = config.cooldown,
        currentCooldown = 0,
        difficulte = 1,
        timeBetween = 0,
        volumeActivate = 85; //difficulte : 1=facile, 2 = normal et 3 = difficile.

    availableDirection[1] = true;
    availableDirection[2] = true;
    availableDirection[3] = true;
    availableDirection[4] = true;
    availableDirection[5] = true;
    availableDirection[6] = true;
    availableDirection[7] = true;
    availableDirection[8] = true;

    this.generateObstacle = function (volume) {
        if(volumeActivate > 150){
            return true;
        }
        return volume > (volumeActivate - (difficulte * 15));
    };

    this.setDifficulte = function (difficult) {
        difficulte = difficult;
        if(difficulte === null){
            throw new ArgyrosException("Null pointer exception", "you cannot set difficulte to null");
        }

    };

    function getObstacles() {
        var newObstacles = [];
        obstacles.forEach(function (element) {
            if (element.distance <= 0) {
                newObstacles.push(element);
            }
        });
        return newObstacles;
    }

    function computeDelay(min, max) {
        return Math.floor(min + (Math.random() * (max - min)));
    }

    function removeListObstacles(listObstacles) {
        listObstacles.forEach(function (element) {
            var index = obstacles.indexOf(element);
            if (index !== -1) {
                obstacles.splice(index, 1);
            }
        });
    }

    function removeObstacles() {
        var listObstacles = getObstacles();
        removeListObstacles(listObstacles);
    }

    function removeObstaclesByDirection(direction){
        var listObstacles = getObstaclesByDirection(direction);
        removeListObstacles(listObstacles);
    }

    function getObstaclesByDirection(direction){
        var newObstacles = [];
        obstacles.forEach(function (element) {
            if (element.direction === direction) {
                newObstacles.push(element);
            }
        });
        return newObstacles;
    }

    function numberOfObstacle(){
        return obstacles.length;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    this.generate = function (volume,game_obstacles) {
        JSONlevel = "";

        var directionIterator,
            generateObstacle,
            distance,
            game_obstacle,
            tobe_removed = [];

        availableDirection[1] = true;
        availableDirection[2] = true;
        availableDirection[3] = true;
        availableDirection[4] = true;
        availableDirection[5] = true;
        availableDirection[6] = true;
        availableDirection[7] = true;
        availableDirection[8] = true;

        tobe_removed[1] = false;
        tobe_removed[2] = false;
        tobe_removed[3] = false;
        tobe_removed[4] = false;
        tobe_removed[5] = false;
        tobe_removed[6] = false;
        tobe_removed[7] = false;
        tobe_removed[8] = false;

        obstacles.forEach(function (obstacle) {
            //Rapprochement de l'obstacle du joueur
            obstacle.distance--;

            //Notifier l'impact de l'obstacle
            if (obstacle.distance === 0) {
                if (JSONlevel !== "") {
                    JSONlevel += ",";
                }
                JSONlevel += JSON.stringify(obstacle);

            }else{
                //On compare notre liste d'obstacle a celle du joueur, si il y a des element de differences (obstacles evité par le joueur, alors on lui
                // attribue des points et on met a jour notre liste d'obstacle)
                availableDirection[obstacle.direction] = false;
                game_obstacle = $.grep(game_obstacles, function(element){
                    return element.id === obstacle.id;
                });
                if(game_obstacle.length === 0){
                    availableDirection[obstacle.direction] = true;
                    tobe_removed[obstacle.direction] = true;
                    Game().setWinScore(Math.round(((obstacle.distance * difficulte * 10)/Sound().duration())*60));
                    Game().setScore(Game().getScore() + Math.round(((obstacle.distance * difficulte * 10)/Sound().duration())*60));
                }
            }
        });
        for(directionIterator = 1; directionIterator < 8 ; directionIterator++){
            if(tobe_removed[directionIterator] === true){
                removeObstaclesByDirection(directionIterator);
            }
        }

        //On supprime de notre liste d'obstacles les obstacles ayant une distance <= 0
        removeObstacles();

            directionIterator = Math.ceil(getRandomArbitrary(1,8)) -1;

        switch (difficulte){
            case difficulteEnum.FACILE:
                if(timeBetween > 120){
                    volumeActivate -= 5;
                    timeBetween = 0;
                    console.log("ajustement lvl: + vite");
                }
                if(numberOfObstacle() > 1){
                    console.log("ajustement lvl: - vite");
                    volumeActivate += 1;
                    timeBetween = 0;
                }
                break;
            case difficulteEnum.NORMAL:
                if(timeBetween > 100){
                    volumeActivate -=5;
                    timeBetween = 0;
                }
                if(numberOfObstacle() > 2){
                    volumeActivate += 1;
                    timeBetween = 0;
                }
                break;
            case difficulteEnum.DIFFICILE:
                if(timeBetween > 60){
                    volumeActivate -= 5;
                    timeBetween = 0;
                }
                if(numberOfObstacle() > 4){
                    volumeActivate += 1;
                    timeBetween = 0;
                }
                break;


        }
            //si il est autorisé de generer un obstacle
            if (availableDirection[directionIterator] === true && volume !== 0 && currentCooldown <= 0 && ((difficulte === 1 && numberOfObstacle() === 0) || (difficulte === 2 && numberOfObstacle() < 3 ) || (difficulte === 3 && numberOfObstacle() < 5))) {

                //on lance une change de generation d'un obstacle
                generateObstacle = this.generateObstacle(volume);

                //on defini la distance de l'obstacle par rapport au joueur
                //TODO faire mieux que ca
                if (difficulte === difficulteEnum.FACILE) {
                    distance = computeDelay(190, 230);
                } else if (difficulte === difficulteEnum.NORMAL) {
                    distance = computeDelay(140, 180);
                } else if (difficulte === difficulteEnum.DIFFICILE) {
                    distance = computeDelay(100, 140);
                }
                //on notifie le jeu de l'obstacle si il y en a un
                if (generateObstacle === true) {
                    timeBetween = 0;
                    var tmp = directionIterator;
                    console.log(directionIterator);
                    obstacles.push(
                        {
                            "distance" : distance,
                            "direction": directionIterator,				//1 -> down  2-> up.
                            "id"       : id					//time when the obstacle pop.
                        }

                    );

                    if (JSONlevel !== "") {
                        JSONlevel += ",";
                    }

                    JSONlevel += JSON.stringify({
                        "distance" : 1,
                        "direction": directionIterator,				//1 -> down  2-> up.
                        "id"       : id					//time when the obstacle pop.
                    });
                    directionIterator=tmp;
                    id++;
                    availableDirection[directionIterator] = false;

                    currentCooldown = cooldown;
                    //Ne pas generer plus de 1 obstacle par frame
                }else{
                    timeBetween++;
                }
            }else{
                timeBetween++;
            }


        currentCooldown--;
        JSONlevel = "[" + JSONlevel + "]";
        return JSONlevel;
    };

};
