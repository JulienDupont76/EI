import { useEffect, useRef, useState } from 'react';
import { Rerousel } from 'rerousel';
import styled from 'styled-components';
import axios from 'axios';
import Image from './Image';
import Test from './Test';
import './Carousel.css';
import Lifipe from '../../components/Home/Lifipe';

const Carousel = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [movies, setMovies] = useState(moviesData);
  const customerLogo = useRef(null);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const test = useRef(null);
  const myImage =
    'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg';
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 2);
    height: 100px;
    font-family: Signika;
    font-weight: bold;
    font-size: 1.5em;
    border: solid 1px black;
    background-color: #61dafb;

    @media (max-width: 1150px) {
      width: 100%;
    }
  `;

  const HeaderImage = styled.div`
    background-image: url(https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg);
    background-size: cover;
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    background-repeat: no-repeat;
    border: solid 1px ${isHovered ? 'white' : 'black'};
  `;

  const ImageCover = styled.img`
    width: calc(100% / 6);
  `;

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=fr-FR`
      )
      .then((response) => {
        setMoviesData(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(inputRef);

  return (
    <div>
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
      <Rerousel itemRef={ref} interval={3000}>
        <Item ref={ref} key={1}>
          1
        </Item>
        <Item key={2}>2</Item>
        <Item key={3}>3</Item>
        <Item key={4}>4</Item>
        <Item key={5}>5</Item>
      </Rerousel>

      <Rerousel itemRef={test} interval={1000}>
        <ImageCover
          ref={test}
          key={1}
          src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
          alt="test 1"
        />
        <ImageCover
          key={2}
          src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
          alt="test 2"
        />
        <ImageCover
          key={3}
          src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
          alt="test 3"
        />
      </Rerousel>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={focusInput}>Focus Input</button>
      </div>
      <div className="Wrapper" style={{ marginBottom: '30px' }}>
        <ul className="Liste">
          <li className="li a">
            <div className="container2">Test 1</div>
          </li>
          <li className="li b">
            <div className="container2">Test 2</div>
          </li>
          <li className="li c">
            <div className="container2">Test 3</div>
          </li>
          <li className="li d">
            <div className="container2">Test 4</div>
          </li>
          <li className="li e">
            <div className="container2">Test 5</div>
          </li>
          <li className="li f">
            <div className="container2">Test 6</div>
          </li>
          <li className="li g">
            <div className="container2">Test 7</div>
          </li>
          <li className="li h">
            <div className="container2">Test 8</div>
          </li>
          <li className="li i">
            <div className="container2">Test 9</div>
          </li>
          <li className="li j">
            <div className="container2">Test 10</div>
          </li>
          <li className="li k">
            <div className="container2">Test 11</div>
          </li>
          <li className="li l">
            <div className="container2">Test 12</div>
          </li>
          <li className="li m">
            <div className="container2">Test 13</div>
          </li>
        </ul>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap',
        }}
      >
        {movies.map((m) => {
          return <Lifipe movie={m} />;
        })}
      </div>
    </div>
  );
};

export default Carousel;
