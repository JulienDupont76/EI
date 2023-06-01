import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Authentification/Auth';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  return (
    <div className="Header-container">
      <Link className="logo" to="/home">
        <p className="title">Quoi regarder ?</p>
        <p className="subtitle">
          L'assistant personnel de recommandation de film
        </p>
      </Link>
      <Link className="logo" to="/movies">
        {/* <img src="imgs/Add.png" alt="" /> */}
        <p className="connection">Add a movie</p>
      </Link>
      <div className="connection" onClick={isAuthenticated ? logout : login}>
        <p>{isAuthenticated ? `Bienvenue ${user.username}` : 'Se connecter'}</p>
      </div>
    </div>
  );
};

export default Header;
