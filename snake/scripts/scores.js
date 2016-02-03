/* This JavaScript file is for dealing with scores */

setTimeout(function() {
    $('#coins-display .coins-badge').html(localStorage['snakeCoins']);
}, 100);

var scores = [];
var gameScore = 0;
var level = 1;

var oldScores = JSON.parse(localStorage['snakeScores']);

function showGameStats() {
    var currentCoins = Number(localStorage['snakeCoins']);
    $('#game-info').css({ 'visibility': 'visible' });
    $('#level').html("<strong>Level: </strong>" +  level +
                     " <span id='score'>Score: " + gameScore +
                     "</span><span id='high-score'> High Score: " + highScore() + "</span>") +
                     "<span id='coins'>Coins: " + "<span class='coins-badge'>" + currentCoins + "</span></span>";
}

function highScore() {
	return Math.max(Math.max.apply(Math, oldScores), 0, gameScore);
}

function incrementScore() {
    if (!gameOver) {
        if (apple['x'] == snake[0].x && apple['y'] == snake[0].y) {
            gameScore++;
            incrementLevel();
            generateApples();
            drawApple(apple['x'],apple['y']);
            showGameStats();
            snake.push({ x: snake.length, y: 0 });

        }
    }
}

function addScore() {
    if (scores.indexOf(gameScore) < 0) {
        scores.push(gameScore);
    }
    addCoins();

    var newScores = oldScores.concat(scores);
    newScores = makeUnique(newScores);
    localStorage['snakeScores'] = JSON.stringify(newScores);
    var newTotal = Number(localStorage['snakeTotalScore']) + gameScore;
    localStorage['snakeTotalScore'] = newTotal;
}
