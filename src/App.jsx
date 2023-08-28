import { useEffect, useState } from 'react';
import CarList from './components/CarList';
import FilterList from './components/FilterList';
import './scss/App.scss';

function App() {
  const [carItems, setCarItems] = useState([]);

  useEffect(() => {
    fetch('api/db.json')
      .then(res => res.json())
      .then(result => {
        setCarItems(() => result.carClasses);
      });
  }, []);

  return (
    <div className='App'>
      <h1 className='app-tit'>차량 리스트</h1>
      <FilterList />
      <CarList carItems={carItems} />
    </div>
  );
}

export default App;
