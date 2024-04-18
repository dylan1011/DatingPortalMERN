//login.jsx
// import React from 'react'
import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Routes, useNavigate, Link } from 'react-router-dom';
// import Home from './home'
import axios from 'axios';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = ({setToken}) => {
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false)
  let navigate = useNavigate();


  const handleLogin = async(e) => {
    e.preventDefault();
    let body ={
      username: username,
      password: password
    }
    try{
      const response = await axios.post("http://localhost:3000/users/login",body);
      const token = response.data.token;
      console.log(response.data);
      const admin = response.data.admin;
      console.log(username)
      localStorage.setItem('token',token);
      localStorage.setItem('admin',admin);

      setToken(token);
      navigate('/product/all');
    } catch(error){
      console.error('login Failed', error);
      setErr(true)
    }
  }
  return (
    <>
      {/* <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
        {
          err && <div><Link to ='/resetpassword'>Forgot password ??</Link></div>
        }
    </div> */}
    {/* <div className="login">

    <div className="login-Auth-form-container">
      <form className="login-Auth-form" onSubmit={handleLogin}>
        <div className="login-Auth-form-content">
          <h3 className="login-Auth-form-title">Login</h3>
          <div className="login-form-group mt-3">
            <label>Username : </label>
            <input
              type="text"
              className="login-form-control mt-1"
              placeholder="Enter Username"
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-form-group mt-3">
            <label>Password : </label>
            <input
              type="password"
              className="login-form-control mt-1"
              placeholder="Enter password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          {
            err && <div className="login-forgot-password text-right mt-2" ><Link to ='/resetpassword'>Forgot password ??</Link></div>
          }
        </div>
      </form>
    </div>
    </div> */}
    <div className="login-body">
    <div className="content">
      <div className="text">
        Login
      </div>
      <form action="#" onSubmit={handleLogin}>
        <div className="field">
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>          
          <label>Username</label>
        </div>

        <div className="field">
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>          
          <label>Password</label>
        </div>

        <div className="forgot-pass">
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" className="sign-in-btn">Login</button>
        <div className="sign-up">
          Not a member? <a href="#">signup now</a>
        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default Login