import React, { useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
import { GrFormClose } from 'react-icons/gr';

export default function FilterItem({
  filter: { id, type, title, status, options },
  onToggleFilter,
  onToggleFilterDetail,
  onFilterReset,
}) {
  // 세부 옵션 모달 Toggle
  const [modalOpened, setModalOpened] = useState(false);
  const handleToggleModal = () => {
    setModalOpened(prev => !prev);

    // 타입이 single이 아닐 때 모달 창 열림 상태에서 세로 스크롤 방지
    if (type !== 'single') {
      document.documentElement.style.overflow = 'hidden';
    }
  };

  // 세부 옵션 모달 닫기
  const handleCloseModal = () => {
    setModalOpened(false);
    document.documentElement.style.overflow = 'auto';
  };

  return (
    <li>
      <div className={`filter-list__tit ${type === 'single' ? 'filter-list__tit--single' : ''}`}>
        <button
          type='button'
          className={`${status ? 'active' : ''}`}
          onClick={() => {
            onToggleFilter(id);
            handleToggleModal();
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
