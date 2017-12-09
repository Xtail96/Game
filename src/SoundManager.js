export default class SoundManager {
    constructor() {
        this.clips = {};
        this.context = null;
        this.gainNode = null;
        this.loaded = false;
    }

    init() {
        this.context = new AudioContext();
        this.gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
        this.gainNode.connect(this.context.destination);

    }

    load(path, callback) {
        if(this.clips[path]) {
            callback(this.clips[path]);
            return;
        }

        let clip = {path: path, buffer: null, loaded: false};

        clip.play = function (volume, loop) {
            this.play(this.path, {looping:loop?loop: false, volume:volume?volume:1});
        }.bind(this);

        this.clips[path] = clip;
        let request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            this.context.decodeAudioData(request.response, function (buffer) {
                clip.buffer = buffer;
                clip.loaded = true;
                callback(clip);
            });
        }.bind(this);
        request.send();
    }

    loadArray(array) {
        for(let i = 0; i < array.length; i++) {
            this.load(array[i], function () {
                if(array.length === Object.keys(this.clips).length) {
                    for(let sd in this.clips) {
                        if(!this.clips[sd].loaded) {
                            return;
                        }
                    }
                    this.loaded = true;
                }
            }).bind(this);
        }

    }

    play(path, settings) {

    }
}