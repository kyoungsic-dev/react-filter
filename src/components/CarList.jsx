import React, { useContext, useEffect, useState } from 'react';
import CarItem from './CarItem';
import { FilterContext } from '../contexts/FilterContext';

export default function CarList() {
  // 원본
  const [carList, setCarList] = useState([]);
  const { filterData } = useContext(FilterContext);

  // 리스트 로딩 & 에러 처리
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let timeout;

    fetch('api/db.json')
      .then(res => res.json())
      .then(result => {
        setCarList(() => result.carClasses);
      })
      .catch(e => {
        setIsError(true);
      })
      .finally(() => {
        timeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    return () => {
      clearTimeout(timeout);
    };
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

    return carList;
  };

  if (isLoading) return <section>리스트를 불러오는 중입니다.</section>;
  if (isError) return <section>리스트를 불러오는 중 에러가 발생했습니다.</section>;

  return (
    <>
      {filteredCarList() ? (
        <ul className='car-list'>
          {filteredCarList().map(item => (
            <CarItem key={item.carClassId} item={item} />
          ))}
        </ul>
      ) : (
        <section>데이터가 없습니다.</section>
      )}
    </>
  );
}
