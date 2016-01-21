/* This JavaScript file is for dealing with scores */

var scores = [];
var gameScore = 0;
var level = 1;

var oldScores = JSON.parse(localStorage['snakeScores']);

var sorted = oldScores.sort(function(scoreA, scoreB) {
    return scoreB - scoreA;
});

function showGameStats() {
    $('#level').html("<strong>Level: </strong>" +  level +
                     " <span id='score'>Score: " + gameScore +
                     "</span><span id='high-score'> High Score: " + highScore() + "</span>");
}

function highScore() {
    var prevHigh = Math.max.apply(Math, oldScores);
    return Math.max(prevHigh, 0, gameScore);
}

function incrementScore() {
    if (!gameOver) {
        if (apple["x"] == snake[0].x && apple["y"] == snake[0].y) {
            gameScore ++;
            incrementLevel();
            generateApples();
            drawApple(apple["x"],apple["y"]);
            showGameStats();
            snake.push({ x: snake.length, y: 0 });

        }
    }
}

function addScore() {
    if (scores.indexOf(gameScore) == -1) {
        scores.push(gameScore);
    }

    var newScores = oldScores.concat(scores);
    newScores = makeUnique(newScores);
    localStorage['snakeScores'] = JSON.stringify(newScores);
    var newTotal = Number(localStorage['snakeTotalScore']) + gameScore;
    localStorage['snakeTotalScore'] = newTotal;
}

// Fill in the High Scores table
$('#scores-table td:last-child').each(function(index) {
    $(this).html(sorted[index] || '');
});
