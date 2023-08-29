import { useState } from 'react';

export default function useModal() {
  // 세부 옵션 모달 Toggle
  const [modalOpened, setModalOpened] = useState(false);
  const handleToggleModal = (type: string) => {
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
  return { modalOpened, handleToggleModal, handleCloseModal };
}
