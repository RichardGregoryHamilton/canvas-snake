function checkStorage(key) {
    if(!localStorage[key]) {
        localStorage[key] = JSON.stringify([]);
    }
}

checkStorage('achievements');
checkStorage('scores');
checkStorage('purchases');

if (!localStorage['gamesPlayed']) {
    localStorage['gamesPlayed'] = 0;
}

if (!localStorage['totalScore']) {
    localStorage['totalScore'] = 0;
}

if (!localStorage['coins']) {
    localStorage['coins'] = 0;
}
