import _ from 'lodash'
//import MapManager from './MapManager.js'

import LevelManager from "./LevelManager"

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

    let levelManager = new LevelManager(canvas, context);
    levelManager.startLevel();

}

function createGameMenu(canvasWidth) {
    let menu = document.createElement('div');
    menu.id = 'mainMenu';
    menu.style.backgroundColor = '#fff';
    menu.style.display = 'block';
    menu.style.width = canvasWidth;
    menu.style.height = 25;
    menu.style.padding = 10;

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
    playerSizeLabel.textContent = 'Your size: ';
    elements.push(playerSizeLabel);

    let playerSize = document.createElement('input');
    playerSize.id = 'playerSize';
    playerSize.setAttribute('type', 'text');
    playerSize.setAttribute('readonly', '');
    playerSize.setAttribute('value', '0');
    playerSize.style.marginRight = 10;
    playerSize.style.backgroundColor = 'transparent';
    playerSize.style.borderTop = '1px solid #eee';
    playerSize.style.borderLeft = '1px solid #eee';
    playerSize.style.borderRight = '1px solid #eee';
    playerSize.style.borderBottom = '1px solid #eee';
    playerSize.style.textAlign = 'center';
    playerSize.style.fontSize = '150%';
    playerSize.style.color = '#007769';
    elements.push(playerSize);


    let targetSizeLabel = document.createElement('b');
    targetSizeLabel.id = 'targetSizeLabel';
    targetSizeLabel.textContent = 'Target: ';
    elements.push(targetSizeLabel);

    let targetSize = document.createElement('input');
    targetSize.id = 'targetPlayerSize';
    targetSize.setAttribute('type', 'text');
    targetSize.setAttribute('readonly', '');
    targetSize.setAttribute('value', '0');
    targetSize.style.marginRight = 10;
    targetSize.style.backgroundColor = 'transparent';
    targetSize.style.borderTop = '1px solid #eee';
    targetSize.style.borderLeft = '1px solid #eee';
    targetSize.style.borderRight = '1px solid #eee';
    targetSize.style.borderBottom = '1px solid #eee';
    targetSize.style.textAlign = 'center';
    targetSize.style.fontSize = '150%';
    targetSize.style.width = 100;
    targetSize.style.color = '#a52a2a';
    elements.push(targetSize);

    let plantCountLabel = document.createElement('b');
    plantCountLabel.id = 'plantCountLabel';
    plantCountLabel.textContent = 'Plants: ';
    elements.push(plantCountLabel);

    let plantsCount = document.createElement('input');
    plantsCount.id = 'plantCount';
    plantsCount.setAttribute('type', 'text');
    plantsCount.setAttribute('readonly', 'true');
    plantsCount.setAttribute('value', '0');
    plantsCount.style.marginRight = 10;
    plantsCount.style.backgroundColor = 'transparent';
    plantsCount.style.borderTop = '1px solid #eee';
    plantsCount.style.borderLeft = '1px solid #eee';
    plantsCount.style.borderRight = '1px solid #eee';
    plantsCount.style.borderBottom = '1px solid #eee';
    plantsCount.style.textAlign = 'center';
    plantsCount.style.fontSize = '150%';
    plantsCount.style.width = 100;
    elements.push(plantsCount);

    let enemyCountLabel = document.createElement('b');
    enemyCountLabel.id = 'enemyCountLabel';
    enemyCountLabel.textContent = 'Enemies: ';
    elements.push(enemyCountLabel);

    let enemyCount = document.createElement('input');
    enemyCount.id = 'enemyCount';
    enemyCount.setAttribute('type', 'text');
    enemyCount.setAttribute('readonly', 'true');
    enemyCount.setAttribute('value', '0');
    enemyCount.style.backgroundColor = 'transparent';
    enemyCount.style.borderTop = '1px solid #eee';
    enemyCount.style.borderLeft = '1px solid #eee';
    enemyCount.style.borderRight = '1px solid #eee';
    enemyCount.style.borderBottom = '1px solid #eee';
    enemyCount.style.textAlign = 'center';
    enemyCount.style.fontSize = '150%';
    enemyCount.style.width = 100;
    elements.push(enemyCount);


    let timer = document.createElement('b');
    timer.id = 'timer';
    timer.style.marginRight = '10px';
    timer.style.float = 'right';
    elements.push(timer);

    return elements;
}

