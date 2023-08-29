import React from 'react';
import { CgCloseO } from 'react-icons/cg';
import { GrFormClose } from 'react-icons/gr';
import useToggleModal from '../hooks/useToggleModal';

export default function FilterItem({
  filter: { id, type, title, status, options },
  onToggleFilter,
  onToggleFilterDetail,
  onFilterReset,
}) {
  const { modalOpened, handleToggleModal, handleCloseModal } = useToggleModal();
  return (
    <li>
      <div className={`filter-list__tit ${type === 'single' ? 'filter-list__tit--single' : ''}`}>
        <button
          type='button'
          className={`${status ? 'active' : ''}`}
          onClick={() => {
            onToggleFilter(id);
            handleToggleModal(type);
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

      {type !== 'single' && modalOpened && (
        <>
          <div className='filter-modal'>
            <button type='button' className='filter-modal__close' onClick={handleCloseModal}>
              <GrFormClose />
            </button>

            <div className='filter-modal__btns'>
              {/* 차종/지역 */}
              {type === 'multiple' &&
                options.map((option, idx) => (
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

              {/* 가격 */}
              {type === 'choice' &&
                options.map((option, idx) => (
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
          </div>
          <div className='filter-modal__dim' onClick={handleCloseModal}></div>
        </>
      )}
    </li>
  );
}
