import GameManager from  "./GameManager"

export default class SoundManager {
    constructor(gameManager) {
        this.clips = {};
        this.context = null;
        this.gainNode = null;
        this.loaded = false;
        this.gameManager = gameManager;
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
            }.bind(this));
        }

    }

    play(path, settings) {
        if(!this.loaded) {
            setTimeout(function () {
                this.play(path, settings);
            }.bind(this), 1000);
            return;
        }

        console.log(path);
        let looping = false;
        let volume = 1;
        if(settings) {
            if(settings.looping) {
                looping = settings.looping;
            }
            if(settings.volume) {
                volume = settings.volume;
            }
        }

        let sd = this.clips[path];
        if(sd === null) {
            return false;
        }

        let sound = this.context.createBufferSource();
        sound.buffer = sd.buffer;
        sound.connect(this.gainNode);
        sound.loop = looping;
        this.gainNode.gain.value = volume;
        sound.start(0);
        return true;
    }


    playWorldSound(path, x, y) {
        if(this.gameManager.player === null) {
            return;
        }

        let viewSize = Math.max(this.gameManager.mapManager.view.w, this.gameManager.mapManager.view.h) * 0.8;

        let dx = Math.abs(this.gameManager.player.pos_x - x);
        let dy = Math.abs(this.gameManager.player.pos_y - y);

        let distance = Math.sqrt(dx * dx + dy * dy);
        let norm = distance / viewSize;

        if(norm > 1) {
            norm = 1;
        }
        let volume = 1.0 - norm;
        if(!volume) {
            return;
        }
        this.play(path, {looping: false, volume: volume});
    }

    toggleMute() {
        if(this.gainNode.gain.value > 0) {
            this.gainNode.gain.value = 0;
        } else {
            this.gainNode.gain.value = 1;
        }
    }

    stopAll() {
        this.gainNode.disconnect();
        this.gainNode = this.context.createGainNode(0);
        this.gainNode.connect(this.context.destination);
    }
}