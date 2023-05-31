import axios from 'axios';
import './MoviesTable.css';

function MoviesTable({ movies, onSuccessfulMovieDeletion }) {
  const deleteMovie = (movieId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieId}`)
      .then(() => onSuccessfulMovieDeletion());
  };

  return (
    <div>
      <table className="movies-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Genre</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.title}>
              <td>{movie.title}</td>
              <td>{movie.date}</td>
              <td>{movie.genre}</td>
              <td>{movie.popularity}</td>
              <td>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoviesTable;
