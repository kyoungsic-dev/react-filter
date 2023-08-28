import React, { useState } from 'react';
import FilterItem from './FilterItem';

export default function FilterList() {
  const [filterData, setFilterData] = useState([
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
        { optionTitle: '제주도', optionStatus: false },
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
      id: 'rent',
      type: 'single',
      title: '빠른대여',
      status: false,
    },
    {
      id: 'new',
      type: 'single',
      title: '신차',
      status: false,
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
  ]);

  // 필터 세부 옵션 모달 Toggle/특수 필터 Toggle
  const handleToggleFilter = id => {
    const updatedFilterData = filterData.map(filter => {
      if (filter.id === id) {
        // 특수 필터일 때 필터 Toggle
        if (filter.type === 'single') {
          const status = !filter.status;
          return { ...filter, status };
        }

        // 일반 필터일 때 모달 창 Toggle
      }

      return filter;
    });

    setFilterData(updatedFilterData);
  };

  // 필터 세부 옵션 Toggle
  const handleToggleFilterDetail = (id, optionTitle) => {
    // 세부 옵션 Toggle
    const updatedFilterData = filterData.map(filter => {
      if (filter.id !== id) return filter;

      let updatedOptions = [];

      switch (filter.type) {
        // 차종/지역 - 중복
        case 'multiple':
          updatedOptions = filter.options.map(option => {
            if (option.optionTitle === optionTitle) {
              const optionStatus = !option.optionStatus;
              return { ...option, optionStatus };
            }
            return option;
          });
          break;

        // 가격 - 택일
        case 'choice':
          updatedOptions = filter.options.map(option => {
            if (option.optionTitle === optionTitle) {
              return { ...option, optionStatus: true };
            } else {
              return { ...option, optionStatus: false };
            }
          });
          break;

        default:
          break;
      }

      return { ...filter, options: updatedOptions };
    });

    opionStatusCheck(updatedFilterData);
  };

  // 선택한 필터 초기화
  const handleFilterReset = id => {
    const updatedFilterData = filterData.map(filter => {
      if (filter.id === id) {
        const options = filter.options.map(option => ({ ...option, optionStatus: false }));
        return { ...filter, options };
      }
      return filter;
    });

    opionStatusCheck(updatedFilterData);
  };

  // 전체 필터 초기화
  const handleAllFilterReset = () => {
    const ressetFilterData = filterData.map(filter => {
      // 특수 타입 필터
      if (filter.type === 'single') return { ...filter, status: false };

      // 일반 필터
      const options = filter.options.map(option => {
        return { ...option, optionStatus: false };
      });
      return { ...filter, status: false, options };
    });
    setFilterData(ressetFilterData);
  };

  // 필터 옵션들 중 optionStatus가 true인게 있는 지 체크
  const opionStatusCheck = filterData => {
    const updatedFilterData = filterData.map(filter => {
      // 특수 타입 필터
      if (filter.type === 'single') return filter;

      // 일반 필터
      const status = filter.options.some(option => option.optionStatus);
      return { ...filter, status };
    });

    return setFilterData(updatedFilterData);
  };

  return (
    <>
      <ul className='filter-list'>
        <li>
          <button type='button' onClick={handleAllFilterReset}>
            초기화
          </button>
        </li>
        {filterData.map(filter => (
          <FilterItem
            key={`filter-${filter.id}`}
            filter={filter}
            onToggleFilter={handleToggleFilter}
            onToggleFilterDetail={handleToggleFilterDetail}
            onFilterReset={handleFilterReset}
          />
        ))}
      </ul>
    </>
  );
}
