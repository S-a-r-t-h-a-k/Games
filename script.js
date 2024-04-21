let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function makeMove(index) {
  if (!gameOver && board[index] === '') {
    board[index] = currentPlayer;
    render();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      showWinner(`${currentPlayer} wins!`);
      return;
    }
  }

  if (!board.includes('')) {
    gameOver = true;
    showResult("It's a draw!");
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  clearBoard(); // Clear the board visually
}

function clearBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = ''; // Clear the text content of each cell
  });
}

function showResult(message) {
  const resultElement = document.getElementById('result');
  resultElement.textContent = message;
  resultElement.classList.add('show');
  setTimeout(() => {
    resultElement.classList.remove('show');
  }, 2000);
}

function showWinner(message) {
  const winnerElement = document.createElement('div');
  winnerElement.id = 'winner';
  winnerElement.textContent = message;
  document.body.appendChild(winnerElement);
  setTimeout(() => {
    winnerElement.remove();
  }, 3000);
}
