import React from "react";
import styled from "styled-components";

export default function Footer() {
  const Container = styled.div`
    background-color: #720e9e;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80px;
    line-height: 0.2rem;
    justify-content: center;
    width: 100%;
  `;
  const Texto = styled.p`
    color: white;
  `;
  return (
    <Container>
      <Texto>@Footer</Texto>
      <Texto>Saiba mais</Texto>
    </Container>
  );
}
