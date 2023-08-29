import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

// Context API를 통한 전역적 필터 상태 관리
export function FilterContextProvider({ children }) {
  const [filterData, setFilterData] = useState(() => {
    // 로컬 스토리지에 이전에 설정한 필터링 데이터가 있으면 가져오고 없으면 기본 데이터 할당
    const filteredList = localStorage.getItem('filters');
    return filteredList
      ? JSON.parse(filteredList)
      : [
          {
            id: 'car',
            type: 'multiple',
            title: '차종',
            status: false,
            options: [
              { optionTitle: '경형/소형', optionStatus: false },
              { optionTitle: '준중형', optionStatus: false },
              { optionTitle: '중형/대형', optionStatus: false },
              { optionTitle: '수입', optionStatus: false },
              { optionTitle: 'SUV', optionStatus: false },
            ],
          },
          {
            id: 'region',
            type: 'multiple',
            title: '대여지역',
            status: false,
            options: [
              { optionTitle: '서울/경기/인천', optionStatus: false },
              { optionTitle: '제주', optionStatus: false },
              { optionTitle: '부산/창원', optionStatus: false },
              { optionTitle: '대구/경북', optionStatus: false },
              { optionTitle: '대전', optionStatus: false },
              { optionTitle: '광주', optionStatus: false },
            ],
          },
          {
            id: 'price',
            type: 'choice',
            title: '가격',
            status: false,
            options: [
              { optionTitle: '낮은 가격순', optionStatus: false },
              { optionTitle: '높은 가격순', optionStatus: false },
            ],
          },
          {
            id: 'popular',
            type: 'single',
            title: '인기',
            status: false,
          },
          {
            id: 'sale',
            type: 'single',
            title: '특가',
            status: false,
          },
          {
            id: 'new',
            type: 'single',
            title: '신차급',
            status: false,
          },
          {
            id: 'rent',
            type: 'single',
            title: '빠른대여',
            status: false,
          },
          {
            id: 'premium',
            type: 'single',
            title: '프리미엄',
            status: false,
          },
        ];
  });

  // 선택된 필터를 업데이트 함과 동시에 로컬 스토리지에 저장
  const setFilterDataWithLocalStorage = filterData => {
    setFilterData(filterData);
    localStorage.setItem('filters', JSON.stringify(filterData));
  };

  return (
    <FilterContext.Provider value={{ filterData, setFilterDataWithLocalStorage }}>
      {children}
    </FilterContext.Provider>
  );
}
