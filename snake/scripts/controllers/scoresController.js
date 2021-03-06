angular.module('my-app')
    .controller('scoresController', ['$scope', 'Game', function($scope, Game) {
        
        $scope.score = Game.score;
        $scope.level = Game.level;
        $scope.playing = false;
        $scope.coins = localStorage['coins'];
        
        setInterval(function() {
            $('#score').html('Score: ' + Game.score);
            $('#level').html('Level: ' + Game.level);
        }, 100);
        
        var oldScores = JSON.parse(localStorage['scores'] || '[]');

        var sorted = oldScores.sort(function(scoreA, scoreB) {
            return scoreB - scoreA;
        });
        
        $scope.highScore = function() {
            return Math.max(Math.max.apply(Math, oldScores), 0, Game.score);
        }

        $scope.scoreData = [
                             { 'class': 'gold',     'score': sorted[0], 'level': Math.floor(sorted[0] / 10) + 1 },
                             { 'class': 'silver',   'score': sorted[1], 'level': Math.floor(sorted[1] / 10) + 1 },
                             { 'class': 'bronze',   'score': sorted[2], 'level': Math.floor(sorted[2] / 10) + 1 },
                             { 'class': 'top-five', 'score': sorted[3], 'level': Math.floor(sorted[3] / 10) + 1 },
                             { 'class': 'top-five', 'score': sorted[4], 'level': Math.floor(sorted[4] / 10) + 1 }
                           ];
    }]);