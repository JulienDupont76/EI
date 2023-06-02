import axios from 'axios';

const _obj = {};

export const setUserEtat = (obj) => {
  Object.assign(_obj, obj);
};
export const getUserEtat = (varName) => {
  if (_obj[varName] !== undefined) {
    return _obj[varName];
  } else {
    return null;
  }
};

export const authDemandeBack = (data, pagetrue = null, pagefalse = null) => {
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL}users/connection`, data)
    .then((response) => {
      if (authRetourBack(response.data)) {
        if (pagetrue !== null) {
          window.location.assign(pagetrue);
        }
      } else {
        if (pagefalse !== null) {
          window.location.assign(pagefalse);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const authRetourBack = (response) => {
  console.log(!response.error);
  if (response.error) {
    localStorage.setItem('session', '');
    setUserEtat({ id: 0, username: '', session: '' });
  } else {
    localStorage.setItem('session', response.session);
    setUserEtat(response);
  }

  return !response.error;
};
