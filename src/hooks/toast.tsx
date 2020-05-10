import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

// interface de acesso do toast
interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

// criação inicial do contexto
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// retorno do contexto com os métodos
// para os componentes filhos
const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      // quando precisamos preencher o state com o valor anterior como:
      // setMessages([...messages, toast])
      // Podemos enviar uma função, e então seu valor anterior
      // vira um parâmetro
      // isso torna desnecessária a dependência do messages hein
      // useCallback(() => {}, [messages])
      setMessages((state) => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
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
