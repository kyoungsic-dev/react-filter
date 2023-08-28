import React, { useEffect, useState } from 'react';
import FilterItem from './FilterItem';

export default function FilterList() {
  const [filterData, setFilterData] = useState([
    {
      title: '차종',
      status: false,
      options: [
        { title: '경형/소형', status: false },
        { title: '준중형', status: false },
        { title: '중형/대형', status: false },
        { title: '수입', status: false },
        { title: 'SUV', status: false },
      ],
    },
    {
      title: '대여지역',
      status: false,
      options: [
        { title: '서울/경기/인천', status: false },
        { title: '제주도', status: false },
        { title: '부산/창원', status: false },
        { title: '대구/경북', status: false },
        { title: '대전', status: false },
        { title: '광주', status: false },
      ],
    },
  ]);

  // 카테고리 세부 옵션 Toggle
  const handleToggleFilter = (filterTitle, optionTitle) => {
    const updatedFilterData = filterData.map(filter => {
      if (filter.title === filterTitle) {
        const updatedOptions = filter.options.map(option => {
          if (option.title === optionTitle) {
            return { ...option, status: !option.status };
          }
          return option;
        });

        return { ...filter, options: updatedOptions };
      }

      return filter;
    });

    // 카테고리 제목 상태 Toggle
    const result = updatedFilterData.map(filter => {
      const status = filter.options.some(option => option.status);
      return { ...filter, status };
    });

    setFilterData(result);
  };

  // 해당 카테고리 필터 초기화
  const handleFilterReset = filterTitle => {
    const updatedFilterData = filterData.map(filter => {
      if (filter.title === filterTitle) {
        return filter.options.map(option => ({ ...option, status: false }));
      }
      return filter;
    });
    console.log('updatedFilterData', updatedFilterData);

    setFilterData(prev => [...prev, { updatedFilterData }]);
  };

  return (
    <>
      <ul className='filter-list'>
        <li>초기화</li>
        {filterData.map((filter, idx) => (
          <FilterItem
            key={`filter-${idx}`}
            filter={filter}
            onToggleFilter={handleToggleFilter}
            onFilterReset={handleFilterReset}
          />
        ))}
      </ul>
    </>
  );
}
