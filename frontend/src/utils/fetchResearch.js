import axios from 'axios';

const fetchResearch = (setData, parameters, research) => {
  const api_url = 'http://localhost:8000/';

  axios
    .get(`${api_url}${parameters}?research=${research}`)
    .then((response) => {
      setData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default fetchResearch;
