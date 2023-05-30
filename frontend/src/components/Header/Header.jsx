import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="logo" to="/home">
        <p className="title">Quoi regarder ?</p>
        <p className="subtitle">
          L'assistant personnel de recommandation de film
        </p>
      </Link>
      <div className="connection">
        <p>Se connecter</p>
      </div>
    </div>
  );
};

export default Header;
