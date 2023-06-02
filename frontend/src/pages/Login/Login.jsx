import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { AuthContext } from '../../components/Authentification/Auth';
import './Login.css';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}users/connection`, data)
      .then((response) => {
        if (response.data.answer) {
          setIsAuthenticated(true);
          setUser(response.data);
          localStorage.setItem('session', response.data.session);
        } else {
          setIsAuthenticated(false);
          console.log('try again');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Auth-container">
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="title">Se connecter</h3>
          <div className="input-wrap">
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
          </div>
          <div className="input-wrap">
            <span
              className="bouton-password"
              onClick={() => setPasswordShown(!passwordShown)}
            >
              {passwordShown ? <BsEyeSlashFill /> : <BsEyeFill />}
            </span>

            <input
              type={passwordShown ? 'text' : 'password'}
              name="password"
              className="input"
              placeholder="Enter password"
            />
          </div>
          <div className="bouton-container">
            <div className="wrap">
              <button type="submit" className="bouton2">
                Login
              </button>
            </div>
          </div>
          <Link className="inscription" to="/inscription">
            <p>S'inscrire</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
