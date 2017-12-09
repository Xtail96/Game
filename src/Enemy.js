import Entity from "./Entity"

export default class Enemy extends Entity{
    constructor(spriteManager, x, y, name, growIncrement = 1/5, maxSize = 10) {
        super(spriteManager);
        this.healthpoints = 100;
        this.speed = 1;
        this.pos_x = x;
        this.pos_y = y;
        this.size = 1;
        this.name = name;
        this.target = null;
        this.growIncrement = growIncrement;
        this.maxSize = maxSize;
    }

    findTarget(gameManager) {
        if(this.target === null || !this.targetExists(gameManager)) {
            let rand_target = Math.floor(Math.random() * gameManager.entities.length);
            if(this.canEat(gameManager.entities[rand_target])) {
                this.target = gameManager.entities[rand_target];
            } else {
                this.findTarget(gameManager);
            }
        }
    }

    canEat(obj) {
        if(this.size / 2 >= obj.size) {
            return true;
        } else {
            return false;
        }
    }

    targetExists(gameManager) {
        for(let i = 0; i < gameManager.entities.length; i++) {
            let e = gameManager.entities[i];
            if(this.target.pos_x === e.pos_x && this.target.pos_y === e.pos_y) {
                return true;
            }
        }
        return false;
    }

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, '2', this.pos_x, this.pos_y, this.size);
    }

    update(gameManager) {


        //console.log(e.pos_x + ' ' + e.pos_y);

        this.findTarget(gameManager);

        this.step(this.target.pos_x, this.target.pos_y);
        //console.log(this.pos_x + ' ' + this.pos_y);

        gameManager.physicManager.update(this, gameManager);
    }


    onTouchEntity (obj, gameManager) {
        //console.log('touch');
        if(this.size / 2 >= obj.size) {
            //console.log('kill obj');
            let sizeOffset = obj.size * this.growIncrement;
            if(this.size + sizeOffset <= this.maxSize) {
                this.size += sizeOffset;
                this.size_x += sizeOffset;
                this.size_y += sizeOffset;
                this.target = null;
            }
            obj.kill(gameManager);
        }
    }
}