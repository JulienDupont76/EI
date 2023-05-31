import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

const DEFAULT_FORM_VALUES = {
  title: '',
  date: '',
  genre: '',
  popularity: 0
};

function AddMovieForm({ onSuccessfulMovieCreation: onSuccessfulMovieCreation }) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);

  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie successfully added');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event) => {
    // This avoid default page reload behavior on form submit
    event.preventDefault();

    setMovieCreationError(null);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
        onSuccessfulMovieCreation();
      })
      .catch((error) => {
        setMovieCreationError('An error occured while creating new movie.');
        console.error(error);
      });
  };

  return (
    <div>
      <form className="add-movie-form" onSubmit={saveMovie}>
        <input
          className="add-movie-input"
          required
          placeholder="Title"
          value={formValues.title}
          onChange={(event) =>
            setFormValues({ ...formValues, title: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Date"
          value={formValues.date}
          onChange={(event) =>
            setFormValues({ ...formValues, date: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Genre"
          value={formValues.genre}
          onChange={(event) =>
            setFormValues({ ...formValues, genre: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          placeholder="Popularity"
          value={formValues.popularity}
          onChange={(event) =>
            setFormValues({ ...formValues, popularity: event.target.value })
          }
        />
        <button className="add-movie-button" type="submit">
          Add movie
        </button>
      </form>
      {movieCreationSuccess !== null && (
        <div className="movie-creation-success">{movieCreationSuccess}</div>
      )}
      {movieCreationError !== null && (
        <div className="movie-creation-error">{movieCreationError}</div>
      )}
    </div>
  );
}

export default AddMovieForm;
