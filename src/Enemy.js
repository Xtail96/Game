import Entity from "./Entity"

export default class Enemy extends Entity{
    constructor(spriteManager, x, y, name) {
        super(spriteManager);
        this.healthpoints = 100;
        this.speed = 0;
        this.pos_x = x;
        this.pos_y = y;
        this.size = 1;
        this.name = name;
    }

    draw(ctx) {
        this.spriteManager.drawSprite(ctx, '2', this.pos_x, this.pos_y, this.size);
    }
}