import axios from 'axios';

const fetchTMDB = async (page) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=fr-FR&page=${page}`
    );
    const data = response.data.results;
    const id = [];
    Object.keys(data).forEach((key) => {
      data[key]['idTMDB'] = data[key]['id'];
      id.push(data[key].id);
    });

    console.log(`Ajout dans la base de la page ${page}`);

    return id;
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    throw error;
  }
};

export default fetchTMDB;
