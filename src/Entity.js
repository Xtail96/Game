import SpriteManager from "./SpriteManager"

export default class Entity {
    constructor(spriteManager) {
        this.spriteManager = spriteManager;
        this.pos_x = 0;
        this.pos_y = 0;
        this.size_x = 0;
        this.size_y = 0;
        this.size = 1;
        this.speed = 0;
    }

    findAim() {

    }

    findPath() {

    }

    step() {

    }

    draw(ctx) {

    }

    onTouchEntity (obj) {

    }

    kill() {

    }
}