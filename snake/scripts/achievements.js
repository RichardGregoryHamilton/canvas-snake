/* This JavaScript file is for dealing with achievements */

$('#my-header').load('header.html');

var levelAchievements = [];
var scoreAchievements = [];
var gamesPlayed = Number(localStorage['snakeGamesPlayed']);
var totalScore = Number(localStorage['snakeTotalScore']);
var oldAchievements = JSON.parse(localStorage['snakeAchievements']);
var achievementMessage = 'You have unlocked the achievement ';

function countLevelAchievements(achievements) {
    return achievements.filter(function(achievement) {
        return achievement.match(/level/i);
    }).length;
}

var allScoreAchievements = [{ 'name': 'Score 100', 'value': 100 },
                            { 'name': 'Score 200', 'value': 200 },
                            { 'name': 'Score 500', 'value': 500 },
                            { 'name': 'Score 1000', 'value': 1000 }];
                            
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
                $('#notification').html(achievementMessage + 'Score ' + achievement.value);
                showAchievement();
            }
        }
    }
}

function addLevelAchievements() {
    var achievement = 'Level ' + level;

    if (levelAchievements.indexOf(achievement) == -1 && oldAchievements.indexOf(achievement) == -1) {
        if (level < 7) {
            levelAchievements.push(achievement);
            $('#notification').html(achievementMessage + achievement);
            showAchievement();
        }
    }
}

function addAchievement(level) {
    
    addLevelAchievements();
    addScoreAchievements();

    var newAchievements = oldAchievements.concat(levelAchievements).concat(scoreAchievements);
    newAchievements = makeUnique(newAchievements);
    localStorage['snakeAchievements'] = JSON.stringify(newAchievements);
}

// Update the achievements in the achievements table based on the class of the row

    $('.level').each(function() {
        var index = $(this).html().match(/\d/)[0];
        $(this).parent().prop('class', index <= countLevelAchievements(oldAchievements) ? 'unlocked': 'locked');
    });
    
    $('.games-played').each(function() {
        var gamesRequired = $(this).next().html().match(/\d+/)[0];
        $(this).parent().prop('class', gamesPlayed >= gamesRequired ? 'unlocked' : 'locked');
    });

    $('.total-score').each(function() {
        var scoreRequired = $(this).next().html().match(/\d+/)[0];
        $(this).parent().prop('class', totalScore >= scoreRequired ? 'unlocked' : 'locked');
    });
    