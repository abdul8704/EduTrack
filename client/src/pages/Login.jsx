import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Popup } from "../components/Popup";
import { Navbar } from "../components/Navbar";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  const [isOtpPhase, setIsOtpPhase] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [isSignupMode, setIsSignupMode] = useState(false);

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

  const handleToggleChange = () => {
    setIsSignupMode(!isSignupMode);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login/existinguser", loginData);

      if (response.status === 200) {
        const role = response.data.userDetails.role;
        const popupData = {
          message: `Welcome back ${response.data.userDetails.username}!\nThe internet missed you,\neven the cookies were asking where you went.`,
          color: {
            background: "#d4edda",
            border: "#c3e6cb",
            text: "#155724"
          }
        };

        if (role === "admin") {
          navigate(`/admin/dashboard/${response.data.userDetails.userid}/employee/details`, { state: { popupMessage: popupData } });
        } else if (role === "user") {
          navigate(`/user/dashboard/${response.data.userDetails.userid}`, {
            state: { popupMessage: popupData }
          });
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setPopupMessage({
        message: errorMessage,
        color: {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24"
        }
      });
      console.error("Login error:", err);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpPhase) {
      try {
        await axios.post("http://localhost:5000/api/login/signup/check", {
          useremail: signupData.email
        });

        const response = await axios.post("http://localhost:5000/api/login/signup/send-otp", {
          useremail: signupData.email
        });

        if (response.status === 200) {
          setPopupMessage({
            message: "OTP sent to your email",
            color: {
              background: "#d1ecf1",
              border: "#bee5eb",
              text: "#0c5460"
            }
          });
          setIsOtpPhase(true);
          setSignupData({ ...signupData, confirmpassword: "" });
        } else {
          setPopupMessage({
            message: "Failed to send OTP: " + response.data.error,
            color: {
              background: "#f8d7da",
              border: "#f5c6cb",
              text: "#721c24"
            }
          });
        }
      } catch (err) {
        if (err.response?.status === 400 && err.response.data.message === "User already exists") {
          setPopupMessage({
            message: "User with this email already exists",
            color: {
              background: "#fff3cd",
              border: "#ffeeba",
              text: "#856404"
            }
          });
          setIsOtpPhase(false);
          setSignupData({ name: "", email: "", password: "", confirmpassword: "" });
        } else {
          setPopupMessage({
            message: "Network error: " + err.message,
            color: {
              background: "#f8d7da",
              border: "#f5c6cb",
              text: "#721c24"
            }
          });
        }
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/login/signup/verify-otp", {
          useremail: signupData.email,
          otp: signupData.confirmpassword
        });

        if (response.status === 200) {
          const signUp = await axios.post("http://localhost:5000/api/login/signup/newuser", {
            username: signupData.name,
            email: signupData.email,
            password: signupData.password
          });

          if (signUp.status === 200) {
            setPopupMessage({
              message: "Signup successful! Welcome aboard 🎉",
              color: {
                background: "#d4edda",
                border: "#c3e6cb",
                text: "#155724"
              }
            });

            setTimeout(() => {
              navigate(`/user/dashboard/${signupData.email}`);
            }, 1500);
          }
        }
      } catch (err) {
        if (err.response?.status === 400) {
          setPopupMessage({
            message: "Incorrect OTP",
            color: {
              background: "#f8d7da",
              border: "#f5c6cb",
              text: "#721c24"
            }
          });
        } else {
          setPopupMessage({
            message: "Error verifying OTP: " + err.message,
            color: {
              background: "#f8d7da",
              border: "#f5c6cb",
              text: "#721c24"
            }
          });
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-main">
        {popupMessage && (
          <Popup
            message={popupMessage.message}
            color={popupMessage.color}
          />
        )}

        <div className="login-wrapper">
          <div className="login-card-switch">
            <div className="login-switch">
              <input
                type="checkbox"
                className="login-toggle"
                checked={isSignupMode}
                onChange={handleToggleChange}
              />
              <span className="login-slider"></span>
              <span className="login-card-side"></span>
            </div>

            <div className={`login-flip-card__inner ${isSignupMode ? 'flipped' : ''}`}>
              {/* Login Side */}
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
                    required
                  />
                  <input
                    className="login-flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button className="login-flip-card__btn" type="submit">
                    Let's go!
                  </button>
                </form>
              </div>

              {/* Signup Side */}
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
                    required
                  />
                  <input
                    className="login-flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    className="login-flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    className="login-flip-card__input"
                    name="confirmpassword"
                    placeholder={isOtpPhase ? "Enter OTP" : "Confirm Password"}
                    type={isOtpPhase ? "text" : "password"}
                    value={signupData.confirmpassword}
                    onChange={handleSignupChange}
                    required
                  />
                  <button className="login-flip-card__btn" type="submit">
                    Confirm!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
