import EventsManager from "./EventsManager";
import MapManager from "./MapManager";
import SpriteManager from "./SpriteManager";
import Player from "./Player"

export default class GameManager{
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.factory = {};
        this.entities = [];
        this.laterKill = [];

        this.mapManager = new MapManager();
        this.eventsManager = new EventsManager();
        this.spriteManager = new SpriteManager(this.mapManager);

        this.player = new Player(this.spriteManager);
    }

    initPlayer(obj) {
        this.player = obj;
    }

    kill(obj) {
        this.laterKill.push(obj);
    }

    update() {
        //console.log('update game manager');
        if(this.player === null) {
            return;
        } else {
            console.log('player exist');
            this.player.move_x = 0;
            this.player.move_y = 0;

            if(this.eventsManager.actionCursorPositionChanged()) {
                this.player.step();
            }

            this.entities.forEach(function (e) {
                try {
                    e.update();
                } catch (ex) {}
            });

            for(let i = 0; i < this.laterKill.length; i++) {
                let idx = this.entities.indexOf(this.laterKill[i]);
                if(idx > -1) {
                    this.entities.splice(idx, 1);
                }
            }

            if(this.laterKill.length > 0) {
                this.laterKill.length = 0;
            }

            this.mapManager.draw(this.ctx);
            this.mapManager.centerAt(this.player.pos_x, this.player.pos_y);
            this.player.draw(this.ctx);
            this.draw(this.ctx);
        }

    }

    draw() {
        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    }

    loadAll() {
        this.mapManager.loadMap('map.json');
        this.spriteManager.loadAtlas('atlas.json', 'images/spritesheets/spritesheet.png');

        this.factory['Player'] = this.player;
        //this.factory['Food'] =
        this.mapManager.draw(this.ctx);
        this.eventsManager.setup(this.canvas);

    }

    play() {
        //setInterval(updateWorld, 100);
        //setInterval(this.update(), 100).bind(this);
        setInterval(function () { this.update(); }.bind(this), 100);
    }
}