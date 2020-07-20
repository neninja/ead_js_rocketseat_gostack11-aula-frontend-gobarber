import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// TODO (╯°□°)╯︵ ʞooqǝɔɐɟ
// - por que os mocks devem ficar em cima?
// - por que implementar variáveis "mockedX"?

const mockedHistoryPush = jest.fn(); // função vazia
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

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
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast.tsx', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

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

  it('should display an error if login fails', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to sign in', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        // o objeto não foi especificado pois o Diego não viu sentido,
        // porém a especificação foi sobre a estrutura do objeto
        // Ao inves de testar a mensagem, foi testado se o paramêtro foi um
        // objeto contendo type/error como propriedade/valor
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
