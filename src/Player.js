import Entity from "./Entity"

export default class Player extends Entity{
    constructor() {
        super();
        this.healthpoints = 100;
        this.speed = 1;
    }

    findAim() {

    }


    draw(ctx) {
        this.spriteManager.draw(ctx, "player_img", this.pos_x, this.pos_y);
    }

}