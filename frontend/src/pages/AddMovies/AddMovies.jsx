import './AddMovies.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import MoviesTable from '../../components/MoviesTable/MoviesTable';

function AddMovies() {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const fetchMovies = () => {
    setMoviesLoadingError(null);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies`)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
      });
  };

  // fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="Movies-container">
      <h1>This page displays the movies</h1>
      <AddMovieForm onSuccessfulMovieCreation={fetchMovies} />
      <MoviesTable movies={movies} onSuccessfulMovieDeletion={fetchMovies} />
      {moviesLoadingError !== null && (
        <div className="movies-loading-error">{moviesLoadingError}</div>
      )}
    </div>
  );
}

export default AddMovies;
