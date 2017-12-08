export default class SpriteManager {
    constructor(mapManager) {
        this.mapManager = mapManager;
        this.image = new Image();
        this.sprites = new Array();
        this.imgLoaded = false;
        this.jsonLoaded = false;
    }

    loadAtlas(atlasJson, atlasImg) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if(request.readyState === 4 && request.status === 200) {
                this.parseAtlas(request.responseText);
            }
        }.bind(this);

        request.open('GET', atlasJson, true);
        request.send();
        this.loadImg(atlasImg);
    }

    loadImg(imgName) {
        this.image.onload = function () {
            this.imgLoaded = true;
        }.bind(this);
        this.image.src = imgName;
    }

    parseAtlas(atlasJSON) {
        let atlas = JSON.parse(atlasJSON);
        for(let name in atlas.frames) {
            let frame = atlas.frames[name].frame;
            this.sprites.push({name: name, x: frame.x, y: frame.y, w: frame.w, h: frame.h});
        }
        this.jsonLoaded = true;
    }

    drawSprite(ctx, name, x, y, size = 1) {
        if(!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(function () { this.drawSprite(ctx, name , x, y, size); }.bind(this), 100);
        } else {
            let sprite = this.getSprite(name);
            if(!this.mapManager.isVisible(x, y, sprite.w, sprite.h)) {
                return;
            }

            x -= this.mapManager.view.x;
            y -= this.mapManager.view.y;

            ctx.drawImage(this.image, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
        }
    }

    getSprite(name) {
        for(let i = 0; i < this.sprites.length; i++) {
            let s = this.sprites[i];
            if(s.name === name) {
                return s;
            }
        }
        return null;
    }
}