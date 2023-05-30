import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="logo" to="/home">
        <h1 className="title">Quoi regarder ?</h1>
        <p className="subtitle">
          L'assistant personnel de recommandation de film
        </p>
      </Link>
      <div>
        <p className="connection">Se connecter</p>
      </div>
    </div>
  );
};

export default Header;
