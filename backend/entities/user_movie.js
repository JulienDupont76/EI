import typeorm from 'typeorm';

const UserMovie = new typeorm.EntitySchema({
    name: 'UserGenre',
    columns: {
      id: {
        primary: true,
        type: Number,
        generated: true,
      },
      iduser: {
        type: Number,
      },
      idmovie: {
        type: Number,
      },
      watched: {
        type: Boolean,
        default: false,
      },
      vote: {
        type: Number,
        default: null
      },
      pred: {
        type: Number,
        default: null
      },
    },
  });
  
  export default UserMovie;
  