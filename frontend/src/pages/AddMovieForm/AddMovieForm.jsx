import './AddMovieForm.css';
import { useState } from 'react';
import axios from 'axios';

const DEFAULT_FORM_VALUES = {
  title: '',
  release_date: '',
  genres: '',
  adult: false,
  backdrop_path:'',
  belongs_to_collection:'',
  budget:0,
  idTMDB:-1,
  original_language:'en',
  original_title:'',
  overview:'',
  popularity:0,
  poster_path: true,
  revenue: 0,
  runtime:0,
  status: '',
  tagline: '',
  video: '',
  vote_average: 0

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
      <div className="addMovieFormTitle">Ajoute un film</div>

      <table className="addMovieFormTable">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date de sortie</th>
            <th>Genres</th>
            <th>Adulte ?</th>
            <th>Image</th>
            <th>Collection</th>
            <th>Budget</th>
            <th>idTMDB</th>
            <th>Langue d'origine</th>
            <th>Titre d'origine</th>
            <th>Description</th>
            <th>Popularité</th>
            <th>Lien poster </th>
            <th>Revenu </th>
            <th>Durée</th>
            <th>Statuts </th>
            <th>Slogan </th>
            <th>Lien de la bande-annonce </th>
            <th> Moyenne des votes</th>
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
                  setFormValues({
                    ...formValues,
                    genres: event.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter a boolean"
                onChange={(event) =>
                  setFormValues({ ...formValues, adult: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie backdrop path"
                onChange={(event) =>
                  setFormValues({ ...formValues, backdrop_path: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie collection"
                onChange={(event) =>
                  setFormValues({ ...formValues, belongs_to_collection: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie budget"
                onChange={(event) =>
                  setFormValues({ ...formValues, budget: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie idTMDB"
                onChange={(event) =>
                  setFormValues({ ...formValues, idTMDB: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie original language"
                onChange={(event) =>
                  setFormValues({ ...formValues, original_language: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie original title"
                onChange={(event) =>
                  setFormValues({ ...formValues, original_title: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie overview"
                onChange={(event) =>
                  setFormValues({ ...formValues, overview: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie popularity"
                onChange={(event) =>
                  setFormValues({ ...formValues,  popularity: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie poster path"
                onChange={(event) =>
                  setFormValues({ ...formValues, poster_path: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie revenue"
                onChange={(event) =>
                  setFormValues({ ...formValues, revenue: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie runtime"
                onChange={(event) =>
                  setFormValues({ ...formValues, runtime: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie status"
                onChange={(event) =>
                  setFormValues({ ...formValues, status: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie tagline"
                onChange={(event) =>
                  setFormValues({ ...formValues, tagline: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie video"
                onChange={(event) =>
                  setFormValues({ ...formValues, video: event.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter movie vote average"
                onChange={(event) =>
                  setFormValues({ ...formValues, vote_average: event.target.value })
                }
              />
            </td>
            <td>
              <button onClick={handleAddMovieButton}>Ajouter un film</button>
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
