import React from 'react';
import { CgCloseO } from 'react-icons/cg';

export default function FilterItem({
  filter,
  filter: { id, type, title, status, options },
  onToggleFilter,
  onToggleFilterDetail,
  onFilterReset,
}) {
  return (
    <li>
      <div className={`filter-list__tit ${type === 'single' ? 'filter-list__tit--single' : ''}`}>
        <button
          type='button'
          className={`${status ? 'active' : ''}`}
          onClick={() => {
            onToggleFilter(id);
          }}>
          {title}
        </button>
        {type !== 'single' && status && (
          <span
            className='filter-list__reset'
            onClick={() => {
              onFilterReset(id);
            }}>
            <CgCloseO />
          </span>
        )}
      </div>

      {/* 차종/지역 */}
      {type === 'multiple' && (
        <div className='filter-list__detail'>
          {options.map((option, idx) => (
            <button
              type='button'
              key={`options-${idx}`}
              className={`${option.optionStatus ? 'active' : ''}`}
              onClick={() => {
                onToggleFilterDetail(id, option.optionTitle);
              }}>
              {option.optionTitle}
            </button>
          ))}
        </div>
      )}

      {/* 가격 */}
      {type === 'choice' && (
        <div className='filter-list__detail'>
          {options.map((option, idx) => (
            <button
              type='button'
              key={`options-${idx}`}
              className={`${option.optionStatus ? 'active' : ''}`}
              onClick={() => {
                onToggleFilterDetail(id, option.optionTitle);
              }}>
              {option.optionTitle}
            </button>
          ))}
        </div>
      )}
    </li>
  );
}
