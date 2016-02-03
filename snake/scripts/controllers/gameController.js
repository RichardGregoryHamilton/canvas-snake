angular.module('my-app')
    .controller('gameController', ['$scope', 'Game',  function($scope, Game) {
        
        var canvas = $('#my-canvas')[0];
        var ctx = canvas.getContext('2d');

        var width = $('canvas').css('width').match(/\d/g).join('');
        var height = $('canvas').css('height').match(/\d/g).join('');

        // Objects to keep track of game information
        var snake = [];
        var apple = {};

        var cellWidth = 6;
        var direction = 'right';
        var playing = false;
        
        var scores = [];
        //var score = 0;
        //var level = 1;

        //$('#notification').css({ 'visibility': 'hidden' });

        $('body').on('keydown', function(event) {
            if (playing) {
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

        $scope.startGame = function() {
            direction = 'right';
            Game.playing = true;
            Game.score = 0;
            $scope.play();
        }

        for (var i = 0; i < 5; i++) {
            snake.push({ x: i, y: 0 });
        }

        var newX = snake[0].x;
        var newY = snake[0].y;
    
        $scope.moveSnake = function() {

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

        $scope.generateApples = function() {
            apple['x'] = Math.round(Math.random() * (width / 10));
            apple['y'] = Math.round(Math.random() * 24);
        }

        $scope.drawApple = function(x,y) {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(x * cellWidth, y * cellWidth, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        $scope.incrementLevel = function() {
            Game.level = Math.ceil(Game.score / 10);
            //$scope.addAchievement(Game.level);
        }

        $scope.addCoins = function() {
            var currentCoins = Number(localStorage['snakeCoins']);
            var coinsEarned = Math.floor(Game.score / 5);
            localStorage['snakeCoins'] = currentCoins > 0 ? currentCoins + coinsEarned: coinsEarned;
            $('#coins-display .coins-badge').html(localStorage['snakeCoins']);
        }

        $scope.reload = function() {
            document.location.reload();
        }

        snakeCollision = function(cell1, cell2) {
            return cell1.x == cell2.x && cell1.y == cell2.y && cell1.y != 0;
        }

        $scope.calculateCollision = function() {
            var snakeCells = [];
            for (var i = snake.length - 1; i > 0; i--) {
                snakeCells.push(i);
            }
            return snakeCells.some(function(cell) {
                return snakeCollision(snake[0], snake[cell]);
            });
        }

        $scope.checkLoss = function() {

            if (newX == -1 || newX == 50 || newY == -1 || newY == 25 || $scope.calculateCollision()) {
                playing = true;
                clearInterval($scope.increaseScore);
                clearInterval($scope.drawSnake);
                $scope.addScore();
                //addCoins();
                setTimeout($scope.reload, 500);
            }
        }

        // This updates and draws the position of the snake
        $scope.updateBoard = function() {
            for (var i = 0; i < snake.length; i++) {
                var cell = snake[i];
                ctx.fillStyle = 'blue';
                ctx.fillRect(cell['x'] * cellWidth, cell['y'] * cellWidth, cellWidth, cellWidth);
            }
        }

        // Our main function that will be constantly repeated
        $scope.draw = function() {
            ctx.clearRect(0, 0, width, height);
            $scope.moveSnake();
            $scope.checkLoss();
            $scope.updateBoard();
            $scope.drawApple(apple['x'], apple['y']);
        }

        // Call this function to start a new game
        $scope.play = function() {
            localStorage['snakeGamesPlayed'] = ++localStorage['snakeGamesPlayed'];
            $scope.generateApples();
            $scope.drawSnake = setInterval($scope.draw, 60);
            $scope.increaseScore = setInterval($scope.incrementScore, 60);
        }

        $scope.incrementScore = function() {
            if (!playing) {
                if (apple['x'] == snake[0].x && apple['y'] == snake[0].y) {
                    Game.score++;
                    console.log(Game.score);
                    $scope.incrementLevel();
                    $scope.generateApples();
                    $scope.drawApple(apple['x'], apple['y']);
                    snake.push({ x: snake.length, y: 0 });

                }
            }
        }

        var oldScores = JSON.parse(localStorage['snakeScores'] || '[]');
        
        $scope.addScore = function() {
            if (scores.indexOf(Game.score) < 0) {
                scores.push(Game.score);
            }
            $scope.addCoins();

            var newScores = oldScores.concat(scores);
           // newScores = $scope.makeUnique(newScores);
            localStorage['snakeScores'] = JSON.stringify(newScores);
            var newTotal = Number(localStorage['snakeTotalScore']) + Game.score;
            localStorage['snakeTotalScore'] = newTotal;
        }
        
    }]);
    