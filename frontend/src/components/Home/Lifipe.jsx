import './Lifipe.css';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Lifipe = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film/${movie.id}`);
  };

  return (
    <article onClick={handleClick}>
      <div
        className="vignette"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")`,
        }}
      >
        <p className="name">{movie.title}</p>
        <div className="description">
          <p className="texte">{movie.overview}</p>
        </div>
        <div className="bouton">
          <p className="details">En voir plus</p>
          <BsFillArrowRightCircleFill className="fleche" />
        </div>
      </div>
    </article>
  );
};

export default Lifipe;
