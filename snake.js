$(document).ready(function() {
    var canvas = $("#my-canvas")[0];
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var snakeArray = [];
	var cellWidth = 10;
	var direction = "right";
	var gameOver = false;
	var score = 0;
	
	for (var i = 0; i < 5; i++) {
		snakeArray.push({ x: i, y: 0 });
	}
	
	var snakeLength = snakeArray.length;
	
	function moveSnake() {
		
		var newX = snakeArray[0].x;
		var newY = snakeArray[0].y;
		
		if (direction == "right") {
			newX++;
		}
		else if (direction == "left") {
			newX--;
		}
		else if (direction == "up") {
			newY--;
		}
		else if (direction == "down") {
			newY++;
		}
		
		var tail = snakeArray.pop();
		tail.x = newX;
		tail.y = newY;
		snakeArray.unshift(tail);
		
	}
	
	function endGame() {
		var newX = snakeArray[0].x;
		var newY = snakeArray[0].y;
		
		if (newX == -1 || newX == 50 || newY == -1 || newY == 50) {
			gameOver = true;
		}
	}
	
	function draw() {
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, width, height);
		
		moveSnake();
		endGame();
		for (var i = 0; i < snakeLength; i++) {
			var cell = snakeArray[i];
			ctx.fillStyle = "blue";
			ctx.fillRect(cell["x"] * cellWidth, cell["y"] * cellWidth, 10, 10);
		}
	}
	
	var drawSnake = setInterval(draw, 60);
	
	document.body.addEventListener("keydown", function(event) {
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
