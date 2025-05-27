import { useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import '../styles/Login.css';

export const Login = () => {
const navigate = useNavigate();

  const handleToggle = () => {
    console.log("Sign up button clicked")
    navigate("/signup");
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="card-container">
          <div className="switch" onClick={handleToggle}>
            <input
              type="checkbox"
              className="toggle"
              id="toggle"
            />
            <span className="slider"></span>
            <span className="card-side"></span>
          </div>

          <div className="flip-card__inner login-card">
            <div className="flip-card__front">
              <div className="title">Login</div>
              <form className="flip-card__form">
                <input
                  type="email"
                  className="flip-card__input"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  className="flip-card__input"
                  placeholder="Password"
                  required
                />
                <button type="submit" className="flip-card__btn">Login</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
