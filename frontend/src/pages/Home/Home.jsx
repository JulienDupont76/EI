import { useEffect, useRef, useState } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import { Rerousel } from 'rerousel';
import axios from 'axios';
import logo from './logo.svg';
import './Home.css';
import Movie from '../../components/Movie/Movie';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [movies, setMovies] = useState(moviesData);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  const customerLogo = useRef(null);

  const fetchMovies = () => {
    setMoviesLoadingError(null);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=fr-FR&page=1'`
      )
      .then((response) => {
        setMoviesData(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching users.');
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <h1>Rechercher un film</h1>
      <input
        type="text"
        value={movieName}
        onChange={(e) => {
          setMovieName(e.target.value);
          setMovies(
            moviesData.filter((item) => {
              if (!e.target.value) {
                return true;
              }
              if (item.title.includes(e.target.value)) {
                return true;
              }
            })
          );
        }}
      />
      <Movie movies={movies} search={movieName} />
      <ul
        ref={scrollRef}
        style={{
          display: 'flex',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <li
            key={i}
            style={{
              backgroundColor: 'aqua',
              fontSize: '50px',
              width: '250px',
              height: '250px',
              flexShrink: 0,
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Item {i}
          </li>
        ))}
      </ul>
      <div>
        {activePageIndex + 1}/{pages.length}
      </div>
      <button onClick={() => prev()}>Prev</button>
      <button onClick={() => next()}>Next</button>
      <ol style={{ display: 'flex' }}>
        {pages.map((_, i) => (
          <li key={i}>
            <button
              style={i === activePageIndex ? { opacity: 0.5 } : {}}
              onClick={() => goTo(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>
      <Rerousel itemRef={customerLogo} interval={1}>
        {movies.map((m) => {
          return (
            <img
              key={m.id}
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt={`poster ${m.title}`}
            />
          );
        })}
      </Rerousel>
    </div>
  );
}

export default Home;
