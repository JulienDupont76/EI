import { BsStarFill, BsXCircleFill } from 'react-icons/bs';
import './Description.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import fetchMovies from '../../utils/fetchMovies';
import convertDateUStoFR from '../../utils/DateUStoFR';
import convertMinutesToHoursMinutes from '../../utils/TimeMinutesToHoursMinutes';
import { AuthContext } from '../../components/Authentification/Auth';

const Description = ({ idFilm }) => {
  const [movieData, setMovieData] = useState({});
  const [genreData, setGenreData] = useState([]);

  const { isAuthenticated, setIsAuthenticated, user, setUser, login, logout } =
    useContext(AuthContext);

  useEffect(() => fetchMovies(setMovieData, `movies/${idFilm}`), []);
  useEffect(() => fetchMovies(setGenreData, `movies/genres`), []);

  const genre_tri = [];

  for (const genre of genreData) {
    genre_tri[genre.id] = genre.name;
  }

  const [rating, setRating] = useState(0);

  const handleClickLike = (newLike) => {
    setRating(newLike);
    const formValues = {
      idmovie: idFilm,
      iduser: user.id,
      vote: newLike,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}users/like`, formValues)
      .then((response) => console.log(response));
  };

  const handleClickLike1 = () => {
    handleClickLike(1);
  };
  const handleClickLike2 = () => {
    handleClickLike(2);
  };
  const handleClickLike3 = () => {
    handleClickLike(3);
  };
  const handleClickLike4 = () => {
    handleClickLike(4);
  };
  const handleClickLike5 = () => {
    handleClickLike(5);
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
              {isAuthenticated && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleClickLike1}
                    className={rating > 0 ? 'like' : 'notlike'}
                  >
                    <BsStarFill size={30} />
                  </button>
                  <button
                    onClick={handleClickLike2}
                    className={rating > 1 ? 'like' : 'notlike'}
                  >
                    <BsStarFill size={30} />
                  </button>
                  <button
                    onClick={handleClickLike3}
                    className={rating > 2 ? 'like' : 'notlike'}
                  >
                    <BsStarFill size={30} />
                  </button>
                  <button
                    onClick={handleClickLike4}
                    className={rating > 3 ? 'like' : 'notlike'}
                  >
                    <BsStarFill size={30} />
                  </button>
                  <button
                    onClick={handleClickLike5}
                    className={rating > 4 ? 'like' : 'notlike'}
                  >
                    <BsStarFill size={30} />
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Description;
