import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Carousel from './pages/Carousel/Carousel';
import Film from './pages/Film-page/Film-page';
import HomeTest from './pages/HomeTest/HomeTest';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="carousel" element={<Carousel />} />
        <Route path="film/:idFilm" element={<Film />} />
        <Route path="home" element={<HomeTest />} />
      </Routes>
    </Layout>
  );
}

export default App;
