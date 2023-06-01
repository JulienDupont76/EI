import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    adult: { type: Boolean, default: false },
    backdrop_path: { type: String, nullable: true },
    belongs_to_collection: { type: String, nullable: true },
    budget: { type: Number, default: 0 },
    genres: { type: String, default: '' },
    idTMDB: { type: Number, default: -1 },
    original_language: { type: String, nullable: false, default: 'en' },
    original_title: { type: String, nullable: false, default: '' },
    overview: { type: String, default: '' },
    popularity: { type: Number, default: 0 },
    poster_path: { type: String, nullable: true },
    release_date: { type: String },
    revenue: { type: Number, default: 0 },
    runtime: { type: Number, default: 0 },
    status: { type: String, default: '' },
    tagline: { type: String, default: '' },
    title: { type: String, nullable: false, unique: false },
    video: { type: String, nullable: true },
    vote_average: { type: Number, default: 0 },
  },
});

export default Movie;
