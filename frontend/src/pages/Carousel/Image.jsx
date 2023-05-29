const Image = ({ movie }) => {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`poster ${movie.title}`}
      />
    </div>
  );
};

export default Image;
