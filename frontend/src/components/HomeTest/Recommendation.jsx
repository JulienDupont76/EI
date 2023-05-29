import { useEffect, useRef, useState } from 'react';
import { Rerousel } from 'rerousel';
import styled from 'styled-components';
import fetchMovies from '../../utils/fetchMovies';

const Recommandation = () => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const test = useRef(null);

  const ImageCover = styled.img`
    width: calc(100% / 6);
  `;

  useEffect(() => {
    fetchMovies(setMovies);
  }, []);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#282c34',
        boxShadow: '0 3px 20px 1px rgba(0,0,0,0.6)',
      }}
    >
      <h1 style={{ padding: '20px', margin: '0' }}>
        Recommandations pour Juju
      </h1>
      <Rerousel itemRef={test} interval={3000} stop={isHovered ? true : false}>
        {movies.map((m) => {
          return (
            <ImageCover
              ref={test}
              key={m.id}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt="test"
            />
          );
        })}
      </Rerousel>
    </div>
  );
};

export default Recommandation;
