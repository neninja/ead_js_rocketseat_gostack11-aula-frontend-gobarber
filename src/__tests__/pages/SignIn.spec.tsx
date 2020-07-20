import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn(); // função vazia

// mock biblioteca
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),

    // <Link>children</Link>
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

// mock de hook (funcionalidade existente)
jest.mock('../../hooks/auth.tsx', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', async () => {
    // console.log() do <Component/>
    // const { debug } = render(<SignIn />);
    // debug();

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      // espera que a função de push seja chamada com '/dashboard'
      // cujo é a mesma coisa que esperar o redirecionamento
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
