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

    // 필터가 설정되어 있지 않을 때 전체 리스트 리턴
    const isFiltered = filterData.some(filter => filter.status);
    if (!isFiltered) return carList;

    // 필터가 설정되어 있을 때
    const carFilter = [];
    const regionFilter = [];
    let priceFilter, popularFilter, saleFilter, newFilter, rentFilter, premiumFilter;

    filterData.forEach(filter => {
      switch (filter.id) {
        case 'car':
          filter.options.forEach(option => {
            if (option.optionStatus) carFilter.push(option.optionTitle);
          });
          break;
        case 'region':
          filter.options.forEach(option => {
            if (option.optionStatus) regionFilter.push(option.optionTitle);
          });
          break;
        case 'price':
          filter.options.forEach(option => {
            if (option.optionStatus)
              priceFilter = option.optionTitle === '낮은 가격순' ? 'asc' : 'desc';
          });
          break;

        case 'popular':
          popularFilter = filter.status ? '인기' : null;
          break;
        case 'sale':
          saleFilter = filter.status ? '특가' : null;
          break;
        case 'new':
          newFilter = filter.status ? '신차급' : null;
          break;
        case 'rent':
          rentFilter = filter.status ? '빠른대여' : null;
          break;
        case 'premium':
          premiumFilter = filter.status ? '프리미엄' : null;
          break;

        default:
          break;
      }
    });

    let filteredList = [...carList];

    // 차종
    if (carFilter.length > 0) {
      filteredList = filteredList.filter(item => carFilter.includes(item.carModel));
    }

    // 지역
    if (regionFilter.length > 0) {
      filteredList = filteredList.filter(item => {
        return item.regionGroups.some(region => regionFilter.includes(region));
      });
    }

    // 가격 필터
    filteredList = priceFilter
      ? // 필터가 활성화 되어있을 때
        filteredList.sort((a, b) => {
          // 낮은 가격순(asc) 정렬
          if (priceFilter === 'asc') return a.price - b.price;
          // 높은 가격순(desc)
          else return b.price - a.price;
        })
      : // 필터가 활성화 되어있지 않다면 carClassId 오름차 순 정렬
        filteredList.sort((a, b) => a.carClassId - b.carClassId);

    // 인기
    if (popularFilter) {
      filteredList = filteredList.filter(item => item.carTypeTags.includes(popularFilter));
    }

    // 특가
    if (saleFilter) {
      filteredList = filteredList.filter(item => item.carTypeTags.includes(saleFilter));
    }

    // 신차급
    if (newFilter) {
      filteredList = filteredList.filter(item => item.carTypeTags.includes(newFilter));
    }

    // 빠른대여
    if (rentFilter) {
      filteredList = filteredList.filter(item => item.carTypeTags.includes(rentFilter));
    }

    // 프리미엄
    if (premiumFilter) {
      filteredList = filteredList.filter(item => item.carTypeTags.includes(premiumFilter));
    }

    return filteredList;
  };

  // 로딩 시
  if (isLoading) return <section>리스트를 불러오는 중입니다.</section>;

  // 에러 발생 시
  if (isError) return <section>리스트를 불러오는 중 에러가 발생했습니다.</section>;

  return (
    <>
      {filteredCarList().length > 0 ? (
        <ul className='car-list'>
          {filteredCarList().map(item => (
            <CarItem key={item.carClassId} item={item} />
          ))}
        </ul>
      ) : (
        <section>
          <p>
            선택하신 조건에 맞는 차량이 없습니다. <br />
            준비된 다른 차량을 확인해 보세요!
          </p>
        </section>
      )}
    </>
  );
}
