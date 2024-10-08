import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Modal } from "../Modal";

// Function to generate a valid 25x25 Sudoku board
// Function to generate a valid 25x25 Sudoku board without recursion
const generateSudokuBoard = () => {
  const size = 25;
  const base = 5;
  const symbols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
  ];

  // Create a base grid using a mathematical formula
  const grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      grid[row][col] = symbols[(row * base + col) % size];
    }
  }

  // Shuffle the grid to randomize it
  return shuffleGrid(grid);
};

const transpose = (grid) => {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
};

const shuffleGrid = (grid) => {
  const size = 25;
  const base = 5;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Shuffle rows within each band
  for (let i = 0; i < size; i += base) {
    const rows = grid.slice(i, i + base);
    shuffle(rows);
    for (let j = 0; j < base; j++) {
      grid[i + j] = rows[j];
    }
  }

  // Shuffle columns within each stack
  grid = transpose(grid);
  for (let i = 0; i < size; i += base) {
    const cols = grid.slice(i, i + base);
    shuffle(cols);
    for (let j = 0; j < base; j++) {
      grid[i + j] = cols[j];
    }
  }
  grid = transpose(grid);

  return grid;
};

// Function to remove numbers to create the puzzle
const removeNumbers = (grid, difficulty) => {
  const newGrid = grid.map((row) => [...row]); // Creates a deep copy of the grid
  let attempts; // This needs to be a let since its value will change

  switch (difficulty) {
    case "hard":
      attempts = 375; // More cells are cleared
      break;
    case "medium":
      attempts = 313;
      break;
    case "easy":
    default:
      attempts = 250; // Fewer cells are cleared
      break;
  }

  while (attempts > 0) {
    const row = Math.floor(Math.random() * 25);
    const col = Math.floor(Math.random() * 25);
    if (newGrid[row][col] !== null) {
      newGrid[row][col] = null;
      attempts--; // Properly decrement attempts
    }
  }
  return newGrid;
};

const isPuzzleCompleteAndValid = (grid) => {
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      if (!grid[row][col] || !isValidMove(grid, row, col, grid[row][col])) {
        return false;
      }
    }
  }
  return true;
};

