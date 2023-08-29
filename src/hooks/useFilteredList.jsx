import { useContext } from 'react';
import { FilterContext } from './../contexts/FilterContext';
import useGetCarData from './useGetCarData';

export default function useUpdateFilteredList() {
  // 필터 카테고리 상태 가져오기
  const { filterData } = useContext(FilterContext);

  // fetch된 자동차 api 가져오기
  const { carList, isLoading, isError } = useGetCarData();

  // 활성화 된 필터를 각 변수에 할당
  const assignFilter = () => {
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

    return {
      carFilter,
      regionFilter,
      priceFilter,
      popularFilter,
      saleFilter,
      newFilter,
      rentFilter,
      premiumFilter,
    };
  };

  // 원본 데이터를 필터 정보를 통해 필터
  const filteredCarList = () => {
    // 필터가 설정되어 있지 않을 때 전체 리스트 리턴
    const isFiltered = filterData.some(filter => filter.status);
    if (!isFiltered) return carList;

    // 할당된 각 필터 변수 호출
    const {
      carFilter,
      regionFilter,
      priceFilter,
      popularFilter,
      saleFilter,
      newFilter,
      rentFilter,
      premiumFilter,
    } = assignFilter();

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
      filteredList = applySpecialFilter(filteredList, popularFilter);
    }

    // 특가
    if (saleFilter) {
      filteredList = applySpecialFilter(filteredList, saleFilter);
    }

    // 신차급
    if (newFilter) {
      filteredList = applySpecialFilter(filteredList, newFilter);
    }

    // 빠른대여
    if (rentFilter) {
      filteredList = applySpecialFilter(filteredList, rentFilter);
    }

    // 프리미엄
    if (premiumFilter) {
      filteredList = applySpecialFilter(filteredList, premiumFilter);
    }

    return filteredList;
  };

  function applySpecialFilter(list, filter) {
    return list.filter(item => item.carTypeTags.includes(filter));
  }
  return {
    isLoading,
    isError,
    filteredCarList,
  };
}
