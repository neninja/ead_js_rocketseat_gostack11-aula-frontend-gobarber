import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    visibility: hidden; // esconde o elemento totalmente
    opacity: 0; // garante o efeito da transition
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px); // 100% + altura svg
    left: 50%; // centraliza ??
    transform: translateX(-50%); // centraliza ??

    color: #312e38;

    &::before {
      content: ""; // necessário para invocar o ::before
      border-style: solid;
      border-color: #ff9000 transparent; // transparent para contornar o triângulo
      border-width: 8px 8px 0 8px; // triângulo
      position: absolute;
      top: 100%;
      left: 50%; // centraliza ??
      transform: translateX(-50%); // centraliza ??
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
