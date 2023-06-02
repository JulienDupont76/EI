import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { authDemandeBack, setUserEtat } from './utils/UserEtat';

//setUserEtat({ id: 0, username: '', session: '' });
//if (
//  localStorage.getItem('session') !== null &&
//  localStorage.getItem('session') !== ''
//) {
//  const data = {
//    session: localStorage.getItem('session'),
//  };
//  console.log(data);
//  await authDemandeBack(data);
//}

ReactDOM.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
