var scores, currentScore, activePlayer, gamePlays, maxScore, lastRoll, dice;
gamePlays = true;



addManualScore = () => {
    document.querySelector('.btn--addScore').addEventListener('click', () => {
        maxScore = document.getElementById('setMaxScore').value;
        maxScoreFormat(maxScore);
    })
}
init = () => {
    document.querySelectorAll('.btn--field')[1].style.display = 'none';
    addManualScore();
    gamePlays = true;
    if(gamePlays){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    lastRoll = 0;
    dice = 0;
    maxScore = 30;
    document.getElementById('score--0').innerHTML = 0;
    document.getElementById('score--1').innerHTML = 0;
    document.getElementById('current--0').innerHTML = 0;
    document.getElementById('current--1').innerHTML = 0;

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');

    document.getElementById('name--0').innerHTML = "Player 1";
    document.getElementById('name--1').innerHTML = "Player 2";


    document.querySelector('.dice').style.display = 'none';
    }
}

init();

document.querySelector('.btn--roll').addEventListener('click', () => {
    if(maxScore === 30){
        maxScoreFormat(maxScore);
    }
    lastRoll = dice;
    if(gamePlays){
        dice = Math.floor(Math.random() * 6) + 1;
        if(dice === lastRoll && dice === 6 && lastRoll === 6){
            scores[activePlayer] = 0;
            document.getElementById('score--' + activePlayer).innerHTML = scores[activePlayer];
            lastRoll = 0; dice = 0;
            nextPlayer();
        }else{
            document.querySelector('.dice').style.display = 'block';
            document.querySelector('.dice').src = 'dice-' + dice + '.png';
            if(dice !== 1){
                currentScore += dice;
                lastScore = currentScore - dice;
                document.getElementById('current--' + activePlayer).textContent = currentScore;
            }else{
                nextPlayer();        
            }
        }
    }
})

document.querySelector('.btn--hold').addEventListener('click', () => {
    if(gamePlays){
    scores[activePlayer] += currentScore;
    document.getElementById('score--' + activePlayer).innerHTML = scores[activePlayer];
    lastRoll = 0; dice = 0;
    if(scores[activePlayer] >= maxScore){
        document.getElementById('name--' + activePlayer).textContent = "Winner!";
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        gamePlays = false;
    }
    nextPlayer();
    }
})

document.querySelector('.btn--new').addEventListener('click', () => {
    init();
    document.querySelector('.btn--field').style.display = 'block';
    document.querySelector('.btn--field').value = '';
    document.querySelector('.btn--addScore').style.display = 'block';

});

nextPlayer = () => {
    if(gamePlays){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;
    document.getElementById('current--0').innerHTML = currentScore;
    document.getElementById('current--1').innerHTML = currentScore;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    }
}

maxScoreFormat = (score) => {
    var text = "First to " + score + ' wins!';
    document.querySelector('.btn--field').style.display = 'none';
    document.querySelector('.btn--addScore').style.display = 'none';
    document.querySelectorAll('.btn--field')[1].style.display = 'block';
    document.getElementById('paragraph').innerHTML = text;
}