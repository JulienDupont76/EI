import { useEffect, useState } from 'react';
import Recommandation from '../../components/Home/Recommendation';
import ListeFilm from '../../components/Home/ListeFilm';
import fetchMovies from '../../utils/fetchMovies';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => fetchMovies(setMovies, 'movies/all'), []);

  return (
    <>
      <Recommandation movies={movies} />
      <ListeFilm movies={movies} />
    </>
  );
};

export default Home;
