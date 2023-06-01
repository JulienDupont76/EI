import axios from 'axios';

const fetchMovieData = (setMovieData, parameters) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}${parameters}`)
    .then((response) => {
      setMovieData(response.data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchMovieData;
