import Entity from "./Entity"

export default class Player extends Entity{
    constructor(spriteManager) {
        super(spriteManager);
        this.healthpoints = 100;
        this.speed = 2;
        this.size = 1;
        this.move_x = 0;
        this.move_y = 0;
        this.name = 'Player';
    }


    draw(ctx) {
        this.spriteManager.drawSprite(ctx, '0', this.pos_x, this.pos_y, this.size);
    }

    update(gameManager) {
        //console.log('updatePlayer');
        //console.log(this.mov)
        //console.log(gameManager);
        gameManager.physicManager.update(this, gameManager);
    }

}