export const Screen8 = () => {
  const navigate = useNavigate();

  // State to track the current grid and the selected cell
  const [grid, setGrid] = useState(
    Array.from({ length: 25 }, () => Array(25).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [difficulty, setDifficulty] = useState("easy");
  const [initialGrid, setInitialGrid] = useState([]); // Store the original puzzle grid
  const [history, setHistory] = useState([]); // Stores grid states for undo/redo
  const [currentStep, setCurrentStep] = useState(0); // Tracks current position in the history
  const [showRules, setShowRules] = useState(false); // For toggling rules modal
  const [showTips, setShowTips] = useState(false); // For displaying the tips modal
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);

  useEffect(() => {
    const storedGames = localStorage.getItem("totalGamesPlayed25x25") || 0;
    setTotalGamesPlayed(Number(storedGames));
    // Generate initial puzzle...
  }, [difficulty]);

  const handleTotalGamesClick = () => {
    alert(`Total games played (25x25): ${totalGamesPlayed}`);
  };

  const saveTotalGamesPlayed = (newCount) => {
    localStorage.setItem("totalGamesPlayed25x25", newCount);
  };

  useEffect(() => {
    // Generate a new Sudoku board based on difficulty
    const fullGrid = generateSudokuBoard();
    const puzzleGrid = removeNumbers(fullGrid, difficulty);
    setGrid(puzzleGrid);
    setInitialGrid(puzzleGrid); // Store the initial puzzle grid for resetting

    // Add initial grid state to history
    const initialHistory = [puzzleGrid];
    setHistory(initialHistory);
    setCurrentStep(0); // Reset step counter
  }, [difficulty]);

  const handleResetClick = () => {
    setGrid(initialGrid); // Reset the current grid to the original puzzle
    const resetHistory = [initialGrid]; // Reset history with the initial grid
    setHistory(resetHistory);
    setCurrentStep(0); // Reset step counter
  };

  // Check if a move is valid according to Sudoku rules
  const isValidMove = (grid, row, col, value) => {
    for (let x = 0; x < 25; x++) {
      if (grid[row][x] === value || grid[x][col] === value) return false;
    }
    const startRow = Math.floor(row / 5) * 5;
    const startCol = Math.floor(col / 5) * 5;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[startRow + i][startCol + j] === value) return false;
      }
    }
    return true;
  };

  // Handle input change in the grid and save to history
  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value.match(/^[1-9a-yA-Y]?$|^$/)) {
      const newValue = value.toUpperCase();
      if (newValue && !isValidMove(grid, rowIndex, colIndex, newValue)) {
        alert("Invalid move! This number conflicts with Sudoku rules.");
      } else {
        const newGrid = grid.map((row, rIndex) =>
          row.map((cell, cIndex) =>
            rIndex === rowIndex && cIndex === colIndex ? newValue : cell
          )
        );

        // Update history when a valid move is made
        const newHistory = history.slice(0, currentStep + 1); // Remove any "future" states after the current step
        setHistory([...newHistory, newGrid]); // Add the new grid to history
        setCurrentStep(newHistory.length); // Update the current step to reflect the latest move
        setGrid(newGrid); // Update the grid
      }
    }
  };

  const handleSubmitClick = () => {
    if (isPuzzleCompleteAndValid(grid)) {
      const newCount = totalGamesPlayed + 1;
      setTotalGamesPlayed(newCount);
      saveTotalGamesPlayed(newCount); // Save to local storage for 25x25
      alert("Congratulations! You've completed the Sudoku puzzle.");
    } else {
      alert("The puzzle is incomplete or incorrect.");
    }
  };

  // Handle Undo action: Go back one step in the history
  const handleUndoClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // Move one step back
      setGrid(history[currentStep - 1]); // Set the grid to the previous state
    }
  };

  // Handle Redo action: Go forward one step in the history
  const handleRedoClick = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1); // Move one step forward
      setGrid(history[currentStep + 1]); // Set the grid to the next state
    }
  };

  const handleNewGameClick = () => {
    navigate("/page-5");
  };

  const handleRestartClick = () => {
    const fullGrid = generateSudokuBoard(); // Generate a new full Sudoku grid
    const puzzleGrid = removeNumbers(fullGrid, difficulty); // Remove numbers based on difficulty
    setGrid(puzzleGrid); // Set the new grid
    setInitialGrid(puzzleGrid); // Store the new grid as the initial grid for reset functionality

    // Reset history
    const resetHistory = [puzzleGrid];
    setHistory(resetHistory);
    setCurrentStep(0); // Reset step counter
  };

  const handleToggleRules = () => {
    setShowRules(!showRules); // Toggle the modal's visibility
  };

  const handleToggleTips = () => {
    setShowTips(!showTips); // Toggle the modal's visibility for tips
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
        alert("You cannot erase a pre-filled cell.");
      }
    } else {
      alert("Please select a cell first!");
    }
  };

  return (
    <div className="screen-8">
      <div className="page-6">
        {/* <div className="text-wrapper-57">Difficulty: Medium</div> */}
        <div className="text-wrapper-58">Sudoku 25 x 25</div>

        <div className="screen8-sudoku-grid">
          {grid.map((row, rowIndex) => (
            <div className="screen8-sudoku-row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className="screen8-sudoku-cell"
                  type="text"
                  maxLength={1}
                  value={cell || ""}
                  onClick={() =>
                    setSelectedCell({ row: rowIndex, col: colIndex })
                  }
                  onChange={(e) =>
                    handleInputChange(
                      rowIndex,
                      colIndex,
                      e.target.value.toUpperCase()
                    )
                  }
                  readOnly={cell !== null && cell !== ""}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="div-6">
          <div className="div-6">
            <div className="overlap-group-13">
              <div className="text-wrapper-59">MASTER SUDOKU</div>{" "}
              <img className="game-9" alt="Game" src="/img/game-1.png" />
            </div>
          </div>
          <div className="navigation-9">
            <button className="button-style" onClick={handleNewGameClick}>
              New
            </button>
            <button className="button-style" onClick={handleToggleRules}>
              Rules
            </button>
            <button className="button-style" onClick={handleToggleTips}>
              Tips
            </button>
            <button className="button-style" onClick={handleTotalGamesClick}>
              Total Games Played
            </button>
          </div>
        </div>
        {/* Modal for displaying rules */}
        <Modal show={showRules} handleClose={handleToggleRules}>
          <h2>Sudoku Rules</h2>
          <ul>
            <li>
              Each row must contain the numbers 1 to 25 (or A to Y) without
              repetition.
            </li>
            <li>
              Each column must contain the numbers 1 to 25 (or A to Y) without
              repetition.
            </li>
            <li>
              Each 5x5 sub-grid must contain the numbers 1 to 25 (or A to Y)
              without repetition.
            </li>
            <li>
              The game is solved when every cell is correctly filled according
              to these rules.
            </li>
          </ul>
        </Modal>
        <Modal show={showTips} handleClose={handleToggleTips}>
          <h2>Sudoku Tips (25x25)</h2>
          <ul>
            <li>
              <strong>Start with the most obvious placements:</strong> Look for
              rows, columns, or 5x5 sub-grids with only a few missing numbers.
              Fill in the gaps by process of elimination.
            </li>
            <li>
              <strong>Break it down:</strong> Focus on one 5x5 sub-grid at a
              time, cross-checking rows and columns to see which numbers are
              already placed and which are missing.
            </li>
            <li>
              <strong>Use candidate marks:</strong> Given the size of a 25x25
              grid, writing down possible candidates in empty cells will help
              narrow down choices over time.
            </li>
            <li>
              <strong>Look for unique candidates:</strong> In each row, column,
              or sub-grid, check if there’s a number that can only fit in one
              specific cell.
            </li>
            <li>
              <strong>Spot patterns like naked pairs or triples:</strong>{" "}
              Sometimes two or more cells in a row, column, or sub-grid can only
              be certain numbers. Identifying these patterns helps eliminate
              options elsewhere.
            </li>
            <li>
              <strong>Be systematic:</strong> Given the size of the grid, work
              through one row, column, or sub-grid at a time. Moving
              systematically across the grid helps avoid confusion.
            </li>
            <li>
              <strong>Take breaks and revisit:</strong> 25x25 grids are large
              and complex. If you’re stuck, take a break and come back with
              fresh eyes.
            </li>
          </ul>
        </Modal>

        <div className="frame-23">
          <div className="group-54">
            <div className="overlap-25">
              {/* <div className="noun-erase-4" onClick={handleEraseClick}>
                <img className="vector-15" alt="Vector" src="/img/vector.svg" />
                <div className="text-wrapper-60">Erase</div>
              </div> */}
              {/* <div className="noun-notes-4">
                <div className="overlap-26">
                  <img
                    className="vector-16"
                    alt="Vector"
                    src="/img/vector-9.svg"
                  />
                  <div className="group-55">
                    <div className="overlap-group-14">
                      <div className="text-wrapper-61">OFF</div>
                    </div>
                  </div>
                  <div className="text-wrapper-62">Notes</div>
                </div>
              </div> */}
            </div>
            {/* <div className="group-56">
              <div className="overlap-27">
                <img
                  className="noun-hint-4"
                  alt="Noun hint"
                  src="/img/noun-hint-2018232-1-3.svg"
                />
                <div className="text-wrapper-63">Hint</div>
              </div>
            </div> */}
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
                  src="/img/undo.svg"
                  alt="Undo Icon"
                />
                <span>Undo</span>
              </button>
              <button className="redo-button" onClick={handleRedoClick}>
                <img
                  className="button-icon"
                  src="/img/redo.svg"
                  alt="Redo Icon"
                />
                <span>Redo</span>
              </button>
              <button className="button-style" onClick={handleSubmitClick}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="frame-24">
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
          <div className="group-59">
            {/* Number buttons for input */}
            {[
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
            ].map((number) => (
              <button
                key={number}
                className="number-button"
                onClick={() =>
                  handleInputChange(selectedCell.row, selectedCell.col, number)
                }
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        <div className="frame-25">
          <div className="container-12">
            <div className="title-30">2024 Master Sudoku</div>
            <div className="title-31">Terms of Service</div>
            <div className="title-32">Privacy Policy</div>
          </div>
        </div>
        <div className="frame-26">
          {/* <div className="group-86">
            <div className="overlap-group-16">
              <div className="text-wrapper-82">03:56</div>
              <div className="ellipse-11" />
              <div className="rectangle-9" />
              <div className="ellipse-12" />
              <div className="ellipse-13" />
              <div className="rectangle-10" />
              <div className="ellipse-14" />
              <div className="ellipse-15" />
            </div>
          </div> */}
          <div className="group-87">
            <button className="button-style" onClick={handleRestartClick}>
              Restart
            </button>
            <img className="vector-17" alt="Vector" src="/img/vector-2.svg" />
          </div>
          <div className="group-88" onClick={handleResetClick}>
            <button className="button-style" onClick={handleResetClick}>
              Reset
            </button>{" "}
            <img className="vector-18" alt="Vector" src="/img/vector-2.svg" />
          </div>
          {/* <div className="group-89">
            <div className="text-wrapper-83">Save</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
