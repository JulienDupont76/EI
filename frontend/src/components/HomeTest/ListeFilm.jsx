import { useEffect, useState } from 'react';
import fetchMovies from '../../utils/fetchMovies';
import Lifipe from '../Home/Lifipe';

const ListeFilm = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies(setMovies);
  }, []);

  return (
    <div style={{ color: '#000' }}>
      <h1 style={{ padding: '30px' }}>Liste des films</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap',
        }}
      >
        {movies.map((m) => {
          return <Lifipe movie={m} />;
        })}
      </div>
    </div>
  );
};

export default ListeFilm;
