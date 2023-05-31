import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    title: { type: String },
    date: { type: String },
    genre: { type: String },
    popularity: { type: Number },
  },
});

export default Movie;
