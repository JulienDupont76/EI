import axios from 'axios';

const fetchMovies = (setMovies) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=fr-FR`
    )
    .then((response) => {
      setMovies(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchMovies;
