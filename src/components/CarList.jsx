import React from 'react';
import CarItem from './CarItem';

export default function CarList({ carItems }) {
  return (
    <ul className='car-list'>
      {carItems.map(item => (
        <CarItem key={item.carClassId} item={item} />
      ))}
    </ul>
  );
}
