/**
 * Created by draragar on 4/1/14.
 */
/*jslint browser: true*/
/*global $, jQuery, alert*/

/* classe menu */
if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str){
        "use strict";
        return this.slice(0, str.length) === str;
    };
}

var SelectMusic = function () {
    "use strict";

    /* variables */
    var index_selectionne = 0,
        music_src,
        music_type,
        currentDirectory = localStorage.getItem("directory"),
        music_play;

    if( currentDirectory === null){
        currentDirectory = "";
    }

    /* singleton */
    if (SelectMusic.prototype.instance) {
        return SelectMusic.prototype.instance;
    }
    SelectMusic.prototype.instance = this;
    display_music();

    $("body").keypress(function (event) {
        switch (event.keyCode) {
            //F1
            case 112:
                event.preventDefault();
                help();
                break;
            //F2
            case 113:
                event.preventDefault();
                re_read();
                break;
            //key up
            case 38:
                event.preventDefault();
                key_up();
                break;
            //key down
            case 40:
                event.preventDefault();
                key_down();
                break;
            //enter
            case 13:
                event.preventDefault();
                validate();
                break;
            //escape
            case 27:
                event.preventDefault();
                cancel();
                break;
			case 0 :
				switch (event.charCode) {
					// R : haut centre
					case 114:
						event.preventDefault();
						key_up();
						break;
					// D : gauche
					case 100:
						event.preventDefault();
						cancel();
						break;
					// G : droite
					case 103:
						event.preventDefault();
						validate();
						break;
					// V : bas centre
					case 118:
						event.preventDefault();
						key_down();
						break;
				}
				break;
        }

    });

    function occurrences(string, subString, allowOverlapping){

        string+=""; subString+="";
        if(subString.length<=0){
            return string.length+1;
        }

        var n=0,
            pos= 0,
            step=allowOverlapping?(1):(subString.length);

        while(true){
            pos=string.indexOf(subString,pos);
            if(pos>=0){ n++; pos+=step; } else{
                break;
            }
        }
        return n;
    }

    function display_music() {
        $("#tmenu").html("");
        var first = 1,
        folder=[];

        music_list.forEach(function (music) {

            if(music.file.lastIndexOf(currentDirectory, 0) !== 0){
                return;
            }

            var splice = music.file.split("/"),
                data_type,
                data_file,
                buttonType;

            if(splice.length === occurrences(currentDirectory, "/") +1){

                data_type = "file";
                data_file = splice.join("/");

            }else{

                data_type = "folder";
                data_file = splice[0]+"/";
                if($.inArray(data_file, folder) !== -1){
                    return;
                }
                folder = folder.concat(data_file);
            }


            if (first === 1) {

                music_src = data_file;
                music_type = data_type;
                buttonType = "selectionne";
                first = 0;
                if(music_type === "folder"){
                    speak.play(music_src);
                }else{
                    music_play = new Audio("music/"+music_src);
                    music_play.play();
                }

            } else {
                buttonType = "nselectionne";
            }

            $("#tmenu").append("<tr><td class='music " + buttonType + "' data-type='"+data_type+"'  data-file='"+data_file+"'>" + data_file + "</button>");

        });

    }

    function update() {

        $('.music').each(function (index, element) {
            if (index === index_selectionne) {

                if(music_play !==  null && music_play !== undefined){
                    music_play.pause();
                //    music_play.currentTime = 0;
                }
                music_src = $(this).data("file");
                music_type = $(this).data("type");
                if(music_type === "folder" ){
                    speak.play($(this).text());
                }else{
                    music_play = new Audio("music/"+music_src);
                    music_play.play();
                }


                $(element).attr("class", "music selectionne");
                var $position = $(element).offset();
                console.log($position.top+' '+$position.left);
                scrollTo(0,$position.top);
            } else {
                $(element).attr("class", "music nselectionne");
            }



        });

    }

    function re_read() {
        console.log("re read");
        update();
    }

    function cancel() {
        if(music_play !==  null && music_play !== undefined){
            music_play.pause();
            //    music_play.currentTime = 0;
        }
        if(occurrences(currentDirectory, "/") === 0){

            console.log("cancel");
            $(location).attr('href', "./menu-jouer.html");

        }else{

            currentDirectory = currentDirectory.substring(0, currentDirectory.length-1);

            var index = currentDirectory.indexOf("/");
            currentDirectory = currentDirectory.substring(0, index !== -1 ? index : currentDirectory.length);
            if(index === -1){
                currentDirectory = "";
            }
            localStorage.setItem("directory", currentDirectory);
            display_music();
        }
    }

    function help() {
        console.log("help");
    }

    function key_up() {
        console.log("keyup");
        index_selectionne--;
        if (index_selectionne < 0) {
            index_selectionne = music_list.length - 1;
        }
        update();
    }

    function key_down() {
        console.log("keydown");
        index_selectionne++;
        if (index_selectionne >= music_list.length) {
            index_selectionne = 0;
        }


        update();
    }

    function validate() {

        if(music_type === "folder"){

            currentDirectory += music_src;
            localStorage.setItem("directory", currentDirectory);
            display_music();

        }else{

            localStorage.setItem("music", "music/" + music_src);
            localStorage.setItem("directory", currentDirectory);
            $(location).attr('href', "./jouer.html");

        }


    }

};

var selectMusic = new SelectMusic();

