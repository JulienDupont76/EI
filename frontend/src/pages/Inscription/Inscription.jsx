import React, { useState } from 'react';
import axios from 'axios';

const Inscription = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

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
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Auth-container">
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="title">Créer un compte</h3>
          <div className="fiel form-group mt-3">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              className="form-control mt-1"
              placeholder="Nom"
            />
          </div>
          <div className="fiel form-group mt-3">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              className="form-control mt-1"
              placeholder="Prénom"
            />
          </div>
          <div className="fiel form-group mt-3">
            <label>Pseudo</label>
            <input
              type="text"
              name="pseudo"
              className="form-control mt-1"
              placeholder="Pseudo"
            />
          </div>
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
        </form>
      </div>
    </div>
  );
};

export default Inscription;
