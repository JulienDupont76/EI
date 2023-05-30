import axios from 'axios';

const fetchMovieData = (setMovieData, idFilm) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${idFilm}?language=fr&api_key=522d421671cf75c2cba341597d86403a`
    )
    .then((response) => {
      setMovieData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchMovieData;
