/* This JavaScript file is for dealing with achievements */

var levelAchievements = [];
var scoreAchievements = [];

var numAchievements = JSON.parse(localStorage["snakeAchievements"]).length;
var oldAchievements = JSON.parse(localStorage['snakeAchievements']);

var gamesPlayed = Number(localStorage['mathGamesPlayed']);
var totalScore = Number(localStorage['snakeTotalScore']);

var allScoreAchievements = [{ 'name': 'score100', 'value': 100 },
                            { 'name': 'score200', 'value': 200 },
                            { 'name': 'score500', 'value': 500 },
                            { 'name': 'score1000', 'value': 1000 }];
                            

function showAchievement() {
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

function addScoreAchievements() {
    for (var i = 0; i < allScoreAchievements.length; i++) {
        var achievement = allScoreAchievements[i];
        if (scoreAchievements.indexOf(achievement.name) == -1 && oldAchievements.indexOf(achievement.name) == -1) {
            if (totalScore > achievement.value) {
                scoreAchievements.push(achievement.name);
                $('#notification').html('You have unlocked the achievement ' + 'score' + achievement.value);
                showAchievement();
            }
        }
    }
}

function addLevelAchievements() {
    var achievement = 'level' + level;

    if (levelAchievements.indexOf(achievement) == -1 && oldAchievements.indexOf(achievement) == -1) {
        levelAchievements.push(achievement);
        if (level < 7) {
            $('#notification').html('You have unlocked the achievement ' + achievement);
            showAchievement();
        }
    }
}

function addAchievement(level) {
    
    addLevelAchievements();
    addScoreAchievements();

    var newAchievements = oldAchievements.concat(levelAchievements).concat(scoreAchievements);
    newAchievements = makeUnique(newAchievements);
    localStorage["snakeAchievements"] = JSON.stringify(newAchievements);
}

/* Update the achievements in the achievements table based on their class */

    $(".level").each(function() {
        var index = $(this).html().match(/\d/)[0];
        $(this).parent().prop("class", index <= numAchievements ? "unlocked": "locked");
    });
    
    $('.games-played').each(function() {
        var gamesRequired = $(this).next().html().match(/\d+/)[0];
        $(this).parent().prop('class', gamesPlayed >= gamesRequired ? 'unlocked' : 'locked');
    });

    $('.total-score').each(function() {
        var scoreRequired = $(this).next().html().match(/\d+/)[0];
        $(this).parent().prop('class', totalScore >= scoreRequired ? 'unlocked' : 'locked');
    });
    