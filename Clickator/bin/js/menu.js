/*jslint browser: true*/
/*global $, jQuery, alert*/

/* classe menu */
var Menu = function () {
    "use strict";

    /* variables */
    var menu = ["jouer", "scores"],
        sound,
        index_selectionne = 0;

    /* singleton */
    if (Menu.prototype.instance) {
        return Menu.prototype.instance;
    }
    Menu.prototype.instance = this;

    /* constructeur */
    selectionMenu(getMenuSelectionne());

    $("body").keypress(function (event) {
        switch (event.keyCode) {
            //F1
            case 112:
                event.preventDefault();
                help();
                break;
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
			case 0 :
				switch (event.charCode) {
					// R : haut centre
					case 114:
						event.preventDefault();
						key_up();
						break;
					/*// D : gauche
					case 100:
						event.preventDefault();
						send_key(4);
						break;*/
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
	
	function getIndex(nomMenu){
		return menu.indexOf(nomMenu);
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

    function selectionMenu(nomMenu) {
        console.log("selection menu");
        var i;
        for (i = 0; i < menu.length; i++) {
            $("#" + menu[i]).attr("class", "nselectionne");
        }
		index_selectionne = getIndex(nomMenu);
        $("#" + nomMenu).attr("class", "selectionne");
        lire_son(getSoundAdress());
    }

    function update() {
        console.log("update");
        selectionMenu(getMenuSelectionne());
    }

    function getSoundAdress() {
        console.log("get sound adress");
        //var nommenu = getMenuSelectionne();
        //return configMenu.nommenu;
        switch (getMenuSelectionne()) {
            //case "jouer" : return configMenu.jouer;
            case "aide" :
                return configMenu.menu_aide1;
            case "jouer" :
                return configMenu.menu_jouer1;
            case "regles" :
                return configMenu.menu_regles1;
            case "preferences" :
                return configMenu.menu_preferences1;
            case "scores" :
                return configMenu.menu_scores1;
            default :
                return "erreur";
        }
        //return "music/menu/menu-" + getMenuSelectionne() + "1.ogg";
    }

    function re_read() {
        console.log("re read");
        update();
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
        $(location).attr('href', $("#" + getMenuSelectionne()).attr("data-link"));
    }
	
	this.clickOn = function(nom){
		console.log("click on" + nom);
		selectionMenu(nom);
		validate();
	}
	
	this.mouseOn = function(nom){
		console.log("mouse on" + nom);
		selectionMenu(nom);
	}

};

var menuPrincipal = new Menu();

