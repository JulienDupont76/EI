import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Authentification/Auth';
import './Header.css';
import { getUserEtat } from '../../utils/UserEtat';

const Header = () => {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(getUserEtat('id'));

  return (
    <div className="Header-container">
      <Link className="logo" to="/home">
        <p className="title">Quoi regarder ?</p>
        <p className="subtitle">
          L'assistant personnel de recommandation de film
        </p>
      </Link>
      {getUserEtat('id') !== 0 ? (
        <div>
          <Link className="connection" to="/home" onClick={logout}>
            <p>Se déconnecter</p>
          </Link>
          <div className="connection" onClick={logout}>
            <p>Bienvenue {getUserEtat('username')}</p>
          </div>
        </div>
      ) : (
        <Link className="connection" to="/login">
          <p>Se connecter</p>
        </Link>
      )}
    </div>
  );
};

export default Header;
