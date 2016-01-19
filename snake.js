$(document).ready(function() {
    var canvas = $("#my-canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var snakeArray = [];
    var cellWidth = 10;
    var direction = "right";
    var gameOver = false;
    var playing = false;
    var gameScore = 0;
    var level = 1;
    var scores = [];
    var apple = {};
    
    if (!localStorage['snakeScores']) {
        localStorage['snakeScores'] = JSON.stringify([]);
    }

    function startGame() {
        $('#level').html("<strong>Level: </strong>" + level + " <span id='score'>Score: " +
    gameScore + "</span><span id='high-score'> High Score: " + 0 + "</span>");
        direction = "right";
        gameOver = false;
        gameScore = 0;
    }
    
    for (var i = 0; i < 5; i++) {
        snakeArray.push({ x: i, y: 0 });
    }
    
    var snakeLength = snakeArray.length;
    
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
        apple["x"] = Math.random() * (width - cellWidth) / cellWidth;
        apple["y"] = Math.random() * (height - cellWidth) / cellWidth;
    }
    
    setInterval(generateApples,5000);
    
    function drawApple(x,y) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x * cellWidth, y * cellWidth, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    
    function incrementLevel() {
        level = Math.ceil(gameScore / 10);
    }
    
    function incrementScore() {
        if (!gameOver) {
            var appleX = Math.round(apple["x"]);
            var appleY = Math.round(apple["y"]);
            var snakeX = snakeArray[0].x;
            var snakeY = snakeArray[0].y;
            if (appleX == snakeX && appleY == snakeY) {
                gameScore+= 5;
                incrementLevel();
                $('#level').html("<strong>Level: </strong>" +  level + " <span id='score'>Score: " +
    gameScore + "</span><span id='high-score'> High Score: " + 0 + "</span>");
                snakeArray.push({ x: snakeArray.length, y: 0 });
            }
            $("#abc").html(snakeArray[0].x);
        }
    }
    
    function addScore() {
        scores.push(gameScore);
        var userScores = JSON.parse(localStorage['snakeScores']);
        var sessionScores = JSON.stringify(scores);
        if (userScores.length > scores.length) {
            localStorage['snakeScores'] = localStorage['snakeScores'].replace(']', '') +
            (',' + sessionScores.replace('[', ''));
        }
        else {
            localStorage['snakeScores'] = sessionScores;;
        }
    }
    
    function endGame() {
        var newX = snakeArray[0].x;
        var newY = snakeArray[0].y;
        
        if (newX == -1 || newX == 50 || newY == -1 || newY == 50) {
            gameOver = true;
            clearInterval(increaseScore);
            clearInterval(drawSnake);
            addScore();
        }
    }
    function updateBoard() {
        for (var i = 0; i < snakeLength; i++) {
            var cell = snakeArray[i];
            ctx.fillStyle = "blue";
            ctx.fillRect(cell["x"] * cellWidth, cell["y"] * cellWidth, 10, 10);
        }
    }
    
    function draw() {
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        
        moveSnake();
        endGame();
        updateBoard();
        
        drawApple(apple["x"], apple["y"]);
    }
    
    $("#new-game").on("click", function() {
        startGame();
        play();
    });
    
    function play() {
        drawSnake = setInterval(draw, 60);
        increaseScore = setInterval(incrementScore, 100);
    }
    
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
});
