import CarList from './components/CarList';
import Nav from './components/Nav';
import './scss/App.scss';
import FilterList from './components/FilterList';

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
