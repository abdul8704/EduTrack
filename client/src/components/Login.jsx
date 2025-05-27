import React from "react";
import "../styles/Login.css"

export const Login = () => {
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
              <form className="login-flip-card__form" action="">
                <input
                  className="login-flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="login-flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <button className="login-flip-card__btn" type="submit">
                  Let&apos;s go!
                </button>
              </form>
            </div>
            <div className="login-flip-card__back">
              <div className="login-title">Sign up</div>
              <form className="login-flip-card__form" action="">
                <input
                  className="login-flip-card__input"
                  placeholder="Name"
                  name="name"
                  type="text"
                />
                <input
                  className="login-flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="login-flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
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

