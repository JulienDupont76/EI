import Description from '../../components/Film-page/Description';
import Info from '../../components/Film-page/Info';
import BandeAnnonce from '../../components/Film-page/Bande-annonce';
import Similaire from '../../components/Film-page/Similaire';

const Film = () => {
  return (
    <>
      <Description />
      <Info />
      <BandeAnnonce />
      <Similaire />
    </>
  );
};

export default Film;
