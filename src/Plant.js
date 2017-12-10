import Entity from "./Entity"

export default class Plant extends Entity{
    constructor(spriteManager, x, y) {
        super(spriteManager);
        this.healthpoints = 1;
        this.speed = 0;
        this.pos_x = x;
        this.pos_y = y;
        this.size = 0.5;
        this.name = 'Plant';
        this.spriteNumber = '0';
    }

    /*draw(ctx) {
        this.spriteManager.drawSprite(ctx, this.spriteNumber, this.pos_x, this.pos_y, this.size);
    }*/

    /*onTouchEntity (obj, gameManager) {
        if(this.size <= obj.size) {
            this.kill(gameManager);
        }
    }*/
}