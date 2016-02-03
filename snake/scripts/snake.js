$('#my-header').load('header.html');

setTimeout(function() {
    $('#coins-display .coins-badge').html(localStorage['snakeCoins']);
}, 100);

var canvas = $('#my-canvas')[0];
var ctx = canvas.getContext('2d');

/* The width and height are declared as percentages of the screen
   to better support responsiveness. When the DOM is loaded, the
   values are given units of pixels. Since we are using these values
   in our calculations, we have to extract the number portion.
*/
var width = $('canvas').css('width').match(/\d/g).join('');
var height = $('canvas').css('height').match(/\d/g).join('');

// Objects to keep track of game information
var snake = [];
var apple = {};

var cellWidth = 6;
var direction = 'right';
var gameOver = false;

function checkStorage(key) {
    if(!localStorage[key]) {
        localStorage[key] = JSON.stringify([]);
    }
}

checkStorage('snakeAchievements');
checkStorage('snakeScores');
checkStorage('snakePurchases');

if (!localStorage['snakeGamesPlayed']) {
    localStorage['snakeGamesPlayed'] = 0;
}

if (!localStorage['snakeTotalScore']) {
    localStorage['snakeTotalScore'] = 0;
}

if (!localStorage['snakeCoins']) {
    localStorage['snakeCoins'] = 0;
}

$('#game-info, #notification').css({ 'visibility': 'hidden' });

$('#new-game').on('click', function() {
    startGame();
    play();
});

$('body').on('keydown', function(event) {
    if (gameOver) {
        event.preventDefault();
    }
    else {
        if (event.keyCode == 37 && direction != 'right') {
            direction = 'left';
        }
        else if (event.keyCode == 38 && direction != 'down') {
            direction = 'up';
        }
        else if (event.keyCode == 39 && direction != 'left') {
            direction = 'right';
        }
        else if (event.keyCode == 40 && direction != 'up') {
            direction = 'down';
        }
    }
});

function startGame() {
    showGameStats();
    direction = 'right';
    gameOver = false;
    gameScore = 0;
}

for (var i = 0; i < 5; i++) {
    snake.push({ x: i, y: 0 });
}

var newX = snake[0].x;
var newY = snake[0].y;
    
function moveSnake() {

    switch(direction) {
        case 'right':
            newX++;
            break;
        case 'left':
            newX--;
            break;
        case 'up':
            newY--;
            break;
        case 'down':
            newY++;
            break;
    }

    var tail = snake.pop();
    tail.x = newX;
    tail.y = newY;
    snake.unshift(tail);

}

function generateApples() {
    apple['x'] = Math.round(Math.random() * (width / 10));
    apple['y'] = Math.round(Math.random() * 24);
}

function drawApple(x,y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x * cellWidth, y * cellWidth, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function incrementLevel() {
    level = Math.ceil(gameScore / 10);
    addAchievement(level);
}

function addCoins() {
    var currentCoins = Number(localStorage['snakeCoins']);
    var coinsEarned = Math.floor(gameScore / 5);
    localStorage['snakeCoins'] = currentCoins > 0 ? currentCoins + coinsEarned: coinsEarned;
    $('#coins-display .coins-badge').html(localStorage['snakeCoins']);
}

function reload() {
    document.location.reload();
}

function snakeCollision(cell1, cell2) {
    return cell1.x == cell2.x && cell1.y == cell2.y && cell1.y != 0;
}

function calculateCollision() {
    var snakeCells = [];
    for (var i = snake.length - 1; i > 0; i--) {
        snakeCells.push(i);
    }
    return snakeCells.some(function(cell) {
        return snakeCollision(snake[0], snake[cell]);
    });
}

function checkLoss() {

    if (newX == -1 || newX == 50 || newY == -1 || newY == 25 || calculateCollision()) {
        gameOver = true;
        clearInterval(increaseScore);
        clearInterval(drawSnake);
        addScore();
        //addCoins();
        setTimeout(reload, 500);
    }
}

// This updates and draws the position of the snake
function updateBoard() {
    for (var i = 0; i < snake.length; i++) {
        var cell = snake[i];
        ctx.fillStyle = 'blue';
        ctx.fillRect(cell['x'] * cellWidth, cell['y'] * cellWidth,  cellWidth, cellWidth);
    }
}


// Our main function that will be constantly repeated
function draw() {
    ctx.clearRect(0, 0, width, height);
    moveSnake();
    checkLoss();
    updateBoard();
    drawApple(apple['x'], apple['y']);
}

// Call this function to start a new game
function play() {
    localStorage['snakeGamesPlayed'] = ++localStorage['snakeGamesPlayed'];
    generateApples();
    drawSnake = setInterval(draw, 60);
    increaseScore = setInterval(incrementScore, 60);
}
