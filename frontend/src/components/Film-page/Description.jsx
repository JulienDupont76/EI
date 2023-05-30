import { BsHeartFill } from 'react-icons/bs';
import './Description.css';
import { useEffect, useState } from 'react';
import fetchMovieData from '../../utils/fetchMovieData';
import convertDateUStoFR from '../../utils/DateUStoFR';
import convertMinutesToHoursMinutes from '../../utils/TimeMinutesToHoursMinutes';

const Description = ({ idFilm }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => fetchMovieData(setMovieData, idFilm), []);

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
        <img
          className="poster"
          src={
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
              : ''
          }
          alt="test"
        />
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
              {movieData.genres && (
                <p style={{ fontSize: '20px' }}>
                  {movieData.genres.map((element) => element.name).join(', ')}
                </p>
              )}
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
              <div className="like">
                <BsHeartFill />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Description;
