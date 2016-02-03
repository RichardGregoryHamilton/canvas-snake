function checkStorage(key) {
    if(!localStorage[key]) {
        localStorage[key] = JSON.stringify([]);
    }
}

checkStorage('snakeAchievements');
checkStorage('snakeScores');
checkStorage('snakePurchases');

if (!localStorage['snakeGamesPlayed']) {
    localStorage['snakeGamesPlayed'] = 0;
}

if (!localStorage['snakeTotalScore']) {
    localStorage['snakeTotalScore'] = 0;
}

if (!localStorage['snakeCoins']) {
    localStorage['snakeCoins'] = 0;
}
