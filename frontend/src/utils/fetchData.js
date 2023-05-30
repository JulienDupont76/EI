import axios from 'axios';

const fetchData = (setData, parameters) => {
  const api_key = '522d421671cf75c2cba341597d86403a';
  const api_url = 'https://api.themoviedb.org/3/';

  axios
    .get(`${api_url}${parameters}&api_key=${api_key}`)
    .then((response) => {
      setData(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchData;
