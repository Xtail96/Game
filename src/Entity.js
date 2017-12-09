import SpriteManager from "./SpriteManager"

export default class Entity {
    constructor(spriteManager) {
        this.spriteManager = spriteManager;
        this.pos_x = 0;
        this.pos_y = 0;
        this.size_x = 0;
        this.size_y = 0;
        this.size = 1;
        this.speed = 0;
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

    onTouchEntity (obj) {
        if(this.size / 2 > obj.size) {
            this.size *= obj.size / 4;
            obj.kill();
        } else {
            if(this.size / 2 < obj.size) {
                obj.size *= this.size / 4;
                this.kill();
            }
        }
    }

    kill() {


    }
}