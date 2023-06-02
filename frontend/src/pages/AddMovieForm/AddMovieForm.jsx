import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovieForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      adult: false,
      backdrop_path: null,
      collectionid: null,
      budget: e.target.budget.value,
      idTMDB: 8457,
      original_language: 'en',
      original_title: e.target.title.value,
      overview: e.target.overview.value,
      popularity: 0,
      poster_path: null,
      release_date: e.target.date.value,
      revenue: 0,
      runtime: e.target.runtime.value,
      status: 'Released',
      tagline: '',
      title: e.target.title.value,
      video: '',
      vote_average: 0,
      genres: [],
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}movies/new`, data)
      .then((response) => {
        console.log(response);
<<<<<<< HEAD
        navigate('/');
=======
>>>>>>> main
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Auth-container">
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="title">Ajouter un film</h3>
          <div className="input-wrap">
            <input
              type="text"
              name="title"
              className="input"
              placeholder="Titre"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="date"
              className="input"
              placeholder="Date de sortie"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="overview"
              className="input"
              placeholder="Description"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="budget"
              className="input"
              placeholder="Budget du film"
            />
          </div>
          <div className="input-wrap">
            <input
              type="text"
              name="runtime"
              className="input"
              placeholder="Durée du film"
            />
          </div>
          <div className="bouton-container">
            <div className="wrap">
              <button type="submit" className="bouton2">
                Créer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
