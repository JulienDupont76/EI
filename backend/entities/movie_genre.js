import typeorm from 'typeorm';

const MovieGenre = new typeorm.EntitySchema({
  name: 'MovieGenre',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    idmovie: {
      type: Number,
    },
    idgenre: {
      type: Number,
    },
  },
});

export default MovieGenre;
