import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Make sure your CSS file includes styling for buttons

export const Screen4 = () => {
  const navigate = useNavigate();

  const handleGridSizeClick = (size) => {
    if (size === "9x9") {
      navigate("/page-6-u40playu41");
    } else if (size === "16x16") {
      navigate("/page-8");
    } else if (size === "25x25") {
      navigate("/page-9");
    } else {
      console.log(`${size} grid size selected`);
    }
  };

  const handleHomeClick = () => {
    navigate("/page-3"); // Redirect to the Home page
  };

  const handleLogoutClick = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem("token");
    // Redirect to the login page after logout
    navigate("/page-3");
  };

  return (
    <div className="screen-4">
      <div className="page-4">
        <div className="text-wrapper-9">Choose the grid size</div>

        {/* 9 x 9 Button */}
        <div className="frame-7" onClick={() => handleGridSizeClick("9x9")}>
          <div className="group-7">
            <div className="overlap-group-5">
              <div className="text-wrapper-10">9 x 9</div>
            </div>
          </div>
        </div>

        {/* 16 x 16 Button */}
        <div className="frame-8" onClick={() => handleGridSizeClick("16x16")}>
          <div className="group-7">
            <div className="overlap-group-5">
              <div className="text-wrapper-11">16 x 16</div>
            </div>
          </div>
        </div>

        {/* 25 x 25 Button */}
        <div className="frame-9" onClick={() => handleGridSizeClick("25x25")}>
          <div className="group-7">
            <div className="overlap-group-5">
              <div className="text-wrapper-12">25 x 25</div>
            </div>
          </div>
        </div>

        <div className="group-8">
          <div className="overlap-4">
            <div className="text-wrapper-13">MASTER SUDOKU</div>
            <img className="game-5" alt="Game" src="/img/game-1.png" />
            <div className="navigation-5">
              {/* Home Button */}
              <button className="button" onClick={handleHomeClick}>
                Home
              </button>

              {/* Log Out Button */}
              <button className="button" onClick={handleLogoutClick}>
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="frame-10">
          <div className="container-8">
            <div className="title-18">2024 Master Sudoku</div>
            <div className="title-19">Terms of Service</div>
            <div className="title-20">Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
};
