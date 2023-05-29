import { useEffect, useState } from 'react';
import axios from 'axios';
import Lifipe from '../Home/Lifipe';

const Similaire = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/603692/similar?language=fr&page=1&api_key=522d421671cf75c2cba341597d86403a`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 style={{ padding: '20px', color: '#000' }}>Les films similaires</h1>
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

export default Similaire;
