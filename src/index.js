import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/reset.scss';
import { FilterContextProvider } from './contexts/FilterContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename='/list'>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
