import axios from 'axios';

const fetchMovies = (setMovies, parameters) => {
  const api_url = 'http://localhost:8000/';
  axios
    .get(`${api_url}${parameters}`)
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchMovies;
