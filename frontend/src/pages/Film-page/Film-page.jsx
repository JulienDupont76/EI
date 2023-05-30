import { useParams } from 'react-router-dom';
import Description from '../../components/Film-page/Description';
import Info from '../../components/Film-page/Info';
import BandeAnnonce from '../../components/Film-page/Bande-annonce';
import Similaire from '../../components/Film-page/Similaire';

const Film = () => {
  const { idFilm } = useParams();

  return (
    <>
      <Description idFilm={idFilm} />
      <Info idFilm={idFilm} />
      <BandeAnnonce idFilm={idFilm} />
      <Similaire idFilm={idFilm} />
    </>
  );
};

export default Film;
