import SpriteManager from "./SpriteManager"

export default class Entity {
    constructor(spriteManager) {
        this.spriteManager = spriteManager;
        this.pos_x = 0;
        this.pos_y = 0;
        this.size_x = 64;
        this.size_y = 64;
        this.size = 1;
        this.speed = 0;
        this.name = 'undefined';
    }

    step(target_x, target_y) {
        //console.log(target_x + ' ' + target_y);
        //console.log(this.pos_x + ' ' + this.pos_y);
        if (target_x < 0 || target_y < 0) {
            return;
        }

        if (target_x > this.pos_x) {
            this.pos_x += 1 + this.speed;
        } else {
            if (target_x < this.pos_x) {
                this.pos_x -= 1 + this.speed;
            }
        }

        if (target_y > this.pos_y) {
            this.pos_y += 1 + this.speed;
        } else {
            if (target_y < this.pos_y) {
                this.pos_y -= 1 + this.speed;
            }
        }
    }

    onTouchEntity (obj, gameManager) {
        //console.log('touch');
        if(this.size / 2 >= obj.size) {
            //console.log('kill obj');
            let sizeOffset = obj.size/2;
            this.size += sizeOffset;
            this.size_x += sizeOffset;
            this.size_y += sizeOffset;
            obj.kill(gameManager);
        } else {
            if(this.size / 2 <= obj.size) {
                let sizeOffset = obj.size/2;
                //console.log('kill this');
                obj.size += sizeOffset;
                obj.size_x += sizeOffset;
                onj.size_y += sizeOffset;
                this.kill(gameManager);
            }
            //console.log('undefined touch');
        }
    }

    kill(gameManager) {
        console.log('kill ' + this.name);
        gameManager.laterKill.push(this);
    }
}