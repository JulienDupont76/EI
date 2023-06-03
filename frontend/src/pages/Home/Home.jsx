import { useContext, useEffect, useState } from 'react';
import Recommandation from '../../components/Home/Recommendation';
import ListeFilm from '../../components/Home/ListeFilm';
import fetchMovies from '../../utils/fetchMovies';
import { AuthContext } from '../../components/Authentification/Auth';

const Home = () => {
  const [movies, setMovies] = useState([]);

  const { isAuthenticated, setIsAuthenticated, user, setUser, login, logout } =
    useContext(AuthContext);

  //useEffect(() => fetchMovies(setMovies, 'movies/all'), []);

  {
    isAuthenticated
      ? useEffect(() => fetchMovies(setMovies, `movies/user`), [])
      : useEffect(() => fetchMovies(setMovies, 'movies/all'), []);
  }

  return (
    <>
      <Recommandation movies={movies} />
      <ListeFilm movies={movies} />
    </>
  );
};

export default Home;
