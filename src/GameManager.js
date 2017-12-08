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
        this.eventsManager = new EventsManager(this.canvas);
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
            //console.log('player exist');
            this.player.move_x = 0;
            this.player.move_y = 0;

            if(this.eventsManager.onMousePressed || this.eventsManager.cursorPositionChanged) {
                this.player.move_x = this.eventsManager.mouse_x - 32;
                this.player.move_y = this.eventsManager.mouse_y - 32;
                this.player.step(this.player.move_x, this.player.move_y);
            } else {
                this.player.move_x = -1;
                this.player.move_y = -1;
                this.player.step(this.player.move_x, this.player.move_y);
            }

            /*if(this.eventsManager.actions[0]) {
                //console.log('move to = ' + this.eventsManager.mouse_x + this.eventsManager.mouse_y);
                this.player.move_x = this.eventsManager.mouse_x;
                this.player.move_y = this.eventsManager.mouse_y;
                this.player.step(this.player.move_x, this.player.move_y);
            }

            if(this.eventsManager.actions[1]) {
                this.player.stopMove();
            }*/

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

            //this.ctx.clearRect(this.player.pos_x - 64, this.player.pos_y - 64, this.player.pos_x + 64, this.player.pos_y + 64);
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
        this.eventsManager.setup();

    }

    play() {
        //setInterval(updateWorld, 100);
        //setInterval(this.update(), 100).bind(this);
        setInterval(function () { this.update(); }.bind(this), 10);
    }
}