import { useEffect, useRef, useState } from 'react';
import { Rerousel } from 'rerousel';
import fetchData from '../../utils/fetchData';

const Recotest = () => {
  const [data, setData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    fetchData(setData, 'movie/popular?language=fr&');
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
        backgroundColor: 'white',
        width: '1110px',
        margin: '50px auto',
        borderRadius: '10px',
        border: '1px solid black',
      }}
    >
      <div
        style={{
          height: '50px',
          backgroundColor: 'gray',
          borderRadius: '10px 10px 0 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        REROUSSEL PREVIEW
      </div>
      {data.length ? (
        <Rerousel itemRef={itemRef} interval={3000} stop={false}>
          {data.map((m) => {
            return (
              <div
                key={m.id}
                style={{
                  width: '300px',
                  height: '450px',
                  backgroundColor: 'rgb(40, 44, 52)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url("https://image.tmdb.org/t/p/w500/${m.poster_path}")`,
                }}
                ref={itemRef}
              ></div>
            );
          })}
        </Rerousel>
      ) : (
        <p>test</p>
      )}
    </div>
  );
};
export default Recotest;
