import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {};

  // if there's no user, show the login form
  return (
    <div className="Auth-container">
      <div className="wrapper">
        <form className="form">
          <img
            src="../../../public/assets/Logo.png"
            alt="logo"
            className="logo"
          />
          <h3 className="title">Se connecter</h3>
          <div className="field form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="fiel form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
