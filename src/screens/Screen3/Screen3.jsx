import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Screen3 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Email field for sign-up
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false); // Toggle between sign-in and sign-up
  
  const navigate = useNavigate();

  const handleGetStartedClick = async () => {
    const data = {
      username: username,
      password: password,
    };

    if (isSignup) {
      // If it's a signup, add the email and role (role is set to 'user' by default)
      data.email = email;
      data.role = ["user"]; // Default role is 'user'
    }

    try {
      const endpoint = isSignup
        ? "http://localhost:8080/api/auth/signup"
        : "http://localhost:8080/api/auth/signin";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(isSignup ? "Signup successful" : "Login successful", result);

        if (!isSignup) {
          // Store JWT token in local storage on login
          localStorage.setItem("token", result.token);
        }

        // Navigate to the next page after success
        navigate("/page-5");
      } else {
        const errorData = await response.json();
        setError(errorData.message || (isSignup ? "Signup failed" : "Login failed"));
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setError(null); // Clear any error message when switching modes
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
              <p className="p">
                {isSignup ? "Create your free account" : "Sign in to your account"}
              </p>
              <p className="description-3">
                Please enter your {isSignup ? "email, " : ""}username and password
              </p>
              
              {error && <p style={{ color: "red" }}>{error}</p>}

              {isSignup && (
                <div className="input-2">
                  <div className="title-16">Email</div>
                  <input
                    className="textfield-2"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              <div className="input-2">
                <div className="title-16">Username</div>
                <input
                  className="textfield-2"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

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

              <button className="primary-wrapper" onClick={handleGetStartedClick}>
                <div className="primary-2">
                  <div className="title-17">{isSignup ? "Sign Up" : "Sign In"}</div>
                </div>
              </button>

              <p style={{ cursor: "pointer", color: "blue" }} onClick={toggleAuthMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </p>
            </div>
            <img className="vector-2" alt="Vector" src="/img/vector-200-2.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
