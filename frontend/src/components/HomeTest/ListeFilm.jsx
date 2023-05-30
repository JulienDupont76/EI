import { useEffect, useState } from 'react';
import axios from 'axios';
import Lifipe from '../Home/Lifipe';

const ListeFilm = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=fr&page=${page}&api_key=522d421671cf75c2cba341597d86403a&language=fr-FR`
      );
      setItems((prevItems) => [...prevItems, ...response.data.results]);
      setPage(page + 1);
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchMovies();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div style={{ color: '#000' }}>
      <h1 style={{ padding: '30px' }}>Liste des films</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap',
        }}
      >
        {items.map((m) => {
          return <Lifipe key={m.id} movie={m} />;
        })}
      </div>
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '200px', height: '200px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{
                margin: 'auto',
                background: '#fff',
                display: 'block',
              }}
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#1d0e0b"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
            </svg>
          </div>
        </div>
      )}
      {errorMessage && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: '500' }}>
            Error: {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListeFilm;
