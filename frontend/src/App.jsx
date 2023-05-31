import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import AddMovies from './pages/AddMovies/AddMovies';
import Carousel from './pages/Carousel/Carousel';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="addMovies" element={<AddMovies />} />
        <Route path="about" element={<About />} />
        <Route path="carousel" element={<Carousel />} />
      </Routes>
    </Layout>
  );
}

export default App;
