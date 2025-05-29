import React, { useState } from "react";
import "../styles/Login.css";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login credentials:", loginData);
    // Send loginData to server via fetch/axios
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup credentials:", signupData);
    // Send signupData to server via fetch/axios
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
