const cells = document.querySelectorAll('.cell');
const currentPlayerText = document.getElementById('current-player');
const player1ScoreText = document.getElementById('player1-score');
const player2ScoreText = document.getElementById('player2-score');
const resetButton = document.getElementById('reset-btn');

let player1Name = prompt("Enter Player 1 Name:");
let player2Name = prompt("Enter Player 2 Name:");
let currentPlayer = 'X'; // Player 1 starts
let gameOver = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let player1Score = 0;
let player2Score = 0;

function handleCellClick(event) {
  const clickedCellIndex = event.target.dataset.cellIndex;
  if (gameOver || gameBoard[clickedCellIndex] !== '') {
    return;
  }

  gameBoard[clickedCellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameOver = true;
    if (currentPlayer === 'X') {
      player1Score++;
      player1ScoreText.textContent = `Player 1: ${player1Score}`;
    } else {
      player2Score++;
      player2ScoreText.textContent = `Player 2: ${player2Score}`;
    }
    currentPlayerText.textContent = `${currentPlayer} Wins!`;
    return;
  }

  if (checkTie()) {
    gameOver = true;
    currentPlayerText.textContent = `It's a Tie!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerText.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} ( ${currentPlayer} )'s Turn`;
  
  // Disable clicks after game over
  if (gameOver) {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
  }
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    if (gameBoard[condition[0]] === currentPlayer &&
        gameBoard[condition[1]] === currentPlayer &&
        gameBoard[condition[2]] === currentPlayer) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  // Check if all cells are filled
  const allFilled = gameBoard.every(cell => cell !== '');
  return allFilled && !gameOver;
}

resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  gameOver = false;
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = ''); // Clear cell content
  currentPlayerText.textContent = `${player1Name} (X)'s Turn`; // Reset current player text
});

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));