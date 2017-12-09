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
        this.spriteNumber = 'undefined';
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

    draw(ctx) {
        /*if(this.name !== 'Player' && this.name !== 'Plant') {
            console.log(this.spriteNumber);
        }*/
        this.spriteManager.drawSprite(ctx, this.spriteNumber, this.pos_x, this.pos_y, this.size);
    }

    kill(gameManager) {
        //console.log('kill ' + this.name);
        gameManager.laterKill.push(this);
    }
}