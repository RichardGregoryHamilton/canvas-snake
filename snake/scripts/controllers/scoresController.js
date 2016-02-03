angular.module('my-app')
    .controller('scoresController', ['$scope', function($scope) {
        $scope.oldScores = JSON.parse(localStorage['shapeScores'] || '[]');

        $scope.sorted = $scope.oldScores.sort(function(scoreA, scoreB) {
            return scoreB - scoreA;
        });

        $scope.scoreData = [
                             { 'class': 'gold',     'score': $scope.sorted[0], 'level': Math.floor($scope.sorted[0] / 10) + 1 },
                             { 'class': 'silver',   'score': $scope.sorted[1], 'level': Math.floor($scope.sorted[1] / 10) + 1 },
                             { 'class': 'bronze',   'score': $scope.sorted[2], 'level': Math.floor($scope.sorted[2] / 10) + 1 },
                             { 'class': 'top-five', 'score': $scope.sorted[3], 'level': Math.floor($scope.sorted[3] / 10) + 1 },
                             { 'class': 'top-five', 'score': $scope.sorted[4], 'level': Math.floor($scope.sorted[4] / 10) + 1 }
                           ];
    }]);