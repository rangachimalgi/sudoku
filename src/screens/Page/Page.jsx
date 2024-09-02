import React from "react";
import "./style.css";

export const Page = () => {
  return (
    <div className="page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="group">
            <div className="overlap-group">
              <div className="text-wrapper">MASTER SUDOKU</div>
              <img className="game" alt="Game" src="/img/game-1.png" />
              <div className="navigation">
                <div className="tab">Home</div>
                <div className="tab">About</div>
                <div className="tab">FAQ</div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container">
              <div className="title">Login Form</div>
              <p className="description">Please enter your Email or username and password</p>
              <div className="input">
                <div className="div">Email or username</div>
                <div className="textfield">
                  <p className="text">Enter your email or username</p>
                </div>
              </div>
              <div className="input">
                <div className="div">Password</div>
                <div className="textfield">
                  <div className="text">Enter your password</div>
                </div>
              </div>
              <button className="button">
                <div className="primary">
                  <div className="title-2">Sign In</div>
                </div>
              </button>
            </div>
            <img className="vector" alt="Vector" src="/img/vector-200.png" />
          </div>
          <div className="section-2">
            <div className="container-2">
              <div className="title-3">Forgot your password?</div>
              <div className="description-2">Click below to recover</div>
            </div>
            <button className="button">
              <div className="title-wrapper">
                <div className="title-2">Password Recovery</div>
              </div>
            </button>
            <img className="img" alt="Vector" src="/img/vector-200-1.svg" />
          </div>
          <div className="frame">
            <div className="container-3">
              <div className="title-4">2024 Master Sudoku</div>
              <div className="title-5">Terms of Service</div>
              <div className="title-6">Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
