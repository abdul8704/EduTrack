import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  const [isOtpPhase, setIsOtpPhase] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login credentials:", loginData);
    const response = await axios.post("http://localhost:5000/api/login/existinguser", loginData);
    console.log("Response from server:", response.data.userDetails.role);
    if(response.status === 200) {
      if(response.data.userDetails.role === "admin") {
        navigate("/adminnav");
      }
      else if(response.data.userDetails.role === "user") {
        navigate(`/${response.data.userDetails.userid}`);
      }
    }
  };

const handleSignupSubmit = async (e) => {
  e.preventDefault();

  if (!isOtpPhase) {
    console.log("Signup credentials:", signupData);
    // Send signupData to backend and trigger OTP sending here
    setIsOtpPhase(true);

    // Clear the confirmpassword field when switching to OTP phase
    setSignupData({ ...signupData, confirmpassword: "" });
  } else {
    // OTP submission phase
    console.log("OTP entered:", signupData.confirmpassword);
    // Submit OTP to server for verification
  }
};

  return (
    <div className="login-main">
      <div className="login-wrapper">
        <div className="login-card-switch">
          <label className="login-switch">
            <input type="checkbox" className="login-toggle" />
            <span className="login-slider"></span>
            <span className="login-card-side"></span>
            <div className="login-flip-card__inner">
              <div className="login-flip-card__front">
                <div className="login-title">Log in</div>
                <form className="login-flip-card__form" onSubmit={handleLoginSubmit}>
                  <input
                    className="login-flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                  <input
                    className="login-flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                  <button className="login-flip-card__btn" type="submit">
                    Let's go!
                  </button>
                </form>
              </div>
              <div className="login-flip-card__back">
                <div className="login-title">Sign up</div>
                <form className="login-flip-card__form" onSubmit={handleSignupSubmit}>
                  <input
                    className="login-flip-card__input"
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={signupData.name}
                    onChange={handleSignupChange}
                  />
                  <input
                    className="login-flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                  <input
                    className="login-flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                  <input
                    className="login-flip-card__input"
                    name="confirmpassword"
                    placeholder={isOtpPhase ? "Enter OTP" : "Confirm Password"}
                    type={isOtpPhase ? "text" : "password"}
                    value={signupData.confirmpassword}
                    onChange={handleSignupChange}
                  />
                  <button className="login-flip-card__btn" type="submit">
                    Confirm!
                  </button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
