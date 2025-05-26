import React, {useRef,useState} from 'react'
import './Login.css'
import {Link} from "react-router-dom"
function Login() {

    return(
        <div className='main'>
        <div className='log-box'>
            <h1>Login</h1>
            <form>
                <div className="li">
                <label htmlFor='email'>Email Id:</label>
                <input type='email' id='email' placeholder='abc@gmail.com' required></input>
                </div>
                <div className="li">
                <label htmlFor='pass'>Password: </label>
                <input type='password' id='pass' placeholder='Enter your password' required></input>
                </div>
                <button type="submit">Login</button>
                <Link to="/signup">New User? Signup</Link>              
            </form>
        </div>
        </div>
    )
}

export default Login