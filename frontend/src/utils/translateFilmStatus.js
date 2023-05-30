const translateFilmStatus = (status) => {
  switch (status) {
    case 'Canceled':
      return 'Film annulé';
    case 'In Production':
      return 'Film en production';
    case 'Planned':
      return 'Film planifié';
    case 'Post Production':
      return 'Film en post-production';
    case 'Released':
      return 'Film sorti';
    case 'Rumored':
      return 'Rumeurs';
    default:
      return '';
  }
};

export default translateFilmStatus;
