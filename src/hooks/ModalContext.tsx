import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface ModalContextType {
  modalContent: string | null;
  setModalContent: (content: string | null) => void;
  isActive: boolean;
  // openModal: (content: string) => void;
  openModal: (content: string, userId?: number, id?: number) => void;
  closeModal: () => void;
  senderId: number | null;
  receiverId: number | null;
}


const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [senderId, setSenderId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);

  const openModal = (content: string, senderId?: number, receiverId?: number) => {
    setModalContent(content);
    setSenderId(senderId || null);
    setReceiverId(receiverId || null); 
    setIsActive(true); 
  };

  const closeModal = () => {
    setIsActive(false); 
    setModalContent(null); 
    setSenderId(null);
    setReceiverId(null); 
  };

  return (
    <ModalContext.Provider value={{ isActive, openModal, closeModal, modalContent, setModalContent,senderId, receiverId  }}>
      {children}
    </ModalContext.Provider>
  );
}


export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
