import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Description from '../../components/Film-page/Description';
import Info from '../../components/Film-page/Info';
import BandeAnnonce from '../../components/Film-page/Bande-annonce';
import Similaire from '../../components/Film-page/Similaire';
import fetchMovieData from '../../utils/fetchMovieData';

const Film = () => {
  const { idFilm } = useParams();
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieData(setMovie, idFilm);
  }, []);

  return (
    <>
      {movie ? (
        <>
          <Description idFilm={idFilm} />
          <Info idFilm={idFilm} />
          <BandeAnnonce idFilm={idFilm} />
          <Similaire idFilm={idFilm} />
        </>
      ) : (
        navigate(`/home`)
      )}
    </>
  );
};

export default Film;
