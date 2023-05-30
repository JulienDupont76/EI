import { useRef, useState } from 'react';
import { Rerousel } from 'rerousel';
import { useNavigate } from 'react-router-dom';
import './Recommandation.css';

const Recommandation = ({ movies }) => {
  const [isHovered, setIsHovered] = useState(false);
  const test = useRef(null);
  const navigate = useNavigate();

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
      {movies.length && (
        <Rerousel
          itemRef={test}
          interval={3000}
          stop={isHovered ? true : false}
        >
          {movies.map((m) => {
            return (
              <div
                key={m.id}
                style={{
                  width: 'calc(100%/6)',
                  height: '450px',
                  backgroundColor: 'rgb(40, 44, 52)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url("https://image.tmdb.org/t/p/w500/${m.poster_path}")`,
                  cursor: 'pointer',
                }}
                className="carousel"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => {
                  navigate(`/film/${m.id}`);
                  navigate(0);
                }}
                ref={test}
              ></div>
            );
          })}
        </Rerousel>
      )}
    </div>
  );
};

export default Recommandation;
