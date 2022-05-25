"use strict"

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0")
const current1Element = document.getElementById("current--1")
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnNRoll = document.querySelector(".btn--roll");

const player0Eement = document.querySelector(".player--0");
const player1Eement = document.querySelector(".player--1");


/*установка начальных очков*/
score0Element.textContent = 0;
score1Element.textContent = 0;
/*скрыть кубик при старте игры путем добавления класса hide из css*/
diceElement.classList.add('hidden');

const totalScoreArr = [0, 0]
let currentScore = 0;
let activePlayer = 0;
let continuePlaying = true;

const switchActivePlayer = () => {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`)
        .textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    /*логика переключения активного окна*/
    player0Eement.classList.toggle('player--active')
    player1Eement.classList.toggle('player--active')
}


/*логика броска кубика*/
btnNRoll.addEventListener('click', () => {
    if (continuePlaying) {
        let randomNumber = Math.trunc(Math.random() * 6) + 1
        /*отображение кубика*/
        diceElement.classList.remove('hidden')
        /*отображение соответствующей числу на костях картинки*/
        diceElement.src = `../resources/dice${randomNumber}.png`
        console.log(randomNumber)
        /*если значение не равно 1*/
        if (randomNumber !== 1) {
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`)
                .textContent = currentScore
        }
        /*если значение не равно 1*/
        if (randomNumber === 1) {
            switchActivePlayer();
        }
    }
})

btnHold.addEventListener("click", () => {
    if (continuePlaying) {
        /*добавить текущие очки к общем очкам текущего игрока*/
        totalScoreArr[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`)
            .textContent = totalScoreArr[activePlayer];

        /*логика победы в случае 100 очков*/
        if (totalScoreArr[activePlayer] >= 100) {
            continuePlaying = false
            document.querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active')
            diceElement.classList.add('hidden');
        } else {
            switchActivePlayer();
        }
    }
})

btnNew.addEventListener('click',()=>{
    document.location.reload();
})