import EventsManager from "./EventsManager";
import MapManager from "./MapManager";
import SpriteManager from "./SpriteManager";
import PhysicManager from "./PhysicManager";
import Player from "./Player"
import Plant from "./Plant";
import Enemy from "./Enemy"

export default class GameManager{
    constructor(canvas, ctx, plantsCount = 100, enemyCount = 10, enemyLimit = 10) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.plantCount = plantsCount;
        this.enemyCount = enemyCount;
        this.enemyLimit = enemyLimit;

        this.factory = {};
        this.entities = [];
        this.laterKill = [];

        this.mapManager = new MapManager();
        this.eventsManager = new EventsManager(this.canvas);
        this.spriteManager = new SpriteManager(this.mapManager);
        this.physicManager = new PhysicManager();

        this.player = new Player(this.spriteManager);
    }

    initPlayer(obj) {
        this.player = obj;
    }

    kill(obj) {
        this.laterKill.push(obj);
    }

    update() {
        if(this.player === null) {
            console.log('player has been killed');
            //alert('Вы стали частью чего-то большего');
            return;
        } else {
            this.player.move_x = 0;
            this.player.move_y = 0;

            if(this.eventsManager.cursorPositionChanged) {
                this.player.move_x = this.mapManager.view.x + this.eventsManager.mouse_x;
                this.player.move_y = this.mapManager.view.y + this.eventsManager.mouse_y;
                this.player.step(this.player.move_x, this.player.move_y);
                //console.log(this.player.pos_x + ' ' + this.player.pos_y);
            }

            this.plantCount = this.getPlantCount();
            this.enemyCount = this.getEnemyCount();
            if(this.plantCount <= this.enemyCount) {
                this.generatePlants(this.enemyCount);
            }
            if(this.enemyCount < this.enemyLimit) {
                this.generateEnemies(1);
            }
            console.log(this.plantCount + ' ' + this.enemyCount);

            this.entities.forEach(function (e) {
                try {
                    e.update(this);
                } catch (ex) {}
            }.bind(this));

            for(let i = 0; i < this.laterKill.length; i++) {
                let idx = this.entities.indexOf(this.laterKill[i]);
                if(idx > -1) {
                    this.entities.splice(idx, 1);
                }
            }

            if(this.laterKill.length > 0) {
                for(let i = 0; i < this.laterKill.length; i++) {
                    if(this.laterKill[i].name === 'Player') {
                        this.player = null;
                    }
                }
                this.laterKill.length = 0;
            }
            this.draw();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapManager.centerAt(this.player.pos_x, this.player.pos_y);
        this.mapManager.draw(this.ctx);

        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    }

    loadAll() {
        this.mapManager.loadMap('map.json');
        this.spriteManager.loadAtlas('atlas.json', 'images/spritesheets/spritesheet.png');

        this.factory['Player'] = this.player;
        this.entities.push(this.player);

        this.generatePlants(this.plantCount);
        this.generateEnemies(this.enemyCount);

        this.eventsManager.setup();

    }

    play() {
        setInterval(function () { this.update(); }.bind(this), 10);
    }

    generatePlants(count) {
        for(let i = 0; i < count; i++) {
            let rand_x = Math.floor(Math.random() * 3100 + 1);
            let rand_y = Math.floor(Math.random() * 3100 + 1);

            this.entities.push(this.factory['Plant'] = new Plant(this.spriteManager, rand_x, rand_y));
        }
    }

    generateEnemies(count) {
        for(let i = 0; i < count; i++) {
            let rand_x = Math.floor(Math.random() * 3100 + 1);
            let rand_y = Math.floor(Math.random() * 3100 + 1);

            let enemyName = 'Enemy' + i;

            this.entities.push(this.factory[enemyName] = new Enemy(this.spriteManager, rand_x, rand_y, enemyName));
        }
    }

    getPlantCount() {
        let counter = 0;
        for(let i = 0; i < this.entities.length; i++) {
            let e = this.entities[i];
            if(e.name === 'Plant') {
                counter++;
            }
        }
        return counter;
    }

    getEnemyCount() {
        let counter = 0;
        for(let i = 0; i < this.entities.length; i++)
        {
            let e = this.entities[i];
            if(e.name !== 'Plant' && e.name !== 'Player') {
                counter++;
            }
        }
        return counter;
    }
}