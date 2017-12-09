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
    }

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, '1', this.pos_x, this.pos_y, this.size);
    }

    /*onTouchEntity (obj, gameManager) {
        if(this.size <= obj.size / 2) {
            let sizeOffset = obj.size / 5;
            obj.size += sizeOffset;
            obj.size_x += sizeOffset;
            obj.size_y += sizeOffset;
            this.kill(gameManager);
        }
    }*/
}