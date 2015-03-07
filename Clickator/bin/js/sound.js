/**
 * Created by neowutran on 04/03/14.
 */
var Sound = function (music) {
    "use strict";

    //Ceci est un singleton
    if (Sound.prototype.instance) {
        return Sound.prototype.instance;
    }
    Sound.prototype.instance = this;
    window.AudioContext = window.AudioContext||window.webkitAudioContext;

    var context = new AudioContext(),
        sourceNode,
        analyser,
        javascriptNode,
        volumeNode,
        currentVolume = 0,
        paused = false,
        duration = 0,
        currentTime = 0,
        currentBuffer;

    this.duration = function(){
      return duration;
    };

    this.stop = function () {

        console.log("mute");
        if (!sourceNode.stop){
            sourceNode.stop = sourceNode.noteOff;
        }
        sourceNode.stop(0);
        sourceNode.buffer = null;

    };

    this.pause = function(){
      if(paused === false){
          paused=true;
          currentTime = context.currentTime;
          this.stop();

          //TODO

      }else{
          paused=false;
          setupAudioNodes();
          loadSound(music.src, currentTime);
      }

    };

    this.getVolume = function () {
        return currentVolume;
    };

    function setupAudioNodes() {

        // setup a javascript node
        javascriptNode = context.createScriptProcessor(2048, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(context.destination);

        // setup a analyzer
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.0;
        analyser.fftSize = 1024;

        // create a buffer source node
        sourceNode = context.createBufferSource();

        // connect the source to the analyser and the splitter
        //sourceNode.connect(splitter);
        sourceNode.connect(analyser);

        // connect the splitter to the javascriptnode
        // we use the javascript node to draw at a
        // specific interval.
        analyser.connect(javascriptNode);

        // and connect to destination
        if (!context.createGain){
            context.createGain = context.createGainNode;
        }
        volumeNode = context.createGain();
        sourceNode.connect(volumeNode);
        volumeNode.connect(context.destination);
        sourceNode.connect(context.destination);
    }

    this.mute = function(){
        //console.log("mute");
        volumeNode.gain.value = -1;
    };

    this.unmute = function(){
        //console.log("unmute");
        volumeNode.gain.value = 0.1;
    };

    function playSound(buffer) {
        //Set the volume
        currentBuffer = buffer;
        volumeNode.gain.value = 0.1;
        sourceNode.buffer = buffer;
        duration = sourceNode.buffer.duration;
        if (!sourceNode.start){
            sourceNode.start = sourceNode.noteOn;
        }
        sourceNode.onended = function () {
            Main().endGame(1);
        };

            sourceNode.start(0);
       }

    // log if an error occurs
    function onError(e) {
        console.log(e);
    }

    // load the specified sound
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload=function(e)
        {
            console.log(e);
                // decode the data
                context.decodeAudioData(request.response, function (buffer) {
                    // when the audio is decoded play the sound
                    playSound(buffer);
                }, onError);

        };
        request.send();
    }

    function getAverageVolume(array) {
        var values = 0,
            average,
            length = array.length,
            i;
        // get all the frequency amplitudes
        for (i = 0; i < length; i++) {
            values += array[i];
        }

        average = values / length;
        return average;
    }

    // load the sound
    setupAudioNodes();
    loadSound(music.src);

    // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume

    javascriptNode.onaudioprocess = function () {


        // get the average for the first channel
        var array = new Uint8Array(analyser.frequencyBinCount),
            average;
        analyser.getByteFrequencyData(array);
        average = getAverageVolume(array);
        currentVolume = average;

    };

};
