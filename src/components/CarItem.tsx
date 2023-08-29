import React from 'react';
import { formatPrice } from '../utils/formatPrice';
import { formatDistance } from '../utils/formatDistance';
import { Car } from '../model/types';

interface CarItemProps {
  item: Car;
}

const CarItem: React.FC<CarItemProps> = ({ item }) => {
  const {
    carClassName,
    carTypeTags,
    discountPercent,
    drivingDistance,
    image,
    price,
    regionGroups,
    year,
  } = item;

  return (
    <li>
      <div className='car-list__tag'>
        {carTypeTags.map((tag, idx) => (
          <span key={`tag-${idx}`}>{tag}</span>
        ))}
      </div>
      <div className='car-list__img'>
        <img src={image} alt={carClassName} loading='lazy' />
      </div>
      <div className='car-list__cont'>
        <div className='car-list__name'>
          <p>{carClassName}</p>
        </div>
        <div className='car-list__info'>
          <p>{year}년식</p>
          <p>{formatDistance(drivingDistance)}km</p>
          <p className='car-list__groups'>
            {regionGroups.map((group, idx) => (
              <span key={`group-${idx}`}>{group}</span>
            ))}
          </p>
        </div>
        <div className='car-list__price'>
          <p>
            <span>{formatPrice(price)}</span>원
          </p>
          {discountPercent > 0 && <span>-{discountPercent}%</span>}
        </div>
      </div>
    </li>
  );
};

export default CarItem;
