import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PagePlaystyle.css";

export const PagePlay = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Initialize the 9x9 grid with some pre-filled values and nulls for empty spaces
  const [grid, setGrid] = useState([
    [3, 4, null, 6, null, null, 7, null, null],
    [1, null, 6, null, 3, 2, 4, 5, null],
    [null, null, null, 7, 8, 1, null, null, 6],
    [null, 8, null, null, null, null, 9, 6, null],
    [6, 7, null, null, 9, 5, null, 4, null],
    [null, 9, null, 2, null, null, 5, null, null],
    [null, 6, null, null, null, 9, 3, 8, null],
    [null, null, 9, 2, 5, 7, 1, 4, null],
    [7, null, 1, null, 4, 8, null, null, 9],
  ]);

  // Handle user input for editing the grid
  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value >= 1 && value <= 9) {
      const newGrid = grid.map((row, i) =>
        row.map((cell, j) => (i === rowIndex && j === colIndex ? parseInt(value, 10) : cell))
      );
      setGrid(newGrid);
    } else if (value === "") {
      const newGrid = grid.map((row, i) =>
        row.map((cell, j) => (i === rowIndex && j === colIndex ? null : cell))
      );
      setGrid(newGrid);
    }
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
            onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
            readOnly={cell !== null} // Make the pre-filled cells read-only
          />
        ))}
      </div>
    ));
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
          <div className="overlap-6">
            {/* Number buttons */}
            <div className="group-10">
              <div className="frame-11">
                <div className="group-11">
                  <div className="overlap-group-6">
                    <div className="text-wrapper-16">1</div>
                  </div>
                </div>
              </div>
              <div className="group-12">
                <div className="overlap-7">
                  <div className="text-wrapper-17">2</div>
                </div>
              </div>
              <div className="group-13">
                <div className="overlap-7">
                  <div className="text-wrapper-18">3</div>
                </div>
              </div>
              <div className="frame-12">
                <div className="group-11">
                  <div className="overlap-group-6">
                    <div className="text-wrapper-19">7</div>
                  </div>
                </div>
              </div>
              <div className="group-14">
                <div className="overlap-7">
                  <div className="text-wrapper-18">8</div>
                </div>
              </div>
              <div className="group-15">
                <div className="overlap-7">
                  <div className="text-wrapper-18">9</div>
                </div>
              </div>
              <div className="frame-13">
                <div className="group-11">
                  <div className="overlap-group-6">
                    <div className="text-wrapper-19">4</div>
                  </div>
                </div>
              </div>
              <div className="group-16">
                <div className="overlap-7">
                  <div className="text-wrapper-20">5</div>
                </div>
              </div>
              <div className="group-17">
                <div className="overlap-7">
                  <div className="text-wrapper-18">6</div>
                </div>
              </div>
            </div>

            {/* Additional controls */}
            <div className="noun-erase">
              <img className="vector-3" alt="Vector" src="/img/vector.svg" />
              <div className="text-wrapper-21">Erase</div>
            </div>
            <div className="noun-notes">
              <div className="overlap-8">
                <img className="vector-4" alt="Vector" src="/img/vector-1.svg" />
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
                <img className="noun-hint" alt="Noun hint" src="/img/noun-hint-2018232-1.svg" />
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
              <div className="tab-6" onClick={handleNewGameClick}>New Game</div> {/* Add onClick handler */}
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
          <div className="text-wrapper-29">Reset</div>
          <img className="vector-6" alt="Vector" src="/img/vector-2.svg" />
        </div>
        <div className="group-25">
          <div className="text-wrapper-29">Save</div>
        </div>
      </div>
    </div>
  );
};
