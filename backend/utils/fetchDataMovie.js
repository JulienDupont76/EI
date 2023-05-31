import axios from 'axios';

const fetchDataMovie = async (idFilm) => {
  const movieDetails = [];
  for (const id of idFilm) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=fr&api_key=522d421671cf75c2cba341597d86403a`
    );
    const data = response.data;
    movieDetails.push(data);
  }

  return movieDetails;
};

export default fetchDataMovie;
