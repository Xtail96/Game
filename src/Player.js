import Entity from "./Entity"

export default class Player extends Entity{
    constructor(spriteManager) {
        super(spriteManager);
        this.healthpoints = 100;
        this.speed = 1;
    }

    findAim() {

    }


    draw(ctx) {
        this.spriteManager.drawSprite(ctx, '0', this.pos_x, this.pos_y, this.size);
    }

}