# Sudoku Challenge

A web-based Sudoku game built with HTML, CSS, and JavaScript. This project features a dynamic 9x9 Sudoku board, difficulty selection, real-time validation, and solving functionality.

## Features
- **Generate New Game:** Start a fresh puzzle with different difficulty levels (Easy, Medium, Hard).
- **User Input Validation:** Highlights invalid inputs in red.
- **Check Progress:** Validate current progress and highlight mistakes.
- **Solve Puzzle:** Automatically fills in the correct solution.
- **Reset Board:** Reset the puzzle back to its original state.
- **Keyboard Navigation:** Move between cells using arrow keys.
- **Responsive Design:** Works on both desktop and mobile devices.

## Technologies Used
- HTML
- CSS
- JavaScript

## Algorithm
This Sudoku solver uses a **Backtracking Search** algorithm to efficiently find the correct solution. The algorithm recursively tries possible numbers in empty cells while ensuring that each step adheres to Sudoku rules. If a conflict is found, it backtracks and tries a different number until a valid solution is reached.

## How to Use
1. Select the difficulty level from the dropdown.
2. Click "New Game" to generate a Sudoku puzzle.
3. Enter numbers (1-9) into empty cells.
4. Click "Check Progress" to validate your entries.
5. Click "Solve" to reveal the solution.
6. Click "Reset" to restart the puzzle.

## Installation & Running Locally
1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/sudoku-challenge.git
   ```
2. Navigate to the project folder:
   ```sh
   cd sudoku-challenge
   ```
3. Open `index.html` in a web browser.
