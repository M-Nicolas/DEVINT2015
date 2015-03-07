/*License (MIT)

 Copyright © 2013 Matt Diamond

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 DEALINGS IN THE SOFTWARE.
 */
var Recorder = function (source, cfg) {
    'use strict';

    var WORKER_PATH = 'recorderWorker.js',
        config = cfg || {},
        bufferLen = config.bufferLen || 4096,
        recording = false,
        currCallback,
        worker;

    this.context = source.context;
    if (!this.context.createScriptProcessor) {
        this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
    } else {
        this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
    }

    worker = new Worker(WORKER_PATH);
    worker.postMessage({
        command: 'init',
        config: {
            sampleRate: this.context.sampleRate
        }
    });

    this.node.onaudioprocess = function (e) {
        if (!recording) {
            return;
        }
        worker.postMessage({
            command: 'record',
            buffer: [
                e.inputBuffer.getChannelData(0),
                e.inputBuffer.getChannelData(1)
            ]
        });
    };

    this.record = function () {
        recording = true;
    };

    this.stop = function () {
        recording = false;
    };

    this.clear = function () {
        worker.postMessage({ command: 'clear' });
    };

    this.getBuffers = function (cb) {
        currCallback = cb || config.callback;
        worker.postMessage({ command: 'getBuffers' });
    };

    this.exportWAV = function (cb, type) {
        currCallback = cb || config.callback;
        type = type || config.type || 'audio/wav';
        if (!currCallback) {
            throw new Error('Callback not set');
        }
        worker.postMessage({
            command: 'exportWAV',
            type: type
        });
    };

    worker.onmessage = function (e) {
        var blob = e.data;
        currCallback(blob);
    };

    source.connect(this.node);
    this.node.connect(this.context.destination);   // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.


    this.setupDownload = function (blob, filename) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var link = document.getElementById("save");
        link.href = url;
        link.download = filename || 'output.wav';
    };

    this.saveToFile = function (blob, filename) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var link = document.getElementById("save");
        link.href = url;
        link.download = filename || 'output.wav';
    };

};
var recorder = new Recorder(window);
