const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerSelectionEl = document.getElementById('player-selection');
const computerSelectionEl = document.getElementById('computer-selection');
const resultEl = document.querySelector('.result');
const buttons = document.querySelectorAll('.btn');
const resetBtn = document.getElementById('reset');
const popup = document.getElementById('popup');
const winnerText = document.getElementById('winner-text');
const playAgainBtn = document.getElementById('play-again');

let playerScore = 0;
let computerScore = 0;
const WIN_SCORE = 5;
const choices = ['rock', 'paper', 'scissors'];
const emojis = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (isGameOver()) return;

    const playerChoice = button.id;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(playerChoice, computerChoice);

    playerSelectionEl.textContent = emojis[playerChoice];
    computerSelectionEl.textContent = emojis[computerChoice];
    playerSelectionEl.setAttribute('aria-label', `Your selection: ${playerChoice}`);
    computerSelectionEl.setAttribute('aria-label', `Computer selection: ${computerChoice}`);
    triggerPop(playerSelectionEl);
    triggerPop(computerSelectionEl);

    resultEl.classList.remove('win', 'lose', 'tie');
    if (winner === 'player') {
      playerScore++;
      playerScoreEl.textContent = playerScore;
      resultEl.textContent = `You win this round! ${capitalize(playerChoice)} beats ${computerChoice}.`;
      resultEl.classList.add('win');
    } else if (winner === 'computer') {
      computerScore++;
      computerScoreEl.textContent = computerScore;
      resultEl.textContent = `You lose this round! ${capitalize(computerChoice)} beats ${playerChoice}.`;
      resultEl.classList.add('lose');
    } else {
      resultEl.textContent = `It's a tie! You both chose ${playerChoice}.`;
      resultEl.classList.add('tie');
    }

    checkGameOver();
  });
});

resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

popup.addEventListener('click', (event) => {
  if (event.target === popup) resetGame();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !popup.hidden) resetGame();
});

function getWinner(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'player';
  return 'computer';
}

function isGameOver() {
  return playerScore >= WIN_SCORE || computerScore >= WIN_SCORE;
}

function checkGameOver() {
  if (!isGameOver()) return;
  setButtonsDisabled(true);
  winnerText.textContent = playerScore >= WIN_SCORE ? '🎉 You Win the Game!' : '💻 Computer Wins!';
  popup.hidden = false;
  requestAnimationFrame(() => popup.classList.add('show'));
  playAgainBtn.focus();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  playerSelectionEl.textContent = '❔';
  computerSelectionEl.textContent = '❔';
  playerSelectionEl.setAttribute('aria-label', 'Your selection: none yet');
  computerSelectionEl.setAttribute('aria-label', 'Computer selection: none yet');
  resultEl.textContent = 'Make your move!';
  resultEl.classList.remove('win', 'lose', 'tie');
  popup.classList.remove('show');
  popup.hidden = true;
  setButtonsDisabled(false);
}

function setButtonsDisabled(disabled) {
  buttons.forEach(button => {
    button.disabled = disabled;
  });
}

function triggerPop(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
