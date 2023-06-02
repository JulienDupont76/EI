import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../components/Authentification/Auth';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const Inscription = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNew, setUserNew] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, user, setUser, login, logout } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      lastname: e.target.nom.value,
      firstname: e.target.prenom.value,
      username: e.target.pseudo.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}users/new`, data)
      .then((response) => {
        if (response.data.answer) {
          setIsAuthenticated(true);
          setUser(response.data);
          localStorage.setItem('session', response.data.session);
        } else {
          setIsAuthenticated(false);
          console.log('try again inscription');
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
          <h3 className="title">S'inscrire</h3>
          <div className="input-wrap">
            <input
              type="text"
              name="nom"
              className="input"
              placeholder="Nom"
            />
          </div>
          <div className="input-wrap">
          <input
              type="text"
              name="prenom"
              className="input"
              placeholder="Prénom"
            />
          </div>
          <div className="input-wrap">
          <input
              type="text"
              name="pseudo"
              className="input"
              placeholder="Pseudo"
            />
          </div>
          <div className="input-wrap">
          <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter email"
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
        </form>
      </div>
    </div>
    
  );
};

export default Inscription;
