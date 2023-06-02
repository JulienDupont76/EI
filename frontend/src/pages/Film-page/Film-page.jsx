import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Description from '../../components/Film-page/Description';
import Info from '../../components/Film-page/Info';
import BandeAnnonce from '../../components/Film-page/Bande-annonce';
import Similaire from '../../components/Film-page/Similaire';
import fetchMovies from '../../utils/fetchMovies';

const Film = () => {
  const { idFilm } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies(setMovie, `movies/${idFilm}`);
  }, []);

  return (
    <>
      {movie.id ? (
        <>
          <Description idFilm={idFilm} />
          <Info idFilm={idFilm} />
          <BandeAnnonce idFilm={movie.idTMDB} />
          <Similaire idFilm={movie.idTMDB} />
        </>
      ) : (
        navigate(`/`)
      )}
    </>
  );
};

export default Film;
