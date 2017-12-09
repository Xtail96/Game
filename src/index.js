import _ from 'lodash'
//import MapManager from './MapManager.js'

import GameManager from "./GameManager"

/*function component() {
    let element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());*/

function createGameField() {
    let gameField = document.createElement('canvas');
    gameField.id = 'gameField';
    return gameField;
}

function initGameField() {
    document.body.appendChild(createGameField());

    let canvas = document.getElementById('gameField');
    let context = canvas.getContext('2d');
    canvas.width = 1366;
    canvas.height = 700;
    canvas.style.border = '1px solid #333';
    //canvas.style.backgroundColor = '#eee';
    canvas.style.display = 'block';

    /*let mapManager = new MapManager();
    if(mapManager.loadMap('map.json')) {
        mapManager.draw(context);
    } else {
        console.log('can not load map');
    }
    mapManager.draw(context);*/

    let gameManager = new GameManager(canvas, context, canvas.width, canvas.height, 10, 100, 5, 1/10, 1, 5, 7, 3);
    gameManager.loadAll();
    gameManager.play();

}

function createGameMenu() {
    let menu = document.createElement('div');
    menu.id = 'mainMenu';
    menu.style.backgroundColor = '#333';
    menu.style.display = 'block';
    menu.style.width = 1366;
    menu.style.height = 50;
    menu.style.border = '1px solid #333';

    let buttons = createMenuButtons();
    for(let i in buttons){
        menu.appendChild(buttons[i]);
    }

    return menu;
}

function initGameMenu() {
    document.body.appendChild(createGameMenu());
}

function createMenuButtons() {
    let buttons = [];
    let start = document.createElement('input');
    start.id = 'startButton';
    start.setAttribute('type', 'button');
    start.style.color = '#333';
    start.setAttribute('value', 'Start');

    buttons.push(start);

    let fullscreen = document.createElement('input');
    fullscreen.id = 'fullscreenButton';
    fullscreen.setAttribute('type', 'button');
    fullscreen.style.color = '#333';
    fullscreen.setAttribute('value', 'Full Screen');
    buttons.push(fullscreen);

    return buttons;
}

initGameMenu();
initGameField();