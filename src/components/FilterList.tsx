import React, { useEffect, useRef } from 'react';
import FilterItem from './FilterItem';
import useUpdateFilter from '../hooks/useUpdateFilter';
import { GrPowerReset } from 'react-icons/gr';
import { Filter } from '../model/types';

const FilterList: React.FC = () => {
  const {
    filterData,
    handleToggleFilter,
    handleToggleFilterDetail,
    handleFilterReset,
    handleAllFilterReset,
  } = useUpdateFilter();
  const isFiltered = filterData.some((filter: Filter) => filter.status);

  // 필터가 변경될 때마다 필터 Container의 Width를 재설정 (가로로 스크롤 되기 위함)
  const filterRef = useRef<HTMLUListElement | null>(null);

  const resizeFilterWidth = () => {
    if (filterRef.current) {
      let sum = 0;
      filterRef.current.childNodes.forEach(li => {
        const liMargin = parseFloat(getComputedStyle(li as HTMLElement).marginLeft) * 2;
        sum += (li as HTMLElement).clientWidth + liMargin;
      });
      filterRef.current.style.width = `${sum + 30}px`;
    }
  };

  useEffect(() => {
    if (!filterRef.current) return;

    resizeFilterWidth();
    window.addEventListener('resize', resizeFilterWidth);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 핸들러를 해제
      window.removeEventListener('resize', resizeFilterWidth);
    };
  }, [filterData]);

  return (
    <section className='filter-wrap'>
      <ul className='filter-list' ref={filterRef}>
        {/* 선택된 필터가 있을 때 필터 초기화 버튼 생성 */}
        {isFiltered && (
          <li className='filter-list__tit filter-list__tit--reset-all'>
            <button type='button' onClick={handleAllFilterReset}>
              <GrPowerReset />
              필터 초기화
            </button>
          </li>
        )}
        {filterData.map((filter: Filter) => (
          <FilterItem
            key={`filter-${filter.id}`}
            filter={filter}
            onToggleFilter={handleToggleFilter}
            onToggleFilterDetail={handleToggleFilterDetail}
            onFilterReset={handleFilterReset}
          />
        ))}
      </ul>
    </section>
  );
};

export default FilterList;
