import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

// Function to generate a valid 25x25 Sudoku board
const generateSudokuBoard = () => {
  const grid = Array(25)
    .fill(null)
    .map(() => Array(25).fill(null));

  const isValid = (grid, row, col, num) => {
    // Check if the number is not already in the current row or column
    for (let x = 0; x < 25; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    // Check the 5x5 subgrid
    const startRow = Math.floor(row / 5) * 5;
    const startCol = Math.floor(col / 5) * 5;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const fillGrid = (grid) => {
    const symbols = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y"
    ];

    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        if (grid[row][col] === null) {
          const shuffledSymbols = symbols.sort(() => Math.random() - 0.5);
          for (let symbol of shuffledSymbols) {
            if (isValid(grid, row, col, symbol)) {
              grid[row][col] = symbol;
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

// Function to remove numbers to create the puzzle
const removeNumbers = (grid, difficulty) => {
  const newGrid = grid.map(row => [...row]);  // Creates a deep copy of the grid
  let attempts;  // This needs to be a let since its value will change

  switch (difficulty) {
    case 'hard':
      attempts = 375;  // More cells are cleared
      break;
    case 'medium':
      attempts = 313;
      break;
    case 'easy':
    default:
      attempts = 250;  // Fewer cells are cleared
      break;
  }

  while (attempts > 0) {
    const row = Math.floor(Math.random() * 25);
    const col = Math.floor(Math.random() * 25);
    if (newGrid[row][col] !== null) {
      newGrid[row][col] = null;
      attempts--;  // Properly decrement attempts
    }
  }
  return newGrid;
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

  useEffect(() => {
    const fullGrid = generateSudokuBoard();
    const puzzleGrid = removeNumbers(fullGrid, difficulty);
    setGrid(puzzleGrid);
    setInitialGrid(puzzleGrid); // Store the initial puzzle grid for resetting
  }, [difficulty]);

  const handleResetClick = () => {
    setGrid(initialGrid); // Reset the current grid to the original puzzle
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

  // Handle input change in the grid
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
        setGrid(newGrid);
      }
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
                  onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
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
            <div className="tab-9" onClick={handleNewGameClick}>
              New Game
            </div>{" "}
            {/* Add onClick handler */}
            <div className="tab-9">Rules</div>
            <div className="tab-9">Tips</div>
          </div>
        </div>
        <div className="frame-23">
          <div className="group-54">
            <div className="overlap-25">
              <div className="noun-erase-4">
                <img className="vector-15" alt="Vector" src="/img/vector.svg" />
                <div className="text-wrapper-60">Erase</div>
              </div>
              <div className="noun-notes-4">
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
              </div>
            </div>
            <div className="group-56">
              <div className="overlap-27">
                <img
                  className="noun-hint-4"
                  alt="Noun hint"
                  src="/img/noun-hint-2018232-1-3.svg"
                />
                <div className="text-wrapper-63">Hint</div>
              </div>
            </div>
            <div className="group-57">
              <div className="overlap-28">
                <img className="img-5" alt="Undo" src="/img/undo-3.svg" />
                <div className="text-wrapper-64">Undo</div>
              </div>
            </div>
            <div className="group-58">
              <div className="overlap-28">
                <img className="img-5" alt="Redo" src="/img/redo-3.svg" />
                <div className="text-wrapper-65">Redo</div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-24">
          <p>Select Difficulty</p><br/>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="difficulty-select">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
          <div className="group-59">
            {/* Number buttons for input */}
            {[
              "1", "2", "3", "4", "5", "6", "7", "8", "9",
              "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
              "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
              "U", "V", "W", "X", "Y"
            ].map((number) => (
              <button
                key={number}
                className="number-button"
                onClick={() => handleInputChange(selectedCell.row, selectedCell.col, number)}
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
          <div className="group-86">
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
          </div>
          <div className="group-87">
            <div className="text-wrapper-83" onClick={handleRestartClick}>Restart</div>
            <img className="vector-17" alt="Vector" src="/img/vector-2.svg" />
          </div>
          <div className="group-88" onClick={handleResetClick}>
            <div className="text-wrapper-83">Reset</div>
            <img className="vector-18" alt="Vector" src="/img/vector-2.svg" />
          </div>
          <div className="group-89">
            <div className="text-wrapper-83">Save</div>
          </div>
        </div>
      </div>
    </div>
  );
};
