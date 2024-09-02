import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Screen3 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Initialize navigate function from useNavigate
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Navigate to page-4 when the button is clicked
    navigate("/page-4");
  };

  return (
    <div className="screen-3">
      <div className="page-3">
        <div className="group-6">
          <div className="overlap-group-4">
            <img className="rectangle-3" alt="Rectangle" src="/img/rectangle-2-3.svg" />
            <div className="text-wrapper-8">MASTER SUDOKU</div>
            <img className="game-4" alt="Game" src="/img/game-1.png" />
            <div className="navigation-4">
              <div className="tab-4">Home</div>
              <div className="tab-4">About</div>
              <div className="tab-4">FAQ</div>
            </div>
          </div>
        </div>
        <div className="overlap-3">
          <div className="frame-6">
            <div className="container-6">
              <div className="title-13">2024 Master Sudoku</div>
              <div className="title-14">Terms of Service</div>
              <div className="title-15">Privacy Policy</div>
            </div>
          </div>
          <div className="section-3">
            <div className="container-7">
              <p className="p">Sign up/Create your free account</p>
              <p className="description-3">Please enter your username and password</p>
              
              {/* Input for Email or Username */}
              <div className="input-2">
                <div className="title-16">Email or username</div>
                <input
                  className="textfield-2"
                  type="text"
                  placeholder="Enter your email or username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Input for Password */}
              <div className="input-2">
                <div className="title-16">Password</div>
                <input
                  className="textfield-2"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Get Started Button */}
              <button className="primary-wrapper" onClick={handleGetStartedClick}>
                <div className="primary-2">
                  <div className="title-17">Get Started</div>
                </div>
              </button>
            </div>
            <img className="vector-2" alt="Vector" src="/img/vector-200-2.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
