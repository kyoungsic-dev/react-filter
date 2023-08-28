import React, { useContext, useEffect, useState } from 'react';
import CarItem from './CarItem';
import { FilterContext } from '../contexts/FilterContext';

export default function CarList() {
  // 원본
  const [carList, setCarList] = useState([]);
  const { filterData } = useContext(FilterContext);

  useEffect(() => {
    fetch('api/db.json')
      .then(res => res.json())
      .then(result => {
        setCarList(() => result.carClasses);
      });
  }, []);

  // 원본 데이터를 필터 정보를 통해 필터
  const filteredCarList = () => {
    if (carList.length === 0) return;
    let filteredList = [];

    const carFilter = new Array();
    const regionFilter = new Array();
    const priceFilter = new Array();
    let rentFilter = false;
    let newFilter = false;
    let popularFilter = false;
    let saleFilter = false;

    filterData.map(filter => {
      switch (filter.id) {
        case 'car':
          filter.options.map(option => {
            if (option.optionStatus) {
              carFilter.push(option.optionTitle);
            }
            return filter;
          });
          break;
        case 'region':
          filter.options.map(option => {
            if (option.optionStatus) {
              regionFilter.push(option.optionTitle);
            }
            return filter;
          });
          break;
        case 'price':
          filter.options.map(option => {
            if (option.optionStatus) {
              priceFilter.push(option.optionTitle);
            }
            return filter;
          });
          break;
        case 'rent':
          rentFilter = filter.status ? true : false;
          break;
        case 'new':
          newFilter = filter.status ? true : false;
          break;
        case 'popular':
          popularFilter = filter.status ? true : false;
          break;
        case 'sale':
          saleFilter = filter.status ? true : false;
          break;

        default:
          break;
      }
    });

    console.log('carFilter', carFilter);
    console.log('regionFilter', regionFilter);
    console.log('priceFilter', priceFilter);
    console.log('rentFilter', rentFilter);
    console.log('newFilter', newFilter);
    console.log('popularFilter', popularFilter);
    console.log('saleFilter', saleFilter);

    filteredList = [...carList].filter(item => carFilter.includes(item.carModel));
    console.log('filteredList', filteredList);

    return filteredList;
  };

  return (
    <ul className='car-list'>
      {filteredCarList() &&
        filteredCarList().map(item => <CarItem key={item.carClassId} item={item} />)}
    </ul>
  );
}
