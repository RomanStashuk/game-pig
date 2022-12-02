'use strict';

// Elements selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let isGameActive,
    activePlayer,
    currentScore,
    totalScores;

function initGame() {
    diceElement.classList.add('hidden');

    isGameActive = true;
    activePlayer = 0;
    currentScore = 0;
    totalScores = [0, 0];

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    player0Element.classList.remove('player--active');
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
}

function switchPlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

initGame();

btnRoll.addEventListener('click', () => {
    if(isGameActive) {
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        diceElement.classList.remove('hidden');
        diceElement.src = `img/dice${diceNumber}.png`;

        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', () => {
    if (isGameActive) {
        totalScores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];

        if(totalScores[activePlayer] >= 100) {
            isGameActive = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', initGame);
