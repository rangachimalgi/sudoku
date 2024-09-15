import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PagePlaystyle.css";
import { Modal } from "../Modal";

// Function to generate a valid Sudoku board
const generateSudokuBoard = () => {
  const grid = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));

  const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const fillGrid = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === null) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
            () => Math.random() - 0.5
          );
          for (let num of numbers) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) return true;
              grid[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillGrid(grid);
  return grid;
};

// Function to remove numbers from the grid to create the puzzle
const removeNumbers = (grid, difficulty = "easy") => {
  const newGrid = grid.map((row) => [...row]);
  let attempts = 30; // Easy by default
  if (difficulty === "medium") {
    attempts = 40; // Medium difficulty
  } else if (difficulty === "hard") {
    attempts = 50; // Hard difficulty
  }
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (newGrid[row][col] !== null) {
      newGrid[row][col] = null;
      attempts--;
    }
  }
  return newGrid;
};

const isValidMove = (grid, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

export const PagePlay = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]); // Store the original puzzle grid
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [difficulty, setDifficulty] = useState("easy");
  const [history, setHistory] = useState([]); // Stores grid states for undo/redo
  const [currentStep, setCurrentStep] = useState(0); // Tracks current position in the history
  const [showRules, setShowRules] = useState(false); // For displaying the rules modal
  const [showTips, setShowTips] = useState(false); // For displaying the tips modal

  useEffect(() => {
    const fullGrid = generateSudokuBoard();
    const puzzleGrid = removeNumbers(fullGrid, difficulty);
    setGrid(puzzleGrid);
    setInitialGrid(puzzleGrid); // Store the initial grid for resetting
  }, [difficulty]); // Re-generate when difficulty changes

  const handleGridClick = () => {
    setSelectedCell({ row: null, col: null }); // Reset selection when clicking outside the grid
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value === "" || (value >= 1 && value <= 9)) {
      const parsedValue = parseInt(value, 10);
      if (!value || isValidMove(grid, rowIndex, colIndex, parsedValue)) {
        const newGrid = grid.map((row, i) =>
          row.map((cell, j) =>
            i === rowIndex && j === colIndex
              ? value
                ? parsedValue
                : null
              : cell
          )
        );
        // Update history
        const newHistory = history.slice(0, currentStep + 1); // Remove any "future" states
        setHistory([...newHistory, newGrid]);
        setCurrentStep(newHistory.length); // Update the current step
        setGrid(newGrid); // Set the new grid
      } else {
        alert("Invalid move! This number conflicts with Sudoku rules."); // Basic browser alert
      }
    } else {
      alert("Please enter a number between 1 and 9."); // Basic browser alert
    }
  };

  const handleResetClick = () => {
    setGrid(initialGrid); // Reset the grid to the initial puzzle
  };

  const handleToggleRules = () => {
    setShowRules(!showRules); // Toggle the modal's visibility for rules
  };

  const handleToggleTips = () => {
    setShowTips(!showTips); // Toggle the modal's visibility for tips
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="sudoku-row">
        {row.map((cell, colIndex) => (
          <input
            key={colIndex}
            className="sudoku-cell"
            type="text"
            maxLength="1"
            value={cell || ""}
            onChange={(e) =>
              handleInputChange(rowIndex, colIndex, e.target.value)
            }
            onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
            readOnly={initialGrid[rowIndex][colIndex] !== null} // Pre-filled cells are read-only
          />
        ))}
      </div>
    ));
  };

  const handleNumberClick = (number) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      if (isValidMove(grid, selectedCell.row, selectedCell.col, number)) {
        const newGrid = grid.map((row, i) =>
          row.map((cell, j) =>
            i === selectedCell.row && j === selectedCell.col ? number : cell
          )
        );
        // Update history
        const newHistory = history.slice(0, currentStep + 1); // Remove any "future" states
        setHistory([...newHistory, newGrid]);
        setCurrentStep(newHistory.length); // Update the current step
        setGrid(newGrid); // Set the new grid
      } else {
        alert("Invalid move! This number conflicts with Sudoku rules."); // Basic browser alert
      }
    } else {
      alert("Please select a cell first!"); // Basic browser alert
    }
  };

  const handleUndoClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setGrid(history[currentStep - 1]); // Set the previous grid state
    }
  };

  const handleRedoClick = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setGrid(history[currentStep + 1]); // Set the next grid state
    }
  };

  // Navigate to /page-5 on "New Game" click
  const handleNewGameClick = () => {
    navigate("/page-5");
  };

  const handleEraseClick = () => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      // Check if the cell is editable (not part of the initial grid)
      if (initialGrid[selectedCell.row][selectedCell.col] === null) {
        const newGrid = grid.map((row, i) =>
          row.map((cell, j) =>
            i === selectedCell.row && j === selectedCell.col ? null : cell
          )
        );
        // Update history
        const newHistory = history.slice(0, currentStep + 1); // Remove any "future" states
        setHistory([...newHistory, newGrid]);
        setCurrentStep(newHistory.length); // Update the current step
        setGrid(newGrid); // Set the new grid
      } else {
        alert("You cannot erase a pre-filled cell."); // Basic browser alert
      }
    } else {
      alert("Please select a cell first!"); // Basic browser alert
    }
  };

  const handleRestartClick = () => {
    const fullGrid = generateSudokuBoard(); // Generate a new full Sudoku grid
    const puzzleGrid = removeNumbers(fullGrid, difficulty); // Remove numbers based on difficulty
    setGrid(puzzleGrid); // Set the new grid
    setInitialGrid(puzzleGrid); // Store the new grid as the initial grid for reset functionality
  };

  return (
    <div className="page-play">
      <div className="div-2">
        <div className="text-wrapper-14">
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>

        {/* Sudoku Grid */}
        <div className="sudoku-grid">{renderGrid()}</div>

        {/* Modal for Sudoku Rules */}
        <Modal show={showRules} handleClose={handleToggleRules}>
          <h2>Sudoku Rules</h2>
          <ul>
            <li>Each row must contain the numbers 1 to 9 without repetition.</li>
            <li>Each column must contain the numbers 1 to 9 without repetition.</li>
            <li>Each 3x3 sub-grid must contain the numbers 1 to 9 without repetition.</li>
            <li>The puzzle is solved when all cells are correctly filled according to these rules.</li>
          </ul>
        </Modal>

        {/* Modal for Sudoku Tips */}
        <Modal show={showTips} handleClose={handleToggleTips}>
          <h2>Sudoku Tips</h2>
          <ul>
            <li>Start with easy clues: Look for rows, columns, or grids with only a few missing numbers.</li>
            <li>Use the process of elimination: If a number can only fit in one place, put it there.</li>
            <li>Work systematically: Solve for one number at a time across the grid.</li>
            <li>Use pencil marks: Write down possible numbers in each empty cell.</li>
          </ul>
        </Modal>

        <div className="group-9">
          <div className="difficulty-container">
            <label className="difficulty-label" htmlFor="difficulty">
              Select Difficulty
            </label>
            <select
              id="difficulty"
              className="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="overlap-6">
            {/* Number buttons */}
            <div className="number-buttons">
              {Array.from({ length: 9 }, (_, i) => (
                <button
                  key={i}
                  className="sudoku-number"
                  onClick={() => handleNumberClick(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="button-container">
              <button className="erase-button" onClick={handleEraseClick}>
                <img
                  className="button-icon"
                  src="/img/vector.svg"
                  alt="Erase Icon"
                />
                <span>Erase</span>
              </button>
              <button className="undo-button" onClick={handleUndoClick}>
                <img
                  className="button-icon"
                  src="/img/undo-icon.svg"
                  alt="Undo Icon"
                />
                <span>Undo</span>
              </button>
              <button className="redo-button" onClick={handleRedoClick}>
                <img
                  className="button-icon"
                  src="/img/redo-icon.svg"
                  alt="Redo Icon"
                />
                <span>Redo</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-wrapper-27">Sudoku 9 x 9</div>
        <div className="group-22">
          <div className="overlap-11">
            <div className="text-wrapper-28">MASTER SUDOKU</div>
            <img className="game-6" alt="Game" src="/img/game-1.png" />
            <div className="navigation-6">
              <button className="button-style" onClick={handleNewGameClick}>
                New
              </button>
              <button className="button-style" onClick={handleToggleRules}>
                Rules
              </button>
              <button className="button-style" onClick={handleToggleTips}>
                Tips
              </button>
            </div>
          </div>
        </div>
        <div className="frame-14">
          <div className="container-9">
            <div className="title-21">2024 Master Sudoku</div>
            <div className="title-22">Terms of Service</div>
            <div className="title-23">Privacy Policy</div>
          </div>
        </div>
        <div className="group-23">
          <button className="button-style" onClick={handleRestartClick}>
            Restart
          </button>

          <img className="vector-5" alt="Vector" src="/img/vector-2.svg" />
        </div>
        <div className="group-24">
          <button className="button-style" onClick={handleResetClick}>
            Reset
          </button>
          <img className="vector-6" alt="Vector" src="/img/vector-2.svg" />
        </div>
      </div>
    </div>
  );
};
