import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ScreenSevenStyles.css";

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

// Function to remove numbers to create the puzzle
const removeNumbers = (grid, difficulty = "easy") => {
  const newGrid = grid.map((row) => [...row]);
  let attempts = difficulty === "hard" ? 70 : difficulty === "medium" ? 60 : 50;

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

  useEffect(() => {
    const fullGrid = generateSudokuBoard();
    const puzzleGrid = removeNumbers(fullGrid, "easy");
    setGrid(puzzleGrid);
  }, []);

  // Check if a move is valid according to Sudoku rules
  const isValidMove = (grid, row, col, value) => {
    for (let x = 0; x < 16; x++) {
      if (grid[row][x] === value || grid[x][col] === value) return false;
    }
    const startRow = Math.floor(row / 4) * 4;
    const startCol = Math.floor(col / 4) * 4;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[startRow + i][startCol + j] === value) return false;
      }
    }
    return true;
  };

  // Handle input change in the grid
  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value.match(/^[1-9a-gA-G]?$|^$/)) {
      // Allow hexadecimal values (1-9, A-F, and G)
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

  // Handle cell click to mark the selected cell
  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  // Handle button click to input a number into the selected cell
  const handleNumberButtonClick = (number) => {
    const { row, col } = selectedCell;
    if (row !== null && col !== null) {
      handleInputChange(row, col, number);
    } else {
      alert("Please select a cell first!");
    }
  };

  // Navigate to /page-5 on "New Game" click
  const handleNewGameClick = () => {
    navigate("/page-5");
  };

  return (
    <div className="screen-7">
      <div className="page-5">
        <div className="text-wrapper-46">Difficulty: Easy</div>
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
                  readOnly={cell !== null && cell !== ""}
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
            <div className="tab-8" onClick={handleNewGameClick}>
              New Game
            </div>
            <div className="tab-8">Rules</div>
            <div className="tab-8">Tips</div>
          </div>
        </div>
        <div className="frame-19">
          <div className="group-44">
            <div className="overlap-21">
              <div className="noun-erase-3">
                <img className="vector-11" alt="Vector" src="/img/vector.svg" />
                <div className="text-wrapper-49">Erase</div>
              </div>
              <div className="noun-notes-3">
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
              </div>
            </div>
            <div className="group-46">
              <div className="overlap-23">
                <img
                  className="noun-hint-3"
                  alt="Noun hint"
                  src="/img/noun-hint-2018232-1-2.svg"
                />
                <div className="text-wrapper-52">Hint</div>
              </div>
            </div>
            <div className="group-47">
              <div className="overlap-24">
                <img className="img-4" alt="Undo" src="/img/undo-2.svg" />
                <div className="text-wrapper-53">Undo</div>
              </div>
            </div>
            <div className="group-48">
              <div className="overlap-24">
                <img className="img-4" alt="Redo" src="/img/redo-2.svg" />
                <div className="text-wrapper-54">Redo</div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-20">
          {/* <img className="group-49" alt="Group" src="/img/group-30.png" /> */}
          <div className="button-box">
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
            ].map((number) => (
              <button
                key={number}
                className="number-button"
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
          <div className="group-50">
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
          </div>
          <div className="group-51">
            <div className="text-wrapper-56">Restart</div>
            <img className="vector-13" alt="Vector" src="/img/vector-2.svg" />
          </div>
          <div className="group-52">
            <div className="text-wrapper-56">Reset</div>
            <img className="vector-14" alt="Vector" src="/img/vector-2.svg" />
          </div>
          <div className="group-53">
            <div className="text-wrapper-56">Save</div>
          </div>
        </div>
      </div>
    </div>
  );
};
