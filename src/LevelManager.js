import GameManager from "./GameManager"

export default class LevelManager {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }

    startLevel() {
        let gameManager = new GameManager(this.canvas, this.context, this.canvas.width, this.canvas.height, 10, 100, 5, 1/10, 1/25, 5, 7, 3);
        gameManager.loadAll();
        gameManager.play();
    }
}