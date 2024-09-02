import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const PageScreen = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/page-3");
  };

  return (
    <div className="page-screen">
      <div className="overlap-group-wrapper">
        <div className="overlap-group-2">
          <div className="MASTER-SUDOKU">
            MASTER
            <br />
            SUDOKU
          </div>
          <div className="group-wrapper">
            <div className="img-wrapper">
              <img className="group-2" alt="Group" src="/img/group-1.png" />
            </div>
          </div>
          <div className="group-3">
            {/* <img className="rectangle" alt="Rectangle" src="/img/rectangle-2-1.svg" /> */}
            <div className="text-wrapper-2">MASTER SUDOKU</div>
            <img className="game-2" alt="Game" src="/img/game-1.png" />
            
          </div>
          <div className="container-wrapper">
            <div className="container-4">
              <div className="title-7">2024 Master Sudoku</div>
              <div className="title-8">Terms of Service</div>
              <div className="title-9">Privacy Policy</div>
            </div>
            <div className="navigation-2">
              <div className="tab-2" onClick={handleLoginClick}>Login</div>
              <div className="tab-2">Sign up</div>
              <div className="tab-2">Profile</div>
            </div>
          </div>
          <img className="element" alt="Element" src="/img/6710504-1.png" />
        </div>
      </div>
    </div>
  );
};
