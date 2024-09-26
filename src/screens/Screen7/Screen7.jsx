import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ScreenSevenStyles.css";
import { Modal } from "../Modal";

// Function to generate a valid 16x16 Sudoku board
const generateSudokuBoard = () => {
  const grid = Array(16)
    .fill(null)
    .map(() => Array(16).fill(null));

  const isValid = (grid, row, col, num) => {
    // Check if the number is not already in the current row or column
    for (let x = 0; x < 16; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    // Check the 4x4 subgrid
    const startRow = Math.floor(row / 4) * 4;
    const startCol = Math.floor(col / 4) * 4;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const fillGrid = (grid) => {
    const hexChars = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
    ];
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        if (grid[row][col] === null) {
          const shuffledNums = hexChars.sort(() => Math.random() - 0.5);
          for (let num of shuffledNums) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) return true;
              grid[row][col] = null; // Reset on failure
            }
          }
          return false; // Backtrack
        }
      }
    }
    return true;
  };

  fillGrid(grid); // Generate a fully filled Sudoku board
  return grid;
};

const isPuzzleCompleteAndValid = (grid) => {
  const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 16; x++) {
      if (grid[row][x] === num && col !== x) return false;
      if (grid[x][col] === num && row !== x) return false;
    }

    const startRow = Math.floor(row / 4) * 4;
    const startCol = Math.floor(col / 4) * 4;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          grid[startRow + i][startCol + j] === num &&
          (startRow + i !== row || startCol + j !== col)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const num = grid[row][col];
      if (num === null || !isValid(grid, row, col, num)) {
        return false;
      }
    }
  }
  return true;
};

// Function to remove numbers to create the puzzle
const removeNumbers = (grid, difficulty) => {
  const newGrid = grid.map((row) => [...row]);
  let attempts = 50; // Default for easy
  if (difficulty === "medium") {
    attempts = 60;
  } else if (difficulty === "hard") {
    attempts = 70;
  }

  while (attempts > 0) {
    const row = Math.floor(Math.random() * 16);
    const col = Math.floor(Math.random() * 16);
    if (newGrid[row][col] !== null) {
      newGrid[row][col] = null;
      attempts--;
    }
  }
  return newGrid;
};

