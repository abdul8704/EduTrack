import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Popup } from "./Popup";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  const [isOtpPhase, setIsOtpPhase] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login/existinguser", loginData);

      if (response.status === 200) {
        const role = response.data.userDetails.role;
        if (role === "admin") {
          navigate("/adminnav");
        } else if (role === "user") {
          navigate(`/${response.data.userDetails.userid}`);
        }
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 404) {
        setPopupMessage({ success: false, message: err.response.data.message });
      } else {
        setPopupMessage({ success: false, message: "Something went wrong. Please try again." });
      }
      console.error("Login error:", err);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpPhase) {
      console.log("Signup credentials:", signupData);
      // Trigger OTP sending here (e.g. via API)
      setIsOtpPhase(true);
      setSignupData({ ...signupData, confirmpassword: "" });
    } else {
      console.log("OTP entered:", signupData.confirmpassword);
      // Submit OTP for verification
    }
  };

  return (
    <div className="login-main">
      {popupMessage && (
        <Popup
          success={popupMessage.success}
          message={popupMessage.message}
        />
      )}

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
