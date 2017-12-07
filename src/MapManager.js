class MapManager{

    mapData = null;
    tLayerSand = null;
    tLayerObjects = null;
    xCount = 0;
    yCount = 0;
    tSize = { x : 64, y : 64};
    mapSize = { x : 64, y : 64 };
    tilesets = new Array();
    imgLoadCount = 0;
    imgLoaded = false;
    jsonLoaded = false;
    view = {x: 0, y: 0, w: 800, h: 600};

    constructor() {
        alert('Map Manager constructor');
    }

    getMapData() {
        return mapData;
    }

    getTLayerSand() {
        return tLayerSand;
    }

    getTLayerObjects() {
        return tLayerObjects;
    }

    getXCount() {
        return xCount;
    }

    getYCount() {
        return yCount;
    }

    getTSize() {
        return tSize;
    }

    getMapSize() {
        return mapSize;
    }

    getTilesets() {
        return tilesets;
    }

    parseMap(tilesJSON) {
        this.mapData = JSON.parse(tilesJSON);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount * this.tSize.x;
        this.mapSize.y = this.yCount * this.tSize.y;

        for(let i = 0; i < this.mapData.tilesets.length; i++) {
            let img = new Image();
            img.onload = function () {
                this.imgLoadCount++;
                if(this.imgLoadCount === this.mapData.tilesets.length) {
                    this.imgLoaded = true;
                }
            };
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
        this.jsonLoaded = true;
    }

    loadMap(path) {
        console.log(path);
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if(request.readyState === 4 && request.status === 200) {
                // получен корректный запрос
                this.parseMap(request.responseText);
            }
        };
        request.open('GET', path, true);
        request.send();
    }


    draw(ctx) {
        if(!this.imgLoaded|| !this.jsonLoaded) {
            setTimeout(function () { this.draw(ctx); }, 100);
        } else {
            if(this.tLayerSand === null) {
                for(let id = 0; id < this.mapData.layers.length; id++) {
                    let layer = this.mapData.layers[id];
                    if(layer.type === 'tilelayer') {
                        this.tLayerSand = layer;
                        break;
                    }
                }

                for(let i = 0; i < this.tLayerSand.length; i++) {
                    if(this.tLayerSand.data[i] !== 0) {
                        let tile = this.getTile(this.tLayerSand.data[i]);
                        let pX = (i % this.xCount);
                        let pY = (i % this.yCount);

                        if(!this.isVisible(pX, pY, this.tSize.x, this.tSize.y)) {
                            continue;
                        }

                        pX -= this.view.x;
                        pY -= this.view.y;


                        ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, pX, pY, this.tSize.x, this.tSize.y);
                    }
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

    isVisible(x, t, width, height) {
        if(x + width < this.view.x || y + height < this.view.y || x > this.view.x + this.view.w || y > this.view.y + this.view.h) {
            return false;
        } else {
            return true;
        }
    }
}
