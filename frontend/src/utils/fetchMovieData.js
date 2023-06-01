import axios from 'axios';

const fetchMovieData = (setMovieData, parameters) => {
  const api_url = 'http://localhost:8000/';
  axios
    .get(`${api_url}${parameters}`)
    .then((response) => {
      setMovieData(response.data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchMovieData;
