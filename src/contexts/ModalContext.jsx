import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [modalToggle, setModalToggle] = useState(false);
  const handleToggleModal = () => {
    setModalToggle(prev => !prev);
  };
  const handleCloseModal = () => {
    setModalToggle(false);
  };

  return (
    <ModalContext.Provider value={{ modalToggle, handleToggleModal, handleCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
}
