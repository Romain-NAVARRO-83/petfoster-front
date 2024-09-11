import { createContext, useContext, ReactNode } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextProps {
  showSuccessToast: (message: string, options?: ToastOptions) => void;
  showErrorToast: (message: string, options?: ToastOptions) => void;
}

// Contexte des toasts
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Provider des toasts
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showSuccessToast = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };
  
  const showErrorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  return (
    <ToastContext.Provider value={{ showSuccessToast, showErrorToast }}>
      {children}
      <ToastContainer /> {/* S'assurer que le ToastContainer est bien ici */}
    </ToastContext.Provider>
  );
};

// Hook personnalisé pour accéder aux toasts
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
