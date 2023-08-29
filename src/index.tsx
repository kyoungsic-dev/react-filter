import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.scss';
import { FilterContextProvider } from './context/FilterContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </React.StrictMode>,
);
