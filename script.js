"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceImg = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0Sc = document.getElementById("current--0");
const current1Sc = document.getElementById("current--1");
let scores, currentScore, activePlayer, playing;

const init = function () {
  diceImg.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0Sc.textContent = 0;
  current1Sc.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  diceImg.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

rollDice.addEventListener("click", function () {
  const diceNo = Math.trunc(Math.random() * 6) + 1;
  diceImg.classList.remove("hidden");
  diceImg.src = `dice-${diceNo}.png`;

  if (diceNo !== 1) {
    currentScore += diceNo;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else switchPlayer();
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      playing = false;
      diceImg.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    } else switchPlayer();
  }
});

btnNew.addEventListener("click", init);