function initPreview() {
    let startMenu = document.createElement('div');
    startMenu.id = 'startMenu';
    startMenu.style.width = '350px';
    startMenu.style.height = 'auto';
    startMenu.style.marginTop = '50px';
    startMenu.style.marginLeft = 'auto';
    startMenu.style.marginRight = 'auto';
    startMenu.style.padding = '25px';
    startMenu.style.backgroundColor = '#eee';
    startMenu.style.border = '1px solid #dfdfdf';
    startMenu.style.borderRadius = '5px';


    let nicknameLabel = document.createElement('b');
    nicknameLabel.id = 'nicknameLabel';
    nicknameLabel.textContent = 'Username:';
    startMenu.appendChild(nicknameLabel);

    let nicknameInput = document.createElement('input');
    nicknameInput.id = 'nicknameInput';
    nicknameInput.setAttribute('type', 'text');
    nicknameInput.setAttribute('placeholder', 'Type username');
    nicknameInput.style.padding = '10px';
    nicknameInput.style.marginBottom = '10px';
    nicknameInput.style.backgroundColor = '#fff';
    nicknameInput.style.border = '1px solid #1B80FA';
    nicknameInput.style.borderRadius = '5px';
    nicknameInput.style.textAlign = 'center';
    nicknameInput.style.fontSize = '150%';
    nicknameInput.style.width = '100%';
    nicknameInput.style.color = '#333';
    startMenu.appendChild(nicknameInput);


    let levelLabel = document.createElement('b');
    levelLabel.id = 'levelLabel';
    levelLabel.textContent = 'Level:';
    startMenu.appendChild(levelLabel);

    let levelInput = document.createElement('input');
    levelInput.id = 'levelInput';
    levelInput.setAttribute('type', 'number');
    levelInput.setAttribute('placeholder', 'Choose level 1-2');
    levelInput.style.padding = '10px';
    levelInput.style.marginBottom = '10px';
    levelInput.style.backgroundColor = '#fff';
    levelInput.style.border = '1px solid #1B80FA';
    levelInput.style.borderRadius = '5px';
    levelInput.style.textAlign = 'center';
    levelInput.style.fontSize = '150%';
    levelInput.style.width = '100%';
    levelInput.style.color = '#333';
    startMenu.appendChild(levelInput);


    let playerSpriteLabel = document.createElement('b');
    playerSpriteLabel.id = 'playerSpriteLabel';
    playerSpriteLabel.textContent = 'Character:';
    startMenu.appendChild(playerSpriteLabel);

    let playerSpriteInput = document.createElement('input');
    playerSpriteInput.id = 'playerSpriteInput';
    playerSpriteInput.setAttribute('type', 'number');
    playerSpriteInput.setAttribute('placeholder', 'Choose your character 1-4');
    playerSpriteInput.style.padding = '10px';
    playerSpriteInput.style.marginBottom = '10px';
    playerSpriteInput.style.backgroundColor = '#fff';
    playerSpriteInput.style.border = '1px solid #1B80FA';
    playerSpriteInput.style.borderRadius = '5px';
    playerSpriteInput.style.textAlign = 'center';
    playerSpriteInput.style.fontSize = '150%';
    playerSpriteInput.style.width = '100%';
    playerSpriteInput.style.color = '#333';
    startMenu.appendChild(playerSpriteInput);

    //startMenu.appendChild(document.createElement('br'));

    /*let levelInput = document.createElement('select');
    levelInput.id = 'levelInput';
    levelInput.style.width = '100%';
    levelInput.style.marginBottom = '10px';


    let undefinedLevel = document.createElement('option');
    undefinedLevel.id = 'undefinedLevel';
    levelInput.appendChild(undefinedLevel);

    let firstLevel = document.createElement('option');
    firstLevel.id = 'firstLevel';
    firstLevel.textContent = 'Первый';
    levelInput.appendChild(firstLevel);

    let secondLevel = document.createElement('option');
    secondLevel.id = 'secondLevel';
    secondLevel.textContent = 'Второй';
    levelInput.appendChild(secondLevel);

    startMenu.appendChild(levelInput);*/

    let startButton = document.createElement('input');
    startButton.id = 'startButton';
    startButton.type = 'button';
    startButton.value = 'Start';
    startButton.onclick = function () {
        startLevel();
    };
    startButton.style.width = '100%';
    startButton.style.padding = '5px';
    startButton.style.fontSize = '200%';
    startButton.style.color = '#fff';
    startButton.style.backgroundColor = '#46AF46';
    startButton.style.border = '1px solid transparent';
    startButton.style.borderRadius = '5px';
    startButton.style.cursor = 'pointer';
    startMenu.appendChild(startButton);


    document.body.appendChild(startMenu);
}

function startLevel() {
    let playerNickname = document.getElementById('nicknameInput').value.toString();
    let playerSprite = document.getElementById('playerSpriteInput').value.toString();
    let level = document.getElementById('levelInput').value.toString();

    switch (playerSprite) {
        case '1':
            playerSprite = '2';
            break;
        case '2':
            playerSprite = '3';
            break;
        case '3':
            playerSprite = '4';
            break;
        case '4':
            playerSprite = '5';
            break;
    }

    window.location.search = '?playerNickname=' + playerNickname + '&playerSprite=' + playerSprite + '&level=' + level ;
}


console.log(window.location.search);
if(window.location.search === '') {
    initPreview();
} else {
    if(window.location.search === '?result=win') {
        initWinPage();
    } else {
        initGameField();
    }
}

function initWinPage() {
    //alert('win!');
    let resultsHeader = document.createElement('h1');
    resultsHeader.id = 'resultsHeader';
    resultsHeader.textContent = 'Results';
    document.body.appendChild(resultsHeader);

    let resultsList = document.createElement('ul');

    let localStorage = window.localStorage;
    for(let i = 0; i < localStorage.length; i++) {
        let li = document.createElement('li');
        li.textContent = window.localStorage.getItem(i.toString());
        resultsList.appendChild(li);
    }

    document.body.appendChild(resultsList);
}

function initLoosePage() {
   alert('loose(');
}