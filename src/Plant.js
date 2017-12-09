import Entity from "./Entity"

export default class Plant extends Entity{
    constructor(spriteManager, x, y) {
        super(spriteManager);
        this.healthpoints = 1;
        this.speed = 0;
        this.pos_x = x;
        this.pos_y = y;
    }

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, '5', this.pos_x, this.pos_y, this.size);
    }
}