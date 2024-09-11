import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PagePlaystyle.css";

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
        setGrid(newGrid);
      } else {
        alert("Invalid move! This number conflicts with Sudoku rules.");
      }
    } else {
      alert("Please enter a number between 1 and 9.");
    }
  };

  const handleResetClick = () => {
    setGrid(initialGrid); // Reset the grid to the initial puzzle
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
          row.map((cell, j) => {
            if (i === selectedCell.row && j === selectedCell.col) {
              return number; // Set the clicked number to the active cell
            }
            return cell;
          })
        );
        setGrid(newGrid);
      } else {
        alert("Invalid move! This number conflicts with Sudoku rules.");
      }
    } else {
      alert("Please select a cell first!");
    }
  };

  // Navigate to /page-5 on "New Game" click
  const handleNewGameClick = () => {
    navigate("/page-5");
  };

  return (
    <div className="page-play">
      <div className="div-2">
        <div className="text-wrapper-14">Difficulty: Easy</div>
        <div className="overlap-5">
          <div className="text-wrapper-15">03:56</div>
          <div className="ellipse" />
          <div className="rectangle-4" />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="rectangle-5" />
          <div className="ellipse-4" />
          <div className="ellipse-5" />
        </div>

        {/* Sudoku Grid */}
        <div className="sudoku-grid">{renderGrid()}</div>

        <div className="group-9">
          <p>Select Difficulty</p> <br/>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="difficulty-select">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
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

            {/* Additional controls */}
            <div className="noun-erase">
              <img className="vector-3" alt="Vector" src="/img/vector.svg" />
              <div className="text-wrapper-21">Erase</div>
            </div>
            <div className="noun-notes">
              <div className="overlap-8">
                <img
                  className="vector-4"
                  alt="Vector"
                  src="/img/vector-1.svg"
                />
                <div className="group-18">
                  <div className="overlap-group-7">
                    <div className="text-wrapper-22">OFF</div>
                  </div>
                </div>
                <div className="text-wrapper-23">Notes</div>
              </div>
            </div>
            <div className="group-19">
              <div className="overlap-9">
                <img
                  className="noun-hint"
                  alt="Noun hint"
                  src="/img/noun-hint-2018232-1.svg"
                />
                <div className="text-wrapper-24">Hint</div>
              </div>
            </div>
            <div className="group-20">
              <div className="overlap-10">
                <img className="img-2" alt="Undo" src="/img/undo.svg" />
                <div className="text-wrapper-25">Undo</div>
              </div>
            </div>
            <div className="group-21">
              <div className="overlap-10">
                <img className="img-2" alt="Redo" src="/img/redo.svg" />
                <div className="text-wrapper-26">Redo</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-wrapper-27">Sudoku 9 x 9</div>
        <div className="group-22">
          <div className="overlap-11">
            <div className="text-wrapper-28">MASTER SUDOKU</div>
            <img className="game-6" alt="Game" src="/img/game-1.png" />
            <div className="navigation-6">
              <div className="tab-6" onClick={handleNewGameClick}>
                New Game
              </div>{" "}
              <div className="tab-6">Rules</div>
              <div className="tab-6">Tips</div>
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
          <div className="text-wrapper-29">Restart</div>
          <img className="vector-5" alt="Vector" src="/img/vector-2.svg" />
        </div>
        <div className="group-24">
          <div className="text-wrapper-29" onClick={handleResetClick}>Reset</div>
          <img className="vector-6" alt="Vector" src="/img/vector-2.svg" />
        </div>
        <div className="group-25">
          <div className="text-wrapper-29">Save</div>
        </div>
      </div>
    </div>
  );
};
