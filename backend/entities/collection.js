import typeorm from 'typeorm';

const Collection = new typeorm.EntitySchema({
  name: 'Collection',
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
});

export default Collection;
