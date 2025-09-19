import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Popup } from "../components/Popup";
// import { Navbar } from "../components/Navbar";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "", otp: "", password: "", confirmpassword: "" });
  const [isOtpPhase, setIsOtpPhase] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState("email"); // "email", "otp", "password"
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

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
  };

  const handleToggleChange = () => {
    setIsSignupMode(!isSignupMode);
    setIsForgotPasswordMode(false);
    setForgotPasswordStep("email");
    setForgotPasswordData({ email: "", otp: "", password: "", confirmpassword: "" });
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordMode(true);
    setForgotPasswordStep("email");
    setForgotPasswordData({ email: "", otp: "", password: "", confirmpassword: "" });
  };

  const handleBackToLogin = () => {
    setIsForgotPasswordMode(false);
    setForgotPasswordStep("email");
    setForgotPasswordData({ email: "", otp: "", password: "", confirmpassword: "" });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setPopupMessage({
        message: "Please wait... This site is hosted for free on Render. The first request may take up to 50 seconds to respond — please hang tight!",
        color: {
          background: "#d1ecf1",
          border: "#bee5eb",
          text: "#0c5460"
        }
      })
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/existinguser`, loginData);
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
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/check`, {
          useremail: signupData.email
        });
        setPopupMessage({
          message: "Loading.. This site is hosted for free on Render. The first request may take up to 50 seconds to respond — please hang tight!",
          color: {
            background: "#d1ecf1",
            border: "#bee5eb",
            text: "#0c5460"
          }
        });
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/send-otp`, {
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
        setPopupMessage({
          message: "Please wait...",
          color: {
            background: "#d1ecf1",
            border: "#bee5eb",
            text: "#0c5460"
          }
        });

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/verify-otp`, {
          useremail: signupData.email,
          otp: signupData.confirmpassword
        });
        if (response.status === 200) {
          const signUp = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/newuser`, {
            username: signupData.name,
            email: signupData.email,
            password: signupData.password
          });
          if (signUp.status === 201) {
            setPopupMessage({
              message: "Signup successful! Welcome aboard 🎉",
              color: {
                background: "#d4edda",
                border: "#c3e6cb",
                text: "#155724"
              }
            });

            setTimeout(() => {
              navigate(`/user/dashboard/${signUp.data.userid}`);
            }, 900);
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

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (forgotPasswordStep === "email") {
      // Send OTP for password reset
      try {
        setPopupMessage({
          message: "Please wait...",
          color: {
            background: "#d1ecf1",
            border: "#bee5eb",
            text: "#0c5460"
          }
        });

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/forgot-password/send-otp`, {
          useremail: forgotPasswordData.email
        });

        if (response.status === 200) {
          setPopupMessage({
            message: "OTP sent to your email for password reset",
            color: {
              background: "#d1ecf1",
              border: "#bee5eb",
              text: "#0c5460"
            }
          });
          setForgotPasswordStep("otp");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to send OTP. Please try again.";
        setPopupMessage({
          message: errorMessage,
          color: {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24"
          }
        });
      }
    } else if (forgotPasswordStep === "otp") {
      // Verify OTP
      try {
        setPopupMessage({
          message: "Verifying OTP...",
          color: {
            background: "#d1ecf1",
            border: "#bee5eb",
            text: "#0c5460"
          }
        });

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/forgot-password/verify-otp`, {
          useremail: forgotPasswordData.email,
          otp: forgotPasswordData.otp
        });

        if (response.status === 200) {
          setPopupMessage({
            message: "OTP verified! Now set your new password",
            color: {
              background: "#d4edda",
              border: "#c3e6cb",
              text: "#155724"
            }
          });
          setForgotPasswordStep("password");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Invalid OTP. Please try again.";
        setPopupMessage({
          message: errorMessage,
          color: {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24"
          }
        });
      }
    } else if (forgotPasswordStep === "password") {
      // Reset password
      if (forgotPasswordData.password !== forgotPasswordData.confirmpassword) {
        setPopupMessage({
          message: "Passwords do not match",
          color: {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24"
          }
        });
        return;
      }

      try {
        setPopupMessage({
          message: "Resetting password...",
          color: {
            background: "#d1ecf1",
            border: "#bee5eb",
            text: "#0c5460"
          }
        });

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/forgot-password/reset-password`, {
          email: forgotPasswordData.email,
          newPassword: forgotPasswordData.password
        });

        if (response.status === 200) {
          setPopupMessage({
            message: "Password reset successful! You can now log in with your new password",
            color: {
              background: "#d4edda",
              border: "#c3e6cb",
              text: "#155724"
            }
          });

          setTimeout(() => {
            handleBackToLogin();
          }, 2000);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to reset password. Please try again.";
        setPopupMessage({
          message: errorMessage,
          color: {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24"
          }
        });
      }
    }
  };

  const renderForgotPasswordForm = () => {
    return (
      <div className="login-flip-card__front">
        <div className="login-title">Reset Password</div>
        <form className="login-flip-card__form" onSubmit={handleForgotPasswordSubmit}>
          {forgotPasswordStep === "email" && (
            <>
              <input
                className="login-flip-card__input"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={forgotPasswordData.email}
                onChange={handleForgotPasswordChange}
                required
              />
              <button className="login-flip-card__btn" type="submit">
                Send OTP
              </button>
            </>
          )}

          {forgotPasswordStep === "otp" && (
            <>
              <input
                className="login-flip-card__input"
                name="email"
                placeholder="Email"
                type="email"
                value={forgotPasswordData.email}
                onChange={handleForgotPasswordChange}
                disabled
              />
              <input
                className="login-flip-card__input"
                name="otp"
                placeholder="Enter OTP"
                type="text"
                value={forgotPasswordData.otp}
                onChange={handleForgotPasswordChange}
                required
              />
              <button className="login-flip-card__btn" type="submit">
                Verify
              </button>
            </>
          )}

          {forgotPasswordStep === "password" && (
            <>
              <input
                className="login-flip-card__input"
                name="password"
                placeholder="New Password"
                type="password"
                value={forgotPasswordData.password}
                onChange={handleForgotPasswordChange}
                required
              />
              <input
                className="login-flip-card__input"
                name="confirmpassword"
                placeholder="Confirm New Password"
                type="password"
                value={forgotPasswordData.confirmpassword}
                onChange={handleForgotPasswordChange}
                required
              />
              <button className="login-flip-card__btn" type="submit">
                Reset Password
              </button>
            </>
          )}
        </form>

        <button
          className="login-forgot-password-link"
          onClick={handleBackToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: '10px',
            fontSize: '14px'
          }}
        >
          Back to Login
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="login-main">
        {popupMessage && (
          <Popup
            message={popupMessage.message}
            color={popupMessage.color}
          />
        )}

        <div className="login-wrapper">
          <div className="login-card-switch">
            {!isForgotPasswordMode && (
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
            )}

            <div className={`login-flip-card__inner ${isSignupMode && !isForgotPasswordMode ? 'flipped' : ''}`}>
              {isForgotPasswordMode ? (
                renderForgotPasswordForm()
              ) : (
                <>
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

                    <button
                      className="login-forgot-password-link"
                      onClick={handleForgotPasswordClick}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#007bff',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginTop: '10px',
                        fontSize: '14px'
                      }}
                    >
                      Forgot Password?
                    </button>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};