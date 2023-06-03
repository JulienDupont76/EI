import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import Film from './pages/Film-page/Film-page';
import Login from './pages/Login/Login';
import Inscription from './pages/Inscription/Inscription';
import { AuthProvider } from './components/Authentification/Auth';
import AddMovieForm from './pages/AddMovieForm/AddMovieForm';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="film/:idFilm" element={<Film />} />
          <Route path="login" element={<Login />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="add" element={<AddMovieForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
