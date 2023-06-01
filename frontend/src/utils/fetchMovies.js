import axios from 'axios';

const fetchMovies = (setMovies, parameters) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}${parameters}`)
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchMovies;
