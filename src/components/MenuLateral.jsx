import React from "react";
import styled from "styled-components";

export default function MenuLateral() {
  const Container = styled.div`
    background-color: #ffd700;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
  `;

  const Texto = styled.p`
    margin: 15px 0;
  `;

  return (
    <Container>
      <div>
        <Texto>Tópicos</Texto>
        <Texto>Ranking</Texto>
        <Texto>Perfil pessoal</Texto>
        <Texto>Regras</Texto>
        <Texto>Sobre o fórum</Texto>
      </div>
    </Container>
  );
}
