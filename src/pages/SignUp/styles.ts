import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh; // utiliza tamanho total da pagina, e não do body ou filhos

  display: flex;
  align-items: stretch; // cada item utiliza os 100 vh
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  place-content: center;

  width: 100%;
  max-width 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
    }
  }

  // estiliza <a> um nivel após o componente, e não todo <a>
  // isso evita que estilize "esqueci minha senha"
  > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
      }
      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
  }
`;

export const Background = styled.div`
  flex: 1; // ocupa todo espaço disponível
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover; // cobre todo espaço necessário
`;
