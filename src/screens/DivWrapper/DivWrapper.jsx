import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const DivWrapper = () => {
  const navigate = useNavigate();

  const handleLevelClick = (level) => {
    if (level === 'EASY') {
      navigate("/page-5");
    } else {
      console.log(`${level} level selected`);
      // Handle other levels if necessary
    }
  };

  return (
    <div className="div-wrapper">
      <div className="page-2">
        <div className="text-wrapper-3">Choose level of difficulty</div>

        {/* EASY Button */}
        <div className="frame-2" onClick={() => handleLevelClick('EASY')}>
          <div className="group-4">
            <div className="overlap-group-3">
              <div className="text-wrapper-4">EASY</div>
            </div>
          </div>
        </div>

        {/* MEDIUM Button */}
        <div className="frame-3" onClick={() => handleLevelClick('MEDIUM')}>
          <div className="group-4">
            <div className="overlap-group-3">
              <div className="text-wrapper-5">MEDIUM</div>
            </div>
          </div>
        </div>

        {/* HARD Button */}
        <div className="frame-4" onClick={() => handleLevelClick('HARD')}>
          <div className="group-4">
            <div className="overlap-group-3">
              <div className="text-wrapper-6">HARD</div>
            </div>
          </div>
        </div>

        <div className="group-5">
          <div className="overlap-2">
            <img className="rectangle-2" alt="Rectangle" src="/img/rectangle-2-2.svg" />
            <div className="text-wrapper-7">MASTER SUDOKU</div>
            <div className="navigation-3">
              <div className="tab-3">Home</div>
              <div className="tab-3">Log Out</div>
              <div className="tab-3">Profile</div>
            </div>
          </div>
          <img className="game-3" alt="Game" src="/img/game-1.png" />
        </div>

        <div className="frame-5">
          <div className="container-5">
            <div className="title-10">2024 Master Sudoku</div>
            <div className="title-11">Terms of Service</div>
            <div className="title-12">Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
};
