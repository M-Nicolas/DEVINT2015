/*jslint browser: true*/
/*global $, jQuery, alert*/

/* classe menu */
var MenuJouer = function () {
    "use strict";
    /* variables */
    var menu = ["facile", "normal", "difficile"],
        sound,
        index_selectionne = 0;
		
		// Lecture du cookie afin de retrouver la couleur du menu sauvegardé
		if (!(defaultColor = readCookie("color"))) {
				defaultColor = 0;
		}

    /* singleton */
    if (MenuJouer.prototype.instance) {
        return MenuJouer.prototype.instance;
    }
    MenuJouer.prototype.instance = this;

    /* constructeur */
    selectionMenu(getMenuSelectionne());

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
			case 114:
			// F3
				event.preventDefault();
				defaultColor++;
				if (defaultColor > configBackgroundColorNSelec.length-1) {
					defaultColor = 0;
				}
				menuColors();
				createCookie("color", defaultColor, 400);
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

    /* fonctions */

    function getMenuSelectionne() {
        console.log("get menu selectionne");
        return menu[index_selectionne];
    }

    function lire_son(src) {
        if(sound!=null){
            sound.pause();
            sound.currentTime = 0;
        }
        console.log("lire son");
        sound = new Audio(src);
        sound.play();

    }
	
	function getIndex(nomMenu){
		return menu.indexOf(nomMenu);
	}

    function selectionMenu(nomMenu) {
        console.log("selection menu");
        var i;
        for (i = 0; i < menu.length; i++) {
            $("#" + menu[i]).attr("class", "nselectionne");
        }
		index_selectionne = getIndex(nomMenu);
        $("#" + nomMenu).attr("class", "selectionne");
        lire_son(getSoundAdress());
		menuColors();
    }

    function update() {
        console.log("update");
        selectionMenu(getMenuSelectionne());
    }
	
	function menuColors() {
			$(".nselectionne").css("background-color", configBackgroundColorNSelec[defaultColor]);
			$(".selectionne").css("background-color", configBackgroundColorSelec[defaultColor]);
			$(".nselectionne").css("color", configFontColorNSelec[defaultColor]);
			$(".selectionne").css("color", configFontColorSelec[defaultColor]);
	}

    function getSoundAdress() {
        switch (getMenuSelectionne()) {
            case "facile" :
                return configMenu.menu_facile1;
            case "normal" :
                return configMenu.menu_normal1;
            case "difficile" :
                return configMenu.menu_difficile1;
            default :
                return "erreur";
        }
    }

    function re_read() {
        console.log("re read");
        update();
    }

    function cancel() {
        console.log("cancel");
        $(location).attr('href', "./index.html");

    }

    function help() {
        console.log("help");
    }

    function key_up() {
        console.log("keyup");
        index_selectionne--;
        if (index_selectionne < 0) {
            index_selectionne = menu.length - 1;
        }
        update();
    }

    function key_down() {
        console.log("keydown");
        index_selectionne++;
        if (index_selectionne >= menu.length) {
            index_selectionne = 0;
        }
        update();
    }

    function validate() {
        console.log("validate");
        var difficulte = 1;
        switch (getMenuSelectionne()) {
            case "facile":
                difficulte = 1;
                break;
            case "normal":
                difficulte = 2;
                break;
            case "difficile":
                difficulte = 3;
                break;
            default :
                difficulte = 1;
                break;
        }
        localStorage.setItem("difficulte", difficulte);
        $(location).attr('href', $("#" + getMenuSelectionne()).attr("data-link"));
    }
	
	this.clickOn = function(nom){
		console.log("click on" + nom);
        //createCookie("Difficulty", nom, 400);
        DifficultyPartie = nom;
        //alert(DifficultyPartie);
		selectionMenu(nom);
		validate();
	}
	
	this.mouseOn = function(nom){
		console.log("mouse on" + nom);
		selectionMenu(nom);
	}

};

var menuPrincipal = new MenuJouer();

