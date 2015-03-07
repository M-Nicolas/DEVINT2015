
var Game = function (difficulte) {
    "use strict";

    //Ceci est un singleton
    if (Game.prototype.instance) {
        return Game.prototype.instance;
    }
    Game.prototype.instance = this;

    var user_input = 0,
        frame = 0,
        level,
        obstacles = [],
    //nombre de chance de collision avant echec de la partie
        score = 0,
        paused = false;

    this.getPause = function(){
        return paused;
    };

    new LevelGeneration().setDifficulte(difficulte);

    function getObstacles(direction) {
        var newObstacles = [];
        obstacles.forEach(function (element) {
            if (element.direction === direction) {
                newObstacles.push(element);
            }
        });
        return newObstacles;
    }

    function removeListObstacles(listObstacles) {
        listObstacles.forEach(function (element) {
            var index = obstacles.indexOf(element);
            if (index !== -1) {
                obstacles.splice(index, 1);
            }
        });
    }

    function inArray(element) {
        var isInArray = false;
        obstacles.forEach(function (elem) {
            if (element.id === elem.id) {
                isInArray = true;
            }
        });
        return isInArray;
    }

    function removeObstacles(direction) {
        var listObstacles = getObstacles(direction);
        removeListObstacles(listObstacles);
        popdown_taupiqueur(direction);
    }

    function popup_taupiqueur(id) {
        var video = $("#taupi" + id);
        video.get(0).currentTime = 0;
        video.get(0).play();
    }

    function popdown_taupiqueur(id) {
        var video = $("#taupi" + id);
        video.get(0).pause();
        video.get(0).currentTime = 0;
    }

    function calculate_frame() {
        if (user_input !== 0) {
            removeObstacles(user_input);
        }

        user_input = 0;

        if ($.isEmptyObject(level)) {
            return;
        }

        level.forEach(function (element) {
            if (element.distance === 1) {
                console.log("dispo: " + element.direction);
                obstacles.push(element);
                popup_taupiqueur(element.direction);
                //TODO lire direction audio pour aveugle
            }
            if (element.distance === 0 && inArray(element)) {
                removeObstacles(element.direction);
            }
            if (element.distance === 0) {
                popdown_taupiqueur(element.direction);
            }
        });
    }

    this.run_game = function (volume) {
        if(paused === false){
            level = JSON.parse(LevelGeneration().generate(volume, obstacles));
            calculate_frame();
            frame++;
        }
    };

    this.set_user_input = function (new_user_input) {
        user_input = new_user_input;
    };

    this.getScore = function () {
        return score;
    };

    this.setScore = function (new_score) {
        score = new_score;
        $("#score").html(score);
    };
	
	this.setWinScore = function (nombre) {
			var texte = "+" + nombre;
			$('#nbwin').html(texte);
			$('#nbwin').show();
			$('#nbwin').delay(300).fadeOut("fast" ); 
	}
	
    this.pause = function (){
        if(paused === false){
          paused = true;
          $("#boutonPause").val("Reprendre");
          Sound().pause();
        }else{
          paused = false;
          $("#boutonPause").val("Pause");
          Sound().pause();
        }
    };

};
