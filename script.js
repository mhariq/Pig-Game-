'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentscore1El = document.getElementById('current--0');
const currentscore2El = document.getElementById('current--1');
// const player1El = document.getElementById('player--0');
// const player2El = document.getElementById('player--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let p1, p2;

//Initalize

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentscore1El.textContent = 0;
  currentscore2El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  document.querySelector('#name--1').value = '';
  document.querySelector('#name--0').value = '';

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // playerName();
};

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice, currentScore);

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentscore1El.textContent = currentScore; //CHANGE LATER
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if score >= 100 announce winner
    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    }

    //if score <100 switch player and hold the score
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

//Modal script

const toggleModal = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

btnRules.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) toggleModal();
});
