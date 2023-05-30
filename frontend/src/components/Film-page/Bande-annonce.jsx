import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const BandeAnnonce = ({ idFilm }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${idFilm}/videos?language=fr&api_key=522d421671cf75c2cba341597d86403a`
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {movies[0] && (
        <div>
          <h1 style={{ color: '#000' }}>Bande annonce du film</h1>
          <YouTube videoId={`${movies[0].key}`} />
        </div>
      )}
    </div>
  );
};

export default BandeAnnonce;
