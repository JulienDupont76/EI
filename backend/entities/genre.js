import typeorm from 'typeorm';

const Genre = new typeorm.EntitySchema({
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    name: {
      type: String,
      unique: true,
    },
  },
  relations: {
    collections: {
      type: 'many-to-many',
      target: 'Collection',
      joinTable: true,
      cascade: true,
    },
  },
});

export default Genre;
