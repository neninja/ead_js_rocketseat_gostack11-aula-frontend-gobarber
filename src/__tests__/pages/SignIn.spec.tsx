import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// mock biblioteca
jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(), // função vazia

    // <Link>children</Link>
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { debug } = render(<SignIn />);

    // console.log() do <Component/>
    debug();
  });
});
