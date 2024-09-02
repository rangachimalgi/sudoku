import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScreenSevenStyles.css";

export const Screen7 = () => {
  const navigate = useNavigate();

  // Initialize a 16x16 grid state
  const [grid, setGrid] = useState(Array.from({ length: 16 }, () => Array(16).fill("")));

  // Navigate to /page-5 on "New Game" click
  const handleNewGameClick = () => {
    navigate("/page-5");
  };

  // Handle input change in the grid
  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value.match(/^[1-9a-fA-F]?$|^$/)) { // Allow hexadecimal values (1-9, A-F)
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? value : cell))
      );
      setGrid(newGrid);
    }
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
                  className="screen7-sudoku-cell"
                  type="text"
                  maxLength={1}
                  value={cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value.toUpperCase())}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="div-5">
          <div className="div-5">
            <div className="overlap-group-10">
              <div className="text-wrapper-48">MASTER SUDOKU</div>
              <img className="game-8" alt="Game" src="/img/game-1.png" />
            </div>
          </div>
          <div className="navigation-8">
            <div className="tab-8" onClick={handleNewGameClick}>New Game</div>
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
                  <img className="vector-12" alt="Vector" src="/img/vector-9.svg" />
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
                <img className="noun-hint-3" alt="Noun hint" src="/img/noun-hint-2018232-1-2.svg" />
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
          <img className="group-49" alt="Group" src="/img/group-30.png" />
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
