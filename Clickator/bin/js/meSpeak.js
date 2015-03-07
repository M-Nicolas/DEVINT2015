/**
 * Created by draragar on 3/31/14.
 */
var MeSpeak = function () {
    "use strict";

    //Ceci est un singleton
    if (MeSpeak.prototype.instance) {
        return MeSpeak.prototype.instance;
    }
    MeSpeak.prototype.instance = this;

    var init = 0;

    this.play = function (message, lang) {

        if(init === 0){

            if(lang === "fr"){
                meSpeak.loadVoice("js/mespeak/voices/fr.json");
            }else{
                meSpeak.loadVoice("js/mespeak/voices/en/en.json");
            }
            meSpeak.loadConfig("js/mespeak/mespeak_config.json");
            init = 1;
        }

        meSpeak.stop();
        meSpeak.speak(message, {
            amplitude: 100,
            wordgap  : 0,
            pitch    : 45,
            speed    : 34,
            variant  : ''
        });
    };

};

var speak = new MeSpeak();
