import React from 'react';
import './navbar.css';
import styled from 'styled-components';
import logo from './download.avif'; 

function Navbar() {
  return (
    <nav className="navbar-navbar">
  <div className="navbar-left-section">
    <div className="navbar-logo-container">
      <img src={logo} alt="Logo" className="navbar-logo" />
    </div>
    <div className="navbar-search-container">
      <Input />
    </div>
  </div>
  <div className="navbar-right-section">
    <div className="navbar-nav-spacer" />
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>

  );
}

const Input = () => {
  return (
    <StyledWrapper>
      <form className="form">
        <button>
            <div className="shadow__input" />
          <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input className="input" placeholder="Type your text" required type="text" />
        <button className="reset" type="reset">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* From uiverse.io by @satyamchaudharydev */
  /* removing default style of button */

  .form button {
    border: none;
    background: none;
    color: #8b8ba7;
  }
  /* styling of whole input container */
  .form {
    --timing: 0.3s;
    --width-of-input: 200px;
    --height-of-input: 40px;
    --border-height: 2px;
    --input-bg: #fff;
    --border-color: #2f2ee9;
    --border-radius: 30px;
    --after-border-radius: 1px;
    position: relative;
    width: var(--width-of-input);
    height: var(--height-of-input);
    display: flex;
    align-items: center;
    padding-inline: 0.8em;
    border-radius: var(--border-radius);
    transition: border-radius 0.5s ease;
    background: var(--input-bg,#fff);
  }
  /* styling of Input */
  .input {
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
  }
  /* styling of animated border */
  .form:before {
    content: "";
    position: absolute;
    background: var(--border-color);
    transform: scaleX(0);
    transform-origin: center;
    width: 100%;
    height: var(--border-height);
    left: 0;
    bottom: 0;
    border-radius: 1px;
    transition: transform var(--timing) ease;
  }
  /* Hover on Input */
  .form:focus-within {
    border-radius: var(--after-border-radius);
  }
    .shadow__input {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(30px);
    border-radius: 20px;
    background-color: #999cff;
    background-image: radial-gradient(at 85% 51%, hsla(60,60%,61%,1) 0px, transparent 50%),
      radial-gradient(at 74% 68%, hsla(235,69%,77%,1) 0px, transparent 50%),
      radial-gradient(at 64% 79%, hsla(284,72%,73%,1) 0px, transparent 50%),
      radial-gradient(at 75% 16%, hsla(283,60%,72%,1) 0px, transparent 50%),
      radial-gradient(at 90% 65%, hsla(153,70%,64%,1) 0px, transparent 50%),
      radial-gradient(at 91% 83%, hsla(283,74%,69%,1) 0px, transparent 50%),
      radial-gradient(at 72% 91%, hsla(213,75%,75%,1) 0px, transparent 50%);
  }

  input:focus {
    outline: none;
  }
  /* here is code of animated border */
  .form:focus-within:before {
    transform: scale(1);
  }
  /* styling of close button */
  /* == you can click the close button to remove text == */
  .reset {
    border: none;
    background: none;
    opacity: 0;
    visibility: hidden;
  }
  /* close button shown when typing */
  input:not(:placeholder-shown) ~ .reset {
    opacity: 1;
    visibility: visible;
  }
  /* sizing svg icons */
  .form svg {
    width: 17px;
    margin-top: 3px;
  }`;

export default Navbar;
