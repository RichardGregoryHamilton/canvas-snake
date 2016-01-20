var canvas = $("#my-canvas")[0];
var ctx = canvas.getContext("2d");
var width = $("canvas").css("width").match(/\d/g).join('');
var height = $("canvas").css("height").match(/\d/g).join('');
var snakeArray = [];
var cellWidth = 6;
var direction = "right";
var gameOver = false;
var gameScore = 0;
var level = 1;
var scores = [];
var achievements = [];
var apple = {};

if (!localStorage['snakeAchievements']) {
    localStorage['snakeAchievements'] = JSON.stringify([]);
}

if (!localStorage['snakeScores']) {
    localStorage['snakeScores'] = JSON.stringify([]);
}

$('#game-info, #notification').css({ 'visibility': 'hidden' });

$("#new-game").on("click", function() {
    startGame();
    play();
});

$("body").on("keydown", function(event) {
    if (gameOver) {
        event.preventDefault();
    }
    else {
        if (event.keyCode == 37 && direction != "right") {
            direction = "left";
        }
        else if (event.keyCode == 38 && direction != "down") {
            direction = "up";
        }
        else if (event.keyCode == 39 && direction != "left") {
            direction = "right";
        }
        else if (event.keyCode == 40 && direction != "up") {
            direction = "down";
        }
    }
});

function highScore() {
    var userScores = JSON.parse(localStorage["snakeScores"]);
    var prevHigh = Math.max.apply(Math, userScores);
    return Math.max(prevHigh, 0);
}

function startGame() {
    $('#game-info').css({ 'visibility': 'visible' });
    showGameStats();
    direction = "right";
    gameOver = false;
    gameScore = 0;
}

for (var i = 0; i < 5; i++) {
    snakeArray.push({ x: i, y: 0 });
}

function moveSnake() {

    var newX = snakeArray[0].x;
    var newY = snakeArray[0].y;
    switch(direction) {
        case "right":
            newX++;
            break;
        case "left":
            newX--;
            break;
        case "up":
            newY--;
            break;
        case "down":
            newY++;
            break;
    }

    var tail = snakeArray.pop();
    tail.x = newX;
    tail.y = newY;
    snakeArray.unshift(tail);

}

function generateApples() {
    apple["x"] = Math.round(Math.random() * (width / 10));
    apple["y"] = Math.round(Math.random() * 24);
}

function drawApple(x,y) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x * cellWidth, y * cellWidth, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function incrementLevel() {
    level = Math.ceil(gameScore / 10);
    addAchievement(level);
}

function showGameStats() {
    $('#level').html("<strong>Level: </strong>" +  level +
                     " <span id='score'>Score: " + gameScore +
                     "</span><span id='high-score'> High Score: " + highScore() + "</span>");
}

function incrementScore() {
    if (!gameOver) {
        var appleX = apple["x"];
        var appleY = apple["y"];
        var snakeX = snakeArray[0].x;
        var snakeY = snakeArray[0].y;
        if (appleX == snakeX && appleY == snakeY) {
            gameScore += 5;
            incrementLevel();
            generateApples();
            drawApple(apple["x"],apple["y"]);
            showGameStats();
            snakeArray.push({ x: snakeArray.length, y: 0 });

        }
    }
}

function addScore() {
    if (scores.indexOf(gameScore) == -1) {
        scores.push(gameScore);
    }

    var oldScores = JSON.parse(localStorage['snakeScores']);
    var newScores = oldScores.concat(scores);
    newScores = makeUnique(newScores);
    localStorage['snakeScores'] = JSON.stringify(newScores);
}

function showAchievement() {
    $('#notification').html('You have unlocked the achievement ' + "level" + level);
    $('#notification').css({ 'visibility': 'visible' });
    setTimeout(function() {
        $('#notification').css({ 'visibility': 'hidden' });
    }, 4000);
}

function makeUnique(array) {
    return array.filter(function(element, index) {
        return array.indexOf(element) == index;
    });
}

function addAchievement(level) {
    var oldAchievements = JSON.parse(localStorage['snakeAchievements']);
    var achievement = 'level' + level;

    if (achievements.indexOf(achievement) == -1 && oldAchievements.indexOf(achievement) == -1) {
        achievements.push(achievement);
        showAchievement();
    }

    var newAchievements = oldAchievements.concat(achievements);
    newAchievements = makeUnique(newAchievements);

    localStorage["snakeAchievements"] = JSON.stringify(newAchievements);

}

function endGame() {
    var newX = snakeArray[0].x;
    var newY = snakeArray[0].y;

    if (newX == -1 || newX == 50 || newY == -1 || newY == 25) {
        gameOver = true;
        clearInterval(increaseScore);
        clearInterval(drawSnake);
        addScore();
        setTimeout(function() {
            document.location.reload();
        },500);
    }
}

function updateBoard() {
    for (var i = 0; i < snakeArray.length; i++) {
        var cell = snakeArray[i];
        ctx.fillStyle = "blue";
        ctx.fillRect(cell["x"] * cellWidth, cell["y"] * cellWidth,  cellWidth, cellWidth);
    }
}

// Our main function that will be constantly repeated
function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    moveSnake();
    endGame();
    updateBoard();
    drawApple(apple["x"], apple["y"]);
}

function play() {
    generateApples();
    drawSnake = setInterval(draw, 60);
    increaseScore = setInterval(incrementScore, 60);
}
