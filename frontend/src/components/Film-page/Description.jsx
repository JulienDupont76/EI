import { BsHeartFill } from 'react-icons/bs';
import './Description.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import fetchMovies from '../../utils/fetchMovies';
import convertDateUStoFR from '../../utils/DateUStoFR';
import convertMinutesToHoursMinutes from '../../utils/TimeMinutesToHoursMinutes';

const Description = ({ idFilm }) => {
  const [movieData, setMovieData] = useState({});
  const [genreData, setGenreData] = useState([]);

  useEffect(() => fetchMovies(setMovieData, `movies/${idFilm}`), []);
  useEffect(() => fetchMovies(setGenreData, `movies/genres`), []);

  const genre_tri = [];

  for (const genre of genreData) {
    genre_tri[genre.id] = genre.name;
  }

  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked(!isLiked);
    const formValues = {
      isLiked: isLiked,
    };
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/like/`, formValues);
  };

  return (
    <div
      className="test"
      style={{
        backgroundImage: movieData.backdrop_path
          ? `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieData.backdrop_path}")`
          : '#000',
      }}
    >
      <div className="test2">
        {movieData.poster_path && (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt="test"
          />
        )}
        <div className="cartouche">
          <section>
            <h1 className="title">{movieData.title}</h1>
            <div className="infos">
              <span className="certification">12</span>
              <p style={{ fontSize: '20px' }}>
                {movieData.release_date &&
                  convertDateUStoFR(movieData.release_date)}{' '}
                (FR)
              </p>
              {/*movieData.genres && (
                <p style={{ fontSize: '20px' }}>
                  {movieData.genres.map((element) => element.name).join(', ')}
                </p>
              )*/}
              {movieData.genres &&
                movieData.genres.map((genre) => {
                  return (
                    <p style={{ fontSize: '20px' }}>
                      {genre_tri[genre.idgenre]}
                    </p>
                  );
                })}

              {movieData.runtime !== 0 && (
                <p style={{ fontSize: '20px' }}>
                  {convertMinutesToHoursMinutes(movieData.runtime)}
                </p>
              )}
            </div>
            <div className="overview">
              {movieData.tagline && (
                <p
                  style={{
                    fontSize: '25px',
                    fontWeight: '400',
                    fontStyle: 'italic',
                    opacity: '0.7',
                    margin: '10px 0',
                  }}
                >
                  {movieData.tagline}
                </p>
              )}
              {movieData.overview && (
                <div>
                  <h2 style={{ fontSize: '30px', margin: '10px 0' }}>
                    Synopsis
                  </h2>
                  <p
                    style={{
                      fontSize: '22px',
                      fontWeight: '500',
                      lineHeight: '1.5',
                    }}
                  >
                    {movieData.overview}
                  </p>
                </div>
              )}
            </div>
            <div className="boutons">
              <div className="note">
                <p style={{ fontSize: '20px' }}>Note des utilisateurs</p>
                <span>80%</span>
              </div>
              <button
                onClick={handleClickLike}
                className={isLiked ? 'like' : 'notlike'}
              >
                <BsHeartFill />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Description;
