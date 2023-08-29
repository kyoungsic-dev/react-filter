import { useFilterContext } from './../context/FilterContext';
import useGetCarData from './useGetCarData';
import { Car, Filter } from '../model/types';

export default function useUpdateFilteredList() {
  // 필터 카테고리 상태 가져오기
  const { filterData } = useFilterContext();

  // fetch된 자동차 api 가져오기
  const { carList, isLoading, isError } = useGetCarData();

  // 활성화 된 필터를 각 변수에 할당
  const assignFilter = () => {
    const carFilter: string[] = [];
    const regionFilter: string[] = [];
    let priceFilter: string | null = null,
      popularFilter: string | null = null,
      saleFilter: string | null = null,
      newFilter: string | null = null,
      rentFilter: string | null = null,
      premiumFilter: string | null = null;

    filterData.forEach((filter: Filter) => {
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
    const isFiltered = filterData.some((filter: Filter) => filter.status);
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
      filteredList = filteredList.filter((item: Car) => carFilter.includes(item.carModel));
    }

    // 지역
    if (regionFilter.length > 0) {
      filteredList = filteredList.filter((item: Car) => {
        return item.regionGroups.some(region => regionFilter.includes(region));
      });
    }

    // 가격 필터
    filteredList = priceFilter
      ? // 필터가 활성화 되어있을 때
        filteredList.sort((a: Car, b: Car) => {
          // 낮은 가격순(asc) 정렬
          if (priceFilter === 'asc') return a.price - b.price;
          // 높은 가격순(desc)
          else return b.price - a.price;
        })
      : // 필터가 활성화 되어있지 않다면 carClassId 오름차 순 정렬
        filteredList.sort((a: Car, b: Car) => a.carClassId - b.carClassId);

    // 인기
    if (popularFilter) {
      filteredList = filteredList.filter((item: Car) => item.carTypeTags.includes(popularFilter));
    }

    // 특가
    if (saleFilter) {
      filteredList = filteredList.filter((item: Car) => item.carTypeTags.includes(saleFilter));
    }

    // 신차급
    if (newFilter) {
      filteredList = filteredList.filter((item: Car) => item.carTypeTags.includes(newFilter));
    }

    // 빠른대여
    if (rentFilter) {
      filteredList = filteredList.filter((item: Car) => item.carTypeTags.includes(rentFilter));
    }

    // 프리미엄
    if (premiumFilter) {
      filteredList = filteredList.filter((item: Car) => item.carTypeTags.includes(premiumFilter));
    }

    return filteredList;
  };

  return {
    isLoading,
    isError,
    filteredCarList,
  };
}
