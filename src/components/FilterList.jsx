import React from 'react';
import FilterItem from './FilterItem';
import useUpdateFilter from '../hooks/useUpdateFilter';

export default function FilterList() {
  const {
    filterData,
    handleToggleFilter,
    handleToggleFilterDetail,
    handleFilterReset,
    handleAllFilterReset,
  } = useUpdateFilter();
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
