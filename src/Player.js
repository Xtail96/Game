import Entity from "./Entity"

export default class Player extends Entity{
    constructor(spriteManager, growIncrement = 1/10, maxSize = 10, sprite = '1', nickname='Player') {
        super(spriteManager);
        this.healthpoints = 100;
        this.speed = 2;
        this.size = 1;
        this.move_x = 0;
        this.move_y = 0;
        this.name = 'Player';
        this.growIncrement = growIncrement;
        this.maxSize = maxSize;
        this.spriteNumber = sprite;
        this.nickname = nickname;
    }


    /*draw(ctx) {
        this.spriteManager.drawSprite(ctx, this.spriteNumber, this.pos_x, this.pos_y, this.size);
    }*/

    update(gameManager) {
        //console.log('updatePlayer');
        //console.log(this.mov)
        //console.log(gameManager);
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
            }
            obj.kill(gameManager);
        }
    }

}