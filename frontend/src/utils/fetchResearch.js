import axios from 'axios';

const fetchResearch = (setData, parameters, research) => {
  axios
    .get(
      `${import.meta.env.VITE_BACKEND_URL}${parameters}?research=${research}`
    )
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchResearch;
