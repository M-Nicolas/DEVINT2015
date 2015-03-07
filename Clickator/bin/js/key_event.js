/*jslint browser: true*/
/*global $, jQuery, alert*/

var KeyPressed = function () {
    "use strict";

    if (KeyPressed.prototype.instance) {
        return KeyPressed.prototype.instance;
    }
    KeyPressed.prototype.instance = this;

    function re_read() {
        console.log("re read");
    }

    function cancel() {
        console.log("cancel");
        $(location).attr('href', "./select_music.html");
    }

    function help() {
        console.log("help2");
    }

    function validate() {
        console.log("validate");
    }
	
	function replay(){
		console.log("replay");
		$(location).attr('href', "./jouer.html");
	}
	
	function scores(){
		console.log("scores");
		$(location).attr('href', "./scores.html?fromgame=true");
	}
	
	function send_key(nb){
		console.log("keytapis : " + nb);
		new Game().set_user_input(nb);
	}

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
					// E : haut gauche
					case 101:
						event.preventDefault();
						if (fini){
							rejouer();
						} else {
							send_key(1);
						}
						break;
					// R : haut centre
					case 114:
						event.preventDefault();
						send_key(2);
						break;
					// T : haut droite
					case 116:
						event.preventDefault();
						send_key(3);
						break;
					// D : gauche
					case 100:
						event.preventDefault();
						send_key(4);
						break;
					// G : droite
					case 103:
						event.preventDefault();
						send_key(5);
						break;
					// C : bas gauche
					case 99:
						event.preventDefault();
						if (fini){
							scores();
						} else {
							send_key(6);
						}
						break;
					// V : bas centre
					case 118:
						event.preventDefault();
						send_key(7);
						break;
					// B : bas droite
					case 98:
						event.preventDefault();
						send_key(8);
						break;	
				}
				break;
        }


    });

};
