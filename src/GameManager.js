import EventsManager from "./EventsManager";
import MapManager from "./MapManager";
import SpriteManager from "./SpriteManager";
import PhysicManager from "./PhysicManager";
import Player from "./Player"
import Plant from "./Plant";
import Enemy from "./Enemy"

export default class GameManager{
    constructor(canvas, ctx,
                canvasWidth = 800,
                canvasHeight = 600,
                plantsCount = 100,
                enemyCount = 10,
                enemyLimit = 10,
                playerGrowIncrement = 1/5,
                enemyGrowIncrement = 1/3,
                playerMaxSize = 3,
                enemyMaxSize = 5,
                targetPlayerSize = 2.5,
                map = 'map.json',
                playerSprite = '1',
                playerNickname = 'Player') {
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.targetPlayerSize = targetPlayerSize;

        this.plantCount = plantsCount;
        this.enemyCount = enemyCount;
        this.enemyLimit = enemyLimit;
        this.playerGrowIncrement = playerGrowIncrement;
        this.enemyGrowIncrement = enemyGrowIncrement;
        this.playerMaxSize = playerMaxSize;
        this.enemyMaxSize = enemyMaxSize;

        this.factory = {};
        this.entities = [];
        this.laterKill = [];

        this.mapManager = new MapManager(this.canvasWidth, this.canvasHeight);
        this.eventsManager = new EventsManager(this.canvas);
        this.spriteManager = new SpriteManager(this.mapManager);
        this.physicManager = new PhysicManager();

        this.player = new Player(this.spriteManager, this.playerGrowIncrement, this.playerMaxSize, playerSprite, playerNickname);
        this.map = map;

        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.storage = window.localStorage;
        this.saved = false;
    }

    initPlayer(obj) {
        this.player = obj;
    }

    kill(obj) {
        this.laterKill.push(obj);
    }

    update() {
        if(this.player === null) {
            //console.log('player has been killed');
            alert('Вы стали частью чего-то большего.');
            window.location.search = '';
            //alert('Вы стали частью чего-то большего');
            return;
        } else {
            //console.log(this.player.size);
            if(this.player.size >= this.targetPlayerSize) {
                let currentTime = this.getCurrentTime();
                alert(this.player.nickname + '! You win in ' + currentTime);
                if(!this.saved) {
                    let key = this.storage.length;
                    this.storage.setItem(key.toString(), this.player.nickname + ' win in time = ' + currentTime + ' with size = ' + this.player.size);
                    window.location.search = '?result=win';
                    this.saved = true;
                }
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
                if(this.plantCount <= this.enemyCount / 2) {
                    this.generatePlants(this.enemyCount / 2);
                }
                if(this.enemyCount < this.enemyLimit) {
                    this.generateEnemies(1);
                }
                //console.log(this.plantCount + ' ' + this.enemyCount);

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
                this.updateDashboard();
                this.draw();
            }
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
        this.mapManager.loadMap(this.map);
        this.spriteManager.loadAtlas('atlas.json', 'images/spritesheets/spritesheet.png');

        this.factory['Player'] = this.player;
        this.entities.push(this.player);

        this.generatePlants(this.plantCount);
        this.generateEnemies(this.enemyCount);

        this.eventsManager.setup();

    }

    play() {
        setInterval(function () { this.update(); }.bind(this), 10);
        this.start_timer();
    }

    generatePlants(count) {
        for(let i = 0; i < count; i++) {
            let rand_x = Math.floor(Math.random() * Math.max(this.mapManager.mapSize.x, 3200) + 1);
            let rand_y = Math.floor(Math.random() * Math.max(this.mapManager.mapSize.y, 3200) + 1);
            this.entities.push(this.factory['Plant'] = new Plant(this.spriteManager, rand_x, rand_y));
        }
    }

    generateEnemies(count) {
        for(let i = 0; i < count; i++) {
            let rand_x = Math.floor(Math.random() * Math.max(this.mapManager.mapSize.x, 3200) + 1);
            let rand_y = Math.floor(Math.random() * Math.max(this.mapManager.mapSize.y, 3200) + 1);

            let enemyName = 'Enemy' + i;

            this.entities.push(this.factory[enemyName] =
                new Enemy(this.spriteManager, rand_x, rand_y, enemyName, this.enemyGrowIncrement, this.enemyMaxSize, generateEnemiesSpriteNumber()));
        }

        function generateEnemiesSpriteNumber() {
            return (Math.floor(Math.random() * 4 + 2)).toString();
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

    updateDashboard() {
        document.getElementById('playerSize').setAttribute('value', this.player.size);
        document.getElementById('targetPlayerSize').setAttribute('value', this.targetPlayerSize);
        document.getElementById('plantCount').setAttribute('value', this.plantCount);
        document.getElementById('enemyCount').setAttribute('value', this.enemyCount);
    }

    start_timer() {

        //$('.timer').text('00:00:00')
        //let timer = document.getElementById('timer').textContent = '00:00:00';
        let this_date = new Date();
        //clearInterval(start_time_interval);
        setInterval(function(){
            let new_date = new Date() - this_date;
            this.seconds = Math.abs(Math.floor(new_date/1000)%60); //sek
            this.minutes   = Math.abs(Math.floor(new_date/1000/60)%60); //min
            this.hours = Math.abs(Math.floor(new_date/1000/60/60)%24); //hours
            if (this.seconds.toString().length   === 1) this.seconds   = '0' + this.seconds;
            if (this.minutes.toString().length   === 1) this.minutes   = '0' + this.minutes;
            if (this.hours.toString().length === 1) this.hours = '0' + this.hours;
            //$('.timer').text(hours + ':' + min + ':' + sec);
            document.getElementById('timer').textContent = this.getCurrentTime();
        }.bind(this),100);

    };

    getCurrentTime() {
        return this.hours + ':' + this.minutes + ':' + this.seconds;
    }
}