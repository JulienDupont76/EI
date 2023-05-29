import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const BandeAnnonce = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/603692/videos?language=fr&api_key=522d421671cf75c2cba341597d86403a`
      )
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results[0].key);
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
      <h1 style={{ color: '#000' }}>Bande annonce du film</h1>
      {movies[0] ? <YouTube videoId={`${movies[0].key}`} /> : ''}
    </div>
  );
};

export default BandeAnnonce;
