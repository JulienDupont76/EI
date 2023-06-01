import axios from 'axios';

const fetchAPI = (setData, parameters) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}${parameters}`)
    .then((response) => {
      setData(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchAPI;
