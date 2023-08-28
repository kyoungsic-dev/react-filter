import React from 'react';
import { CgCloseO } from 'react-icons/cg';

export default function FilterItem({
  filter: { title, status, options },
  onToggleFilter,
  onFilterReset,
}) {
  return (
    <li>
      <div className={`filter-list__tit ${status ? 'active' : ''}`}>
        <p>{title}</p>
        {status && (
          <span
            onClick={() => {
              onFilterReset(title);
            }}>
            <CgCloseO />
          </span>
        )}
      </div>
      <div className='filter-list__detail'>
        {options.map((option, idx) => (
          <button
            type='button'
            key={`options-${idx}`}
            className={`${option.status ? 'active' : ''}`}
            onClick={() => {
              onToggleFilter(title, option.title);
            }}>
            {option.title}
          </button>
        ))}
      </div>
    </li>
  );
}
