import './Lifipe.css';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const Lifipe = ({ movie }) => {
  return (
    <article>
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
          <BsFillArrowRightCircleFill className="test" />
        </div>
      </div>
    </article>
  );
};

export default Lifipe;
