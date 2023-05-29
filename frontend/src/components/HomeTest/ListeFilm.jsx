import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Lifipe from '../Home/Lifipe';

const ListeFilm = ({ movies }) => {
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
  useEffect(() => fetchMovies(), []);

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
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default ListeFilm;
