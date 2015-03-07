/**
 * Created by draragar on 4/7/14.
 */
var Micro = function(){
    "use strict";

    //Ceci est un singleton
    if (Micro.prototype.instance) {
        return Micro.prototype.instance;
    }
    Micro.prototype.instance = this;


    /* Copyright 2013 Chris Wilson

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
     */

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var audioContext = new AudioContext(),
        audioInput = null,
        realAudioInput = null,
        inputPoint = null,
        audioRecorder = null,
        recIndex = 0;

    function doneEncoding( blob ) {
        Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
        recIndex++;
    }

    function saveAudio() {
        audioRecorder.exportWAV( doneEncoding );
        // could get mono instead by saying
        // audioRecorder.exportMonoWAV( doneEncoding );
    }

    function toggleRecording( e ) {
        if (e.classList.contains("recording")) {
            // stop recording
            audioRecorder.stop();
            e.classList.remove("recording");
            audioRecorder.getBuffers( gotBuffers );
        } else {
            // start recording
            if (!audioRecorder){
                return;
            }
            e.classList.add("recording");
            audioRecorder.clear();
            audioRecorder.record();
        }
    }

    function gotStream(stream) {
        inputPoint = audioContext.createGain();

        // Create an AudioNode from the stream.
        realAudioInput = audioContext.createMediaStreamSource(stream);
        audioInput = realAudioInput;
        audioInput.connect(inputPoint);

        var zeroGain;

        audioRecorder = new Recorder( inputPoint );
        zeroGain = audioContext.createGain();
        zeroGain.gain.value = 0.0;
        inputPoint.connect( zeroGain );
        zeroGain.connect( audioContext.destination );
        updateAnalysers();
    }

    this.initAudio = function() {
        if (!navigator.getUserMedia){
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        }

        navigator.getUserMedia({audio:true}, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
    };
};
var micro = new Micro();
micro.initAudio();
