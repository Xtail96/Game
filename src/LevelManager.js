import GameManager from "./GameManager"

export default class LevelManager {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.gameManager = null;
    }

    getLevelNumber() {

    }

    startLevel() {
        let levelNumber = this.getParam('level');
        let playerSprite = this.getParam('playerSprite').toString();
        //console.log(playerSprite);
        if(playerSprite === '') {
            playerSprite = '1';
        }

        //console.log(levelNumber);

        switch (levelNumber) {
            case 1:
                this.gameManager =
                    new GameManager(this.canvas, this.context, this.canvas.width, this.canvas.height, 10, 100, 5, 1/10, 1/25, 5, 7, 3, 'level_1_map.json', playerSprite);
                break;
            case 2:
                this.gameManager =
                    new GameManager(this.canvas, this.context, this.canvas.width, this.canvas.height, 5, 10, 5, 1/25, 1/2, 6, 12, 5, 'level_2_map.json', playerSprite);
                break;
        }

        if(this.gameManager !== null) {
            this.gameManager.loadAll();
            this.gameManager.play();
        }
    }


    getParam(param) {
        let queries = window.location.search, regex, resRegex, results, response;
        param = encodeURIComponent(param);
        regex = new RegExp('[\\?&]' + param + '=([^&#]*)', 'g');
        resRegex = new RegExp('(.*)=([^&#]*)');
        results = queries.match(regex);

        if (!results) {
            return '';
        }
        response = results.map(function (result) {
            let parsed = resRegex.exec(result);

            if (!parsed) {
                return '';
            }

            return parsed[2].match(/(^\d+$)/) ? Number(parsed[2]) : parsed[2];
        });

        return response.length > 1 ? response : response[0];
    }
}