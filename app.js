var scores, currentScore, activePlayer, gamePlays, maxScore, lastRoll1, lastRoll2, dice1, dice2;
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
    lastRoll1 = 0;
    dice1 = 0;
    lastRoll2 = 0;
    dice2 = 0;
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


    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    }
}

init();

document.querySelector('.btn--roll').addEventListener('click', () => {
    if(maxScore === 30){
        maxScoreFormat(maxScore);
    }
    lastRoll1 = dice1;
    lastRoll2 = dice2;
    if(gamePlays){
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        condition = (dice1 === lastRoll1 && dice1 === 6 && lastRoll1 === 6) ||
                    (dice2 === lastRoll2 && dice2 === 6 && lastRoll2 === 6) ||
                    (dice1 === lastRoll2 && dice1 === 6 && lastRoll2 === 6) ||
                    (dice2 === lastRoll1 && dice2 === 6 && lastRoll1 === 6)
        if(condition){
            scores[activePlayer] = 0;
            document.getElementById('score--' + activePlayer).innerHTML = scores[activePlayer];
            lastRoll1 = 0;
            dice1 = 0;
            lastRoll2 = 0;
            dice2 = 0;
            nextPlayer();
        }else{
            document.getElementById('dice1').style.display = 'block';
            document.getElementById('dice2').style.display = 'block';
            document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
            document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
            if(dice1 !== 1 && dice2 !== 1){
                currentScore += dice1 + dice2;
                document.getElementById('current--' + activePlayer).textContent = currentScore;
            }else if(dice1 === 1 || dice2 === 1){
                nextPlayer();        
            }
        }
    }
})

document.querySelector('.btn--hold').addEventListener('click', () => {
    if(gamePlays){
    scores[activePlayer] += currentScore;
    document.getElementById('score--' + activePlayer).innerHTML = scores[activePlayer];
    lastRoll1 = 0;
    dice1 = 0;
    lastRoll2 = 0;
    dice2 = 0;
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