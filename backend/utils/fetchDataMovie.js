import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Collection from '../entities/collection.js';
import Genre from '../entities/genre.js';
import MovieGenre from '../entities/movie_genre.js';

const fetchDataMovie = async (idFilm) => {
  const movieDetails = [];
  for (const id of idFilm) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=fr&api_key=522d421671cf75c2cba341597d86403a`
    );
    const data = response.data;

    if (data.belongs_to_collection !== null) {
      const collectionRepository = appDataSource.getRepository(Collection);
      const query = await collectionRepository.findOneBy({
        name: data.belongs_to_collection.name,
      });

      if (query === null) {
        await collectionRepository.save({
          name: data.belongs_to_collection.name,
        });
      }
      const query2 = await collectionRepository.findOneBy({
        name: data.belongs_to_collection.name,
      });
      data.collectionid = query2.id;
    } else {
      data.collectionid = null;
    }

    movieDetails.push(data);
  }

  return movieDetails;
};

export default fetchDataMovie;
