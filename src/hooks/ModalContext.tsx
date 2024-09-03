import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface ModalContextType {
  modalContent: string | null;
  setModalContent: (content: string | null) => void;
  isActive: boolean;
  openModal: (content: string) => void;
  closeModal: () => void;
}

// Create a Context for the modal
const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false); // Default to false

  const openModal = (content: string) => {
    setModalContent(content);
    setIsActive(true); // Open the modal
  };

  const closeModal = () => {
    setIsActive(false); // Close the modal
    setModalContent(null); // Clear the content
  };

  return (
    <ModalContext.Provider value={{ isActive, openModal, closeModal, modalContent, setModalContent }}>
      {children}
    </ModalContext.Provider>
  );
}

// Custom hook to use the ModalContext
export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
