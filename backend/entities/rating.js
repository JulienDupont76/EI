import typeorm from 'typeorm';

const Rating = new typeorm.EntitySchema({
  name: 'Rating',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    movie_id: { type: Number },
    user_id: { type: Number },
    rating:{type: int}
  },
});

export default Rating;