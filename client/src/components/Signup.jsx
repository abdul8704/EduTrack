import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { Login } from "./Login";
import '../styles/Login.css';


export const Signup = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true); // control toggle

  const handleToggle = () => {
    console.log("Login button clicked");
    setIsChecked(false);
    navigate("/login");
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
              checked
            />
            <span className="slider"></span>
            <span className="card-side"></span>
          </div>

          <div className="flip-card__inner signup-card">
            <div className="flip-card__front">
              <div className="title">Signup</div>
              <form className="flip-card__form">
                <input
                  type="text"
                  className="flip-card__input"
                  placeholder="Name"
                  required
                />
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
                <button type="submit" className="flip-card__btn">Signup</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
