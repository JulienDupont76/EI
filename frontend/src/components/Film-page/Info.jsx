import './Info.css';
import { useEffect, useState } from 'react';
import fetchMovieData from '../../utils/fetchMovieData';
import translateFilmStatus from '../../utils/translateFilmStatus';
import formatPrix from '../../utils/formatPrice';

const Info = ({ idFilm }) => {
  const [movieData, setMovieData] = useState([]);

  const languageNames = new Intl.DisplayNames(['fr'], { type: 'language' });

  useEffect(() => fetchMovieData(setMovieData, idFilm), []);

  return (
    <div className="container-info">
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Titre d'origine
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          {movieData.original_title}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Statut
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          {translateFilmStatus(movieData.status)}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Langue d'origine
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          {movieData.original_language &&
            languageNames
              .of(movieData.original_language)
              .charAt(0)
              .toUpperCase() +
              languageNames.of(movieData.original_language).slice(1)}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Budget
        </p>
        {movieData.budget === 0 ? (
          <p style={{ fontSize: '18px', margin: '10px 0' }}>Non renseigné</p>
        ) : (
          <p style={{ fontSize: '18px', margin: '10px 0' }}>
            $ {formatPrix(movieData.budget)}
          </p>
        )}
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: '700', margin: '10px 0' }}>
          Recette
        </p>
        {movieData.revenue === 0 ? (
          <p style={{ fontSize: '18px', margin: '10px 0' }}>Non renseigné</p>
        ) : (
          <p style={{ fontSize: '18px', margin: '10px 0' }}>
            $ {formatPrix(movieData.revenue)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Info;
