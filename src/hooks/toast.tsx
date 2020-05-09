import React, { createContext, useCallback, useContext } from 'react';

import ToastContainer from '../components/ToastContainer';

// interface de acesso do toast
interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

// criação inicial do contexto
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// retorno do contexto com os métodos
// para os componentes filhos
const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('add toast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('remove toast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// uso do contexto retornado para acessar algum valor
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  // se o context não existe falta <ToastProvider>
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }

  return context;
}

export { ToastProvider, useToast };
