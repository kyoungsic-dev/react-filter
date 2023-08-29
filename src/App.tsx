import React from 'react';
import CarList from './components/CarList';
import Nav from './components/Nav';
import FilterList from './components/FilterList';
import './styles/App.scss';

function App() {
  return (
    <div className='App'>
      <Nav />
      <FilterList />
      <CarList />
    </div>
  );
}

export default App;
