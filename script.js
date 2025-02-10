const board = document.getElementById('board');
    const statusDiv = document.getElementById('status');
    let cells = [];
    let solution = [];
    let originalPuzzle = [];

    for (let i = 0; i < 81; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'cell';
      input.maxLength = 1;
      cells.push(input);
      board.appendChild(input);

      input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value && !/^[1-9]$/.test(value)) {
          e.target.value = '';
        }
        validateCell(input);
        checkCompletion();
      });

      input.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '9') {
          e.preventDefault();
          e.target.value = e.key;
          validateCell(input);
          checkCompletion();
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          if (!e.target.classList.contains('prefilled')) {
            e.target.value = '';
          }
        } else if (e.key === 'ArrowLeft') {
          if (i > 0) cells[i - 1].focus();
        } else if (e.key === 'ArrowRight') {
          if (i < 80) cells[i + 1].focus();
        } else if (e.key === 'ArrowUp') {
          if (i >= 9) cells[i - 9].focus();
        } else if (e.key === 'ArrowDown') {
          if (i < 72) cells[i + 9].focus();
        }
      });
    }

    function validateCell(cell) {
      const index = cells.indexOf(cell);
      const row = Math.floor(index / 9);
      const col = index % 9;
      const value = cell.value;

      if (!value) {
        cell.classList.remove('invalid');
        return true;
      }

      // Check row, column, and box
      if (!isValidPlacement(getBoardState(), row, col, parseInt(value))) {
        cell.classList.add('invalid');
        return false;
      }

      cell.classList.remove('invalid');
      return true;
    }

    function isValidPlacement(board, row, col, num) {
      // Skip checking the current position
      const origValue = board[row][col];
      board[row][col] = 0;

      // Check row
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
          board[row][col] = origValue;
          return false;
        }
      }

      // Check column
      for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) {
          board[row][col] = origValue;
          return false;
        }
      }

      // Check 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[boxRow + i][boxCol + j] === num) {
            board[row][col] = origValue;
            return false;
          }
        }
      }

      board[row][col] = origValue;
      return true;
    }

    function generatePuzzle(difficulty) {
      // Create a solved puzzle
      const solvedPuzzle = Array(9).fill().map(() => Array(9).fill(0));
      solveSudoku(solvedPuzzle);
      solution = solvedPuzzle.map(row => [...row]);

      // Create puzzle by removing numbers
      const puzzle = solvedPuzzle.map(row => [...row]);
      const cellsToRemove = {
        'easy': 40,
        'medium': 50,
        'hard': 60
      }[difficulty];

      let removed = 0;
      while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
          puzzle[row][col] = 0;
          removed++;
        }
      }

      return puzzle;
    }

    function getBoardState() {
      const board = [];
      for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
          const value = cells[i * 9 + j].value;
          row.push(value ? parseInt(value) : 0);
        }
        board.push(row);
      }
      return board;
    }

    function setBoardState(board, prefilled = false) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = cells[i * 9 + j];
          const value = board[i][j];
          cell.value = value || '';
          cell.classList.remove('prefilled');
          cell.readOnly = prefilled && value !== 0;
          if (prefilled && value !== 0) {
            cell.classList.add('prefilled');
          }
        }
      }
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function solveSudoku(board) {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            shuffleArray(numbers);
            for (let num of numbers) {
              if (isValidPlacement(board, row, col, num)) {
                board[row][col] = num;
                if (solveSudoku(board)) {
                  return true;
                }
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    function checkCompletion() {
      const currentBoard = getBoardState();
      
      // Check if board is full
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (currentBoard[i][j] === 0) return;
        }
      }

      // Check if board is valid
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = cells[i * 9 + j];
          if (cell.classList.contains('invalid')) return;
        }
      }

      // Board is complete and valid
      showStatus('Congratulations! You solved the puzzle!', 'success');
    }

    function showStatus(message, type) {
      statusDiv.textContent = message;
      statusDiv.className = `status ${type}`;
      setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
      }, 3000);
    }

    // Event listeners for buttons
    document.getElementById('new-game').addEventListener('click', () => {
      const difficulty = document.getElementById('difficulty').value;
      const puzzle = generatePuzzle(difficulty);
      originalPuzzle = puzzle.map(row => [...row]);
      setBoardState(puzzle, true);
      statusDiv.textContent = '';
      statusDiv.className = 'status';
    });

    document.getElementById('check').addEventListener('click', () => {
      const currentBoard = getBoardState();
      let isValid = true;
      
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (currentBoard[i][j] !== 0 && !isValidPlacement(currentBoard, i, j, currentBoard[i][j])) {
            isValid = false;
            cells[i * 9 + j].classList.add('invalid');
          }
        }
      }

      if (isValid) {
        showStatus('Looking good! Keep going!', 'success');
      } else {
        showStatus('There are some errors in your solution', 'error');
      }
    });

    document.getElementById('solve').addEventListener('click', () => {
      setBoardState(solution);
    });

    document.getElementById('reset').addEventListener('click', () => {
      setBoardState(originalPuzzle, true);
      statusDiv.textContent = '';
      statusDiv.className = 'status';
    });

    // Start a new game when the page loads
    document.getElementById('new-game').click();