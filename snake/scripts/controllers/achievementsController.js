angular.module('my-app')
    .controller('achievementsController', ['$scope', function($scope) {
        
        $scope.hasAchievement = function(achievement) {
            return localStorage['shapeAchievements'].indexOf(achievement) != -1;
        }
        
        $scope.levelAchievements = [
                                     { 'name': 'Level 1',  'value': 0,   'src': 'score100.png',  'alt': 'Level 1'  },
                                     { 'name': 'Level 2',  'value': 10,  'src': 'score200.png',  'alt': 'Level 2'  },
                                     { 'name': 'Level 3',  'value': 20,  'src': 'score500.jpg',  'alt': 'Level 3'  },
                                     { 'name': 'Level 4',  'value': 30,  'src': 'score1000.jpe', 'alt': 'Level 4' },
                                     { 'name': 'Level 5',  'value': 40,  'src': 'score100.png',  'alt': 'Level 5'  },
                                     { 'name': 'Level 6',  'value': 50,  'src': 'score200.png',  'alt': 'Level 6'  }
                                   ];
                                   
        $scope.scoreAchievements = [
                                     { 'name': 'Score 100',  'value': 100,  'src': 'score100.png',  'alt': 'Score 100'  },
                                     { 'name': 'Score 200',  'value': 200,  'src': 'score200.png',  'alt': 'Score 200'  },
                                     { 'name': 'Score 500',  'value': 500,  'src': 'score500.jpg',  'alt': 'Score 500'  },
                                     { 'name': 'Score 1000', 'value': 1000, 'src': 'score1000.jpe', 'alt': 'Score 1000' }
                                   ];
                                   
        $scope.gameAchievements = [
                                    { 'name': 'Novice',       'value': 1,  'src': 'novice.jpe',      'alt': 'Novice'        },
                                    { 'name': 'Beginner',     'value': 5,  'src': 'beginner.jpg',    'alt': 'Beginner'      },
                                    { 'name': 'Journeyman',   'value': 10, 'src': 'journeyman.png',  'alt': 'Journeyman'    },
                                    { 'name': 'Master',       'value': 20, 'src': 'master.jpe',      'alt': 'Master'        },
                                    { 'name': 'Grand Master', 'value': 30, 'src': 'grandmaster.jpg', 'alt': 'Grand Master'  }
                                  ];
                                  
    }]);
    