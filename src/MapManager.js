export default class MapManager{

    constructor() {
        this.mapData = null;
        this.tLayerSand = null;
        this.xCount = 0;
        this.yCount = 0;
        this.tSize = { x : 64, y : 64};
        this.mapSize = { x : 64, y : 64 };
        this.tilesets = new Array();
        this.imgLoadCount = 0;
        this.imgLoaded = false;
        this.jsonLoaded = false;
        this.view = {x: 0, y: 0, w: 800, h: 600};
        //console.log('Map Manager created');
    }

    loadMap(path) {
        //console.log('start load = ' + path);
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            //console.log('ready state = ' + request.readyState + '; status = ' + request.status);
            if(request.readyState === 4 && request.status === 200) {
                // получен корректный запрос
                //console.log('request is correct');
                this.parseMap(request.responseText);
            }
        }.bind(this);
        request.open('GET', path, true);
        request.send();

        if(this.jsonLoaded && this.imgLoaded) {
            return true;
        } else {
            return false;
        }
    }

    parseMap(tilesJSON) {
        //console.log('start parsing');
        this.mapData = JSON.parse(tilesJSON);
        //console.log(this.mapData);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount * this.tSize.x;
        this.mapSize.y = this.yCount * this.tSize.y;

        for(let i = 0; i < this.mapData.tilesets.length; i++) {
            let img = new Image();
            //console.log('new image has already created');
            //console.log(img.src);
            img.onload = function () {
                //console.log('load image');
                this.imgLoadCount++;
                if(this.imgLoadCount === this.mapData.tilesets.length) {
                    this.imgLoaded = true;
                }
            }.bind(this);

            //console.log(img);

            let t = this.mapData.tilesets[i];
            img.src = t.image;
            let ts = {
                firstgid: t.firstgid,
                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth/this.tSize.x),
                yCount: Math.floor(t.imageheight/this.tSize.y)
            };
            this.tilesets.push(ts);
        }
        //console.log(this.tilesets);
        this.jsonLoaded = true;
    }


    draw(ctx) {
        //console.log('start draw ' + this.imgLoaded + ' ' + this.jsonLoaded);
        if(!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(function () { this.draw(ctx); }.bind(this), 100);
        } else {
            //console.log('images and json loaded');
            if(this.tLayerSand === null) {
                //console.log('layers');
                //console.log(this.mapData.layers);
                for(let id = 0; id < this.mapData.layers.length; id++) {
                    let layer = this.mapData.layers[id];
                    if(layer.type === 'tilelayer') {
                        this.tLayerSand = layer;
                        break;
                    }
                }
            }
            for(let i = 0; i < this.tLayerSand.data.length; i++) {
                if(this.tLayerSand.data[i] !== 0) {
                    let tile = this.getTile(this.tLayerSand.data[i]);
                    //console.log(tile);
                    let pX = (i % this.xCount) * this.tSize.x;
                    let pY = Math.floor(i / this.xCount) * this.tSize.y;

                    if(!this.isVisible(pX, pY, this.tSize.x, this.tSize.y)) {
                        continue;
                    }

                    pX -= this.view.x;
                    pY -= this.view.y;

                    //console.log('draw');
                    //console.log(tile.img);
                    //console.log(pX + ' ' + pY);
                    ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, pX, pY, this.tSize.x, this.tSize.y);
                    //ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, this.view.x + pX, this.view.y + pY, this.tSize.x, this.tSize.y);
                }

            }
        }
    }

    getTile(tileIndex) {
        let tile = {
            img: null,
            px: 0,
            py: 0
        };

        let tileset = this.getTileset(tileIndex);
        tile.img = tileset.image;
        let id = tileIndex - tileset.firstgid;
        let x = id % tileset.xCount;
        let y = Math.floor(id / tileset.xCount);
        tile.px = x * this.tSize.x;
        tile.py = y * this.tSize.y;

        return tile;
    }

    getTileset(tileIndex) {
        for(let i = this.tilesets.length - 1; i >= 0; i--) {
            if(this.tilesets[i].firstgid <= tileIndex) {
                return this.tilesets[i];
            }
        }
        return null;
    }

    isVisible(x, y, width, height) {
        if(x + width < this.view.x || y + height < this.view.y || x > this.view.x + this.view.w || y > this.view.y + this.view.h) {
            return false;
        } else {
            return true;
        }
    }

    centerAt (x, y) {
        if(x < this.view.w/2) {
            this.view.x = 0;
        } else {
            if(x > this.mapSize.x - this.view.w/2) {
                this.view.x = this.mapSize.x - this.view.w;
            } else {
                this.view.x = x - (this.view.w/2);
            }
        }

        if(y < this.view.h/2) {
            this.view.y = 0;
        } else {
            if(y > this.mapSize.y - this.view.h/2) {
                this.view.y = this.mapSize.y - this.view.h;
            } else {
                this.view.y = y - (this.view.h/2);
            }
        }
        //console.log(this.view.x + ' ' + this.view.y);
    }

    update(ctx, player_pos_x, player_pos_y) {
        ctx.clearRect(0, 0, this.view.w, this.view.h);
        this.draw(ctx);
        this.centerAt(player_pos_x, player_pos_y);
    }
}
