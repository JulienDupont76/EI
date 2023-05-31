const CreateMovie = (movie, res, userRepository) => {
  const newMovie = userRepository.create({
    title: movie.title,
    overview: movie.overview,
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    belongs_to_collection: movie.belongs_to_collection,
    budget: movie.budget,
    genres: movie.genres,
    idTMDB: movie.idTMDB,
    original_language: movie.original_language,
    original_title: movie.original_title,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    revenue: movie.revenue,
    runtime: movie.runtime,
    status: movie.status,
    tagline: movie.tagline,
    video: movie.video,
    vote_average: movie.vote_average,
  });

  userRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newMovie.title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the movie' });
      }
    });
};

export default CreateMovie;
