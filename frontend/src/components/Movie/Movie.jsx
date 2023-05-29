import './Movie.css';

const Movie = ({ movies, search }) => {
  console.log(movies);

  return (
    <div className="container">
      <table className="movies-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom du film</th>
            <th>Date de sortie</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`poster ${movie.title}`}
                />
              </td>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
              <td>{movie.overview}</td>
            </tr>
          ))}
          {movies.length === 0 && (
            <tr>
              <td colSpan="4">Aucun film correspondant</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Movie;
