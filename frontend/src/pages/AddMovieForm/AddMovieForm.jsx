import './AddMovieForm.css';
import { useState } from 'react';
import axios from 'axios';

const DEFAULT_FORM_VALUES = {
  title: '',
  release_date: '',
  genres: '',
};

// genres: { type: String, default: '' },

function AddMovieForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const handleAddMovieButton = (event) => {
    // This avoid default page reload behavior on form submit
    event.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, formValues);
  };

  return (
    <div>
      <div className="addMovieFormTitle">Add a movie</div>

      <table className="addMovieFormTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Enter movie title"
                onChange={(event) =>
                  setFormValues({ ...formValues, title: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie date"
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    release_date: event.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie genres"
                onChange={(event) =>
                  setFormValues({ ...formValues, genres: event.target.value })
                }
              />
            </td>
            <td>
              <button onClick={handleAddMovieButton}>Add movie</button>
            </td>
          </tr>

          {/* {movies.map((movie) => (
            <tr key={movie.title}>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
              <td>{movie.genres}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default AddMovieForm;
