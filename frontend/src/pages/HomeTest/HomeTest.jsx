import { useEffect, useState } from 'react';
import Recommandation from '../../components/HomeTest/Recommendation';
import ListeFilm from '../../components/HomeTest/ListeFilm';
import fetchMovies from '../../utils/fetchMovies';

const HomeTest = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => fetchMovies(setMovies), []);

  return (
    <>
      <Recommandation movies={movies} />
      <ListeFilm movies={movies} />
    </>
  );
};

export default HomeTest;