export const Screen7 = () => {
  const navigate = useNavigate();

  // State to track the current grid and the selected cell
  const [grid, setGrid] = useState(
    Array.from({ length: 16 }, () => Array(16).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [difficulty, setDifficulty] = useState("easy");
  const [initialGrid, setInitialGrid] = useState(
    Array.from({ length: 16 }, () => Array(16).fill(null))
  );
  const [history, setHistory] = useState([]); // Stores grid states for undo/redo
  const [currentStep, setCurrentStep] = useState(0); // Tracks current position in the history
  const [showRules, setShowRules] = useState(false); // For displaying the rules modal
  const [showTips, setShowTips] = useState(false); // For displaying the tips modal
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);

  useEffect(() => {
    const storedGames = localStorage.getItem("totalGamesPlayed16x16") || 0;
    setTotalGamesPlayed(Number(storedGames));

    const fullGrid = generateSudokuBoard();
    const puzzleGrid = removeNumbers(fullGrid, difficulty);
    setGrid(puzzleGrid);
    setInitialGrid(puzzleGrid);

    setHistory([puzzleGrid]); // Initialize history
    setCurrentStep(0);
  }, [difficulty]);

  const saveTotalGamesPlayed = (newCount) => {
    localStorage.setItem("totalGamesPlayed16x16", newCount);
  };
  

  const handleResetClick = () => {
    setGrid(initialGrid); // Reset the current grid to the original puzzle
  };

  // Check if a move is valid according to Sudoku rules
  const isValidMove = (grid, row, col, value) => {
    for (let x = 0; x < 16; x++) {
      if (x !== col && grid[row][x] === value) return false; // Skip current cell
      if (x !== row && grid[x][col] === value) return false; // Skip current cell
    }

    const startRow = Math.floor(row / 4) * 4;
    const startCol = Math.floor(col / 4) * 4;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const currentRow = startRow + i;
        const currentCol = startCol + j;
        if (
          (currentRow !== row || currentCol !== col) && // Skip current cell
          grid[currentRow][currentCol] === value
        )
          return false;
      }
    }
    return true;
  };
  // Handle input change in the grid
  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value.match(/^[1-9a-gA-G]?$|^$/)) {
      const newValue = value.toUpperCase();
      if (newValue && !isValidMove(grid, rowIndex, colIndex, newValue)) {
        alert("Invalid move! This number conflicts with Sudoku rules.");
      } else {
        const newGrid = grid.map((row, rIndex) =>
          row.map((cell, cIndex) =>
            rIndex === rowIndex && cIndex === colIndex ? newValue : cell
          )
        );

        const newHistory = history.slice(0, currentStep + 1); // Remove any "future" states
        setHistory([...newHistory, newGrid]); // Add the new grid to history
        setCurrentStep(newHistory.length); // Update the current step
        setGrid(newGrid); // Update the grid
      }
    }
  };

  // Handle cell click to mark the selected cell
  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  // Handle button click to input a number into the selected cell
  const handleNumberButtonClick = (number) => {
    const { row, col } = selectedCell;
    if (row !== null && col !== null) {
      if (initialGrid[row][col] !== null) {
        alert("You cannot change a pre-filled cell.");
        return;
      }
      const newValue = number.toUpperCase();

      // Add validation here
      if (newValue && !isValidMove(grid, row, col, newValue)) {
        alert("Invalid move! This number conflicts with Sudoku rules.");
        return;
      }

      const newGrid = grid.map((rowArr, rIndex) =>
        rowArr.map((cell, cIndex) =>
          rIndex === row && cIndex === col ? newValue : cell
        )
      );

      const newHistory = history.slice(0, currentStep + 1); // Remove any "future" states
      setHistory([...newHistory, newGrid]); // Add the new grid to history
      setCurrentStep(newHistory.length); // Update the current step
      setGrid(newGrid); // Update the grid
    } else {
      alert("Please select a cell first!");
    }
  };

  const handleUndoClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setGrid(history[currentStep - 1]); // Set the grid to the previous state
    }
  };

  const handleRedoClick = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setGrid(history[currentStep + 1]); // Set the grid to the next state
    }
  };

  const handleToggleRules = () => {
    setShowRules(!showRules); // Toggle the modal's visibility
  };

  const handleToggleTips = () => {
    setShowTips(!showTips); // Toggle the modal's visibility for tips
  };

  // Navigate to /page-5 on "New Game" click
  const handleNewGameClick = () => {
    navigate("/page-5");
  };

  const handleSubmitClick = () => {
    if (isPuzzleCompleteAndValid(grid)) {
      const newCount = totalGamesPlayed + 1;
      setTotalGamesPlayed(newCount);
      saveTotalGamesPlayed(newCount);
      alert("Congratulations! You've completed the 16x16 Sudoku puzzle.");
    } else {
      alert("The puzzle is incomplete or incorrect.");
    }
  };  

  const handleTotalGamesClick = () => {
    alert(`Total games played: ${totalGamesPlayed}`);
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

  const handleRestartClick = () => {
    const fullGrid = generateSudokuBoard(); // Generate a new full Sudoku grid
    const puzzleGrid = removeNumbers(fullGrid, difficulty); // Remove numbers based on difficulty
    setGrid(puzzleGrid); // Set the new grid
    setInitialGrid(puzzleGrid); // Store the new grid as the initial grid for reset functionality
  };

  return (
    <div className="screen-7">
      <div className="page-5">
        <div className="text-wrapper-46">
          {" "}
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
        <div className="text-wrapper-47">Sudoku 16 x 16</div>
        <div className="screen7-sudoku-grid">
          {grid.map((row, rowIndex) => (
            <div className="screen7-sudoku-row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`screen7-sudoku-cell ${
                    selectedCell.row === rowIndex &&
                    selectedCell.col === colIndex
                      ? "selected"
                      : ""
                  }`}
                  type="text"
                  maxLength={1}
                  value={cell || ""}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onChange={(e) =>
                    handleInputChange(
                      rowIndex,
                      colIndex,
                      e.target.value.toUpperCase()
                    )
                  }
                  readOnly={initialGrid[rowIndex][colIndex] !== null}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Number buttons */}

        <div className="div-5">
          <div className="div-5">
            <div className="overlap-group-10">
              <div className="text-wrapper-48">MASTER SUDOKU</div>
              <img className="game-8" alt="Game" src="/img/game-1.png" />
            </div>
          </div>
          <div className="navigation-8">
            <button className="button-style" onClick={handleNewGameClick}>
              New
            </button>
            {/* Modal for Sudoku Rules */}
            <Modal show={showRules} handleClose={handleToggleRules}>
              <h2>Sudoku Rules (16x16)</h2>
              <ul>
                <li>
                  Each row must contain the numbers 1 to 9 and the letters A to
                  G without repetition.
                </li>
                <li>
                  Each column must contain the numbers 1 to 9 and the letters A
                  to G without repetition.
                </li>
                <li>
                  Each 4x4 sub-grid must contain the numbers 1 to 9 and the
                  letters A to G without repetition.
                </li>
                <li>
                  The puzzle is solved when all cells are correctly filled
                  according to these rules.
                </li>
              </ul>
            </Modal>
            {/* Modal for Sudoku Tips */}
            <Modal show={showTips} handleClose={handleToggleTips}>
              <h2>Sudoku Tips (16x16)</h2>
              <ul>
                <li>
                  **Look for obvious placements**: Start by identifying numbers
                  that are missing in rows, columns, or grids that have only a
                  few empty cells.
                </li>
                <li>
                  **Eliminate options in 4x4 sub-grids**: Focus on one sub-grid
                  at a time. Cross-reference which numbers are already in the
                  sub-grid, row, and column.
                </li>
                <li>
                  **Use pencil marks**: Write possible candidates for each cell,
                  eliminating them as you find correct placements.
                </li>
                <li>
                  **Find unique candidates**: In a 4x4 sub-grid, look for cells
                  that can only contain a single number. This will help you lock
                  in numbers quickly.
                </li>
                <li>
                  **Look for pairs or triples**: Sometimes, two or three cells
                  in a row or block can only contain a certain group of numbers.
                  If they share the same candidates, it helps you eliminate
                  those numbers from other cells in that area.
                </li>
                <li>
                  **Be systematic**: Focus on one region of the grid,
                  alternating between rows, columns, and sub-grids. This keeps
                  your logic clean and organized.
                </li>
                <li>
                  **Stay patient and logical**: 16x16 Sudoku puzzles are larger,
                  so take your time. Carefully think through your moves,
                  especially when fewer cells remain.
                </li>
              </ul>
            </Modal>
            <button className="button-style" onClick={handleToggleRules}>
              Rules
            </button>
            <button className="button-style" onClick={handleToggleTips}>
              Tips
            </button>
            <button className="button-style" onClick={handleTotalGamesClick}>
              i
            </button>
          </div>
        </div>
        <div className="frame-19">
          <div className="group-44">
            <div className="overlap-21">
              {/* <div className="noun-notes-3">
                <div className="overlap-22">
                  <img
                    className="vector-12"
                    alt="Vector"
                    src="/img/vector-9.svg"
                  />
                  <div className="group-45">
                    <div className="overlap-group-11">
                      <div className="text-wrapper-50">OFF</div>
                    </div>
                  </div>
                  <div className="text-wrapper-51">Notes</div>
                </div>
              </div> */}
            </div>
            {/* <div className="group-46">
              <div className="overlap-23">
                <img
                  className="noun-hint-3"
                  alt="Noun hint"
                  src="/img/noun-hint-2018232-1-2.svg"
                />
                <div className="text-wrapper-52">Hint</div>
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
        <div className="frame-20">
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
          {/* <img className="group-49" alt="Group" src="/img/group-30.png" /> */}
          <div className="number-buttons">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
            ].map((number, index) => (
              <button
                key={number}
                className="sudoku-number"
                onClick={() => handleNumberButtonClick(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="frame-21">
          <div className="container-11">
            <div className="title-27">2024 Master Sudoku</div>
            <div className="title-28">Terms of Service</div>
            <div className="title-29">Privacy Policy</div>
          </div>
        </div>
        <div className="frame-22">
          {/* <div className="group-50">
            <div className="overlap-group-12">
              <div className="text-wrapper-55">03:56</div>
              <div className="ellipse-6" />
              <div className="rectangle-6" />
              <div className="ellipse-7" />
              <div className="ellipse-8" />
              <div className="rectangle-7" />
              <div className="ellipse-9" />
              <div className="ellipse-10" />
            </div>
          </div> */}
          <div className="group-51">
            <button className="button-style" onClick={handleRestartClick}>
              Restart
            </button>
            <img className="vector-13" alt="Vector" src="/img/vector-2.svg" />
          </div>
          <div className="group-52" onClick={handleResetClick}>
            <button className="button-style" onClick={handleResetClick}>
              Reset
            </button>{" "}
            <img className="vector-14" alt="Vector" src="/img/vector-2.svg" />
          </div>

          {/* <div className="group-53">
            <div className="text-wrapper-56">Save</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
