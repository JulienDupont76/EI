import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { AuthContext } from '../../components/Authentification/Auth';

const AddMovieForm = () => {
  const navigate = useNavigate();

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
          <h3 className="title">Ajouter un film</h3>
          <div className="input-wrap">
            <input
              type="text"
              name="title"
              className="input"
              placeholder="Titre"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="released-date"
              className="input"
              placeholder="Prénom"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="released-date"
              className="input"
              placeholder="Date de sortie"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="budget"
              className="input"
              placeholder="Budget du film"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="runtime"
              className="input"
              placeholder="Durée du film"
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

export default AddMovieForm;
