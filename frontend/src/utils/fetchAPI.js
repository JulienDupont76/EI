import axios from 'axios';

const fetchAPI = (setData, parameters) => {
  const api_url = 'http://localhost:8000/';

  axios
    .get(`${api_url}${parameters}`)
    .then((response) => {
      setData(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchAPI;
