import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Authentification/Auth';
import './Header.css';
import { getUserEtat } from '../../utils/UserEtat';

const Header = () => {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="Header-container">
      <Link className="logo" to="/">
        <img
          src="http://138.195.138.190/assets/Logo.png"
          style={{ height: '100%', width: '300px' }}
        />
      </Link>
      {isAuthenticated ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <div className="connection">
            <p>Bienvenue {user.username}</p>
          </div>
          <Link className="connection" to="/" onClick={logout}>
            <p>Se déconnecter</p>
          </Link>
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
