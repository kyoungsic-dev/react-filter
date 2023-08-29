import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.scss';
import { FilterContextProvider } from './context/FilterContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/list'>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
