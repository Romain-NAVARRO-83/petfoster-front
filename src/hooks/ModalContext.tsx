import { createContext, useContext, useState } from 'react';

// Create a Context for the modal
const ModalContext = createContext({
    isActive: false,
    openModal: () => {},
    closeModal: () => {},
  });

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const openModal = () => {
    console.log('openModal called');
    setIsActive(true);
  };

  const closeModal = () => {
    console.log('openModal called');
    setIsActive(false);
  };

  return (
    <ModalContext.Provider value={{ isActive, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the ModalContext
export const useModal = () => {
  return useContext(ModalContext);
};
