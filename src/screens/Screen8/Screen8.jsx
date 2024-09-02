import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Screen8 = () => {
  const navigate = useNavigate();

  // Initialize a 25x25 grid state
  const [grid, setGrid] = useState(
    Array.from({ length: 25 }, () => Array(25).fill(""))
  );

  const handleNewGameClick = () => {
    navigate("/page-5");
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value.match(/^[1-9a-yA-Y]?$|^$/)) {
      // Allow values 1-9, A-Y for 25x25 grid
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? value : cell
        )
      );
      setGrid(newGrid);
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
                  value={cell}
                  onChange={(e) =>
                    handleInputChange(
                      rowIndex,
                      colIndex,
                      e.target.value.toUpperCase()
                    )
                  }
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
          <div className="group-59">
            <div className="group-60">
              <div className="overlap-group-15">
                <div className="text-wrapper-66">1</div>
              </div>
            </div>
            <div className="group-61">
              <div className="overlap-group-15">
                <div className="text-wrapper-67">2</div>
              </div>
            </div>
            <div className="group-62">
              <div className="overlap-group-15">
                <div className="text-wrapper-68">9</div>
              </div>
            </div>
            <div className="group-63">
              <div className="overlap-group-15">
                <div className="text-wrapper-69">5</div>
              </div>
            </div>
            <div className="group-64">
              <div className="overlap-group-15">
                <div className="text-wrapper-68">6</div>
              </div>
            </div>
            <div className="group-65">
              <div className="group-66">
                <div className="overlap-group-15">
                  <div className="text-wrapper-70">10</div>
                </div>
              </div>
            </div>
            <div className="group-67">
              <div className="overlap-group-15">
                <div className="rectangle-8" />
                <div className="text-wrapper-71">13</div>
              </div>
            </div>
            <div className="group-68">
              <div className="overlap-group-15">
                <div className="text-wrapper-66">3</div>
              </div>
            </div>
            <div className="group-69">
              <div className="overlap-group-15">
                <div className="text-wrapper-72">4</div>
              </div>
            </div>
            <div className="group-70">
              <div className="overlap-group-15">
                <div className="text-wrapper-73">11</div>
              </div>
            </div>
            <div className="group-71">
              <div className="overlap-group-15">
                <div className="text-wrapper-69">7</div>
              </div>
            </div>
            <div className="group-72">
              <div className="overlap-group-15">
                <div className="text-wrapper-68">8</div>
              </div>
            </div>
            <div className="group-73">
              <div className="overlap-group-15">
                <div className="text-wrapper-70">12</div>
              </div>
            </div>
            <div className="group-74">
              <div className="overlap-group-15">
                <div className="rectangle-8" />
                <div className="text-wrapper-74">15</div>
              </div>
            </div>
            <div className="group-75">
              <div className="overlap-group-15">
                <div className="text-wrapper-74">16</div>
              </div>
            </div>
            <div className="group-76">
              <div className="overlap-group-15">
                <div className="text-wrapper-75">14</div>
              </div>
            </div>
            <div className="group-77">
              <div className="overlap-group-15">
                <div className="text-wrapper-74">17</div>
              </div>
            </div>
            <div className="group-78">
              <div className="overlap-group-15">
                <div className="text-wrapper-74">18</div>
              </div>
            </div>
            <div className="group-79">
              <div className="overlap-group-15">
                <div className="text-wrapper-74">19</div>
              </div>
            </div>
            <div className="group-80">
              <div className="overlap-group-15">
                <div className="text-wrapper-76">20</div>
              </div>
            </div>
            <div className="group-81">
              <div className="overlap-group-15">
                <div className="text-wrapper-77">21</div>
              </div>
            </div>
            <div className="group-82">
              <div className="overlap-group-15">
                <div className="text-wrapper-78">22</div>
              </div>
            </div>
            <div className="group-83">
              <div className="overlap-group-15">
                <div className="text-wrapper-79">23</div>
              </div>
            </div>
            <div className="group-84">
              <div className="overlap-group-15">
                <div className="text-wrapper-80">24</div>
              </div>
            </div>
            <div className="group-85">
              <div className="overlap-group-15">
                <div className="text-wrapper-81">25</div>
              </div>
            </div>
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
            <div className="text-wrapper-83">Restart</div>
            <img className="vector-17" alt="Vector" src="/img/vector-2.svg" />
          </div>
          <div className="group-88">
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
