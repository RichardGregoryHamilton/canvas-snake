angular.module('my-app')
    .factory('Game', function() {
        return { 
            level: 1,
            score: 0,
            playing: false,
            coins: localStorage['coins']
        };
    });