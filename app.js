var scores, currentScore, activePlayer, gamePlays;
gamePlays = true;
init = () => {
    gamePlays = true;
    if(gamePlays){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
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
    if(gamePlays){
        var dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    if(dice !== 1){
    currentScore += dice;
    document.getElementById('current--' + activePlayer).textContent = currentScore;
    }else{
        nextPlayer();        
    }
    }
})

document.querySelector('.btn--hold').addEventListener('click', () => {
    if(gamePlays){
    //Add current score to global score
    scores[activePlayer] += currentScore;
    document.getElementById('score--' + activePlayer).innerHTML = scores[activePlayer];
    if(scores[activePlayer] >= 30){
        document.getElementById('name--' + activePlayer).textContent = "Winner!";
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        gamePlays = false;
    }
    nextPlayer();
    }


})

document.querySelector('.btn--new').addEventListener('click', init);

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