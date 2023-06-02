import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Authentification/Auth';
import './Login.css';
import { authDemandeBack } from '../../utils/UserEtat';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, user, login, logout } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    authDemandeBack(
      data,
      'http://localhost:3000/home',
      'http://localhost:3000/carousel'
    );
  };

  return (
    <div className="Auth-container">
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
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
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="fiel form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
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
