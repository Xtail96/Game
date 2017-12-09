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
    //canvas.style.border = '1px solid transparent';
    //canvas.style.backgroundColor = '#eee';
    canvas.style.display = 'block';

    /*let mapManager = new MapManager();
    if(mapManager.loadMap('map.json')) {
        mapManager.draw(context);
    } else {
        console.log('can not load map');
    }
    mapManager.draw(context);*/

    initGameMenu(canvas.width);

    let gameManager = new GameManager(canvas, context, canvas.width, canvas.height, 10, 100, 5, 1/10, 1/25, 5, 7, 3);
    gameManager.loadAll();
    gameManager.play();

}

function createGameMenu(canvasWidth) {
    let menu = document.createElement('div');
    menu.id = 'mainMenu';
    menu.style.backgroundColor = '#fff';
    menu.style.display = 'block';
    menu.style.width = canvasWidth;
    menu.style.height = 25;
    menu.style.padding = 10;
    //menu.style.border = '1px solid #eee';

    /*let buttons = createMenuButtons();
    for(let i in buttons){
        menu.appendChild(buttons[i]);
    }*/

    let dashboardElements = createDashboard();
    for(let i in dashboardElements) {
        menu.appendChild(dashboardElements[i]);
    }

    return menu;
}

function initGameMenu(canvasWidth) {
    document.body.appendChild(createGameMenu(canvasWidth));
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

function createDashboard() {
    let elements = [];

    let playerSizeLabel = document.createElement('b');
    playerSizeLabel.id = 'playerSizeLabel';
    playerSizeLabel.textContent = 'Размер игрока: ';
    elements.push(playerSizeLabel);

    let playerSize = document.createElement('input');
    playerSize.id = 'playerSize';
    playerSize.setAttribute('type', 'text');
    playerSize.setAttribute('readonly', '');
    playerSize.setAttribute('value', '0');
    elements.push(playerSize);


    let targetSizeLabel = document.createElement('b');
    targetSizeLabel.id = 'targetSizeLabel';
    targetSizeLabel.textContent = 'Цель: ';
    elements.push(targetSizeLabel);

    let targetSize = document.createElement('input');
    targetSize.id = 'targetPlayerSize';
    targetSize.setAttribute('type', 'text');
    targetSize.setAttribute('readonly', '');
    targetSize.setAttribute('value', '0');
    elements.push(targetSize);

    let plantCountLabel = document.createElement('b');
    plantCountLabel.id = 'plantCountLabel';
    plantCountLabel.textContent = 'Количество растений: ';
    elements.push(plantCountLabel);

    let plantsCount = document.createElement('input');
    plantsCount.id = 'plantCount';
    plantsCount.setAttribute('type', 'text');
    plantsCount.setAttribute('readonly', 'true');
    plantsCount.setAttribute('value', '0');
    elements.push(plantsCount);

    let enemyCountLabel = document.createElement('b');
    enemyCountLabel.id = 'enemyCountLabel';
    enemyCountLabel.textContent = 'Количество соперников: ';
    elements.push(enemyCountLabel);

    let enemyCount = document.createElement('input');
    enemyCount.id = 'enemyCount';
    enemyCount.setAttribute('type', 'text');
    enemyCount.setAttribute('readonly', 'true');
    enemyCount.setAttribute('value', '0');
    elements.push(enemyCount);

    return elements;
}

initGameField();