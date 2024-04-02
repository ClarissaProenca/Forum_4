import React from "react";
import styled from "styled-components";

export default function Posts() {
  const Container = styled.div`
    border: 3px solid #d3d3d3;
    border-radius: 5px;
    margin: 0;
    margin-bottom: 20px;
    display: flex;
    padding: 16px 36px;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
    height: auto;
    justify-content: flex-start;
    max-width: 65vw;
  `;

  const FotoUsuario = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e44d2e;
  `;

  const NomeUsuario = styled.h5`
    margin: 2px 2px;
    font-size: 0.9rem;
    text-align: center;
  `;
  const NickUsuario = styled.p`
    color: grey;
    margin: 2px 2px;
    font-size: 0.7rem;
  `;

  const ContainerUsuario = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 36px;
  `;

  const ContainerMensagem = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
    flex-direction: column;
  `;

  const ContainerBotoes = styled.div`
    display: flex;
    align-items: center;
  `;

  const Texto = styled.p`
    color: grey;
    font-size: 0.9rem;
  `;

  const BotaoRepostar = styled.button`
    background-color: #f0e68c;
    border: 2px solid #ffc72c;
    padding: 5px 15px;
    border-radius: 12px;
    margin-right: 10px;
  `;

  const BotaoResponder = styled.button`
    background-color: #0071c5;
    border: 2px solid #004792;
    padding: 5px 15px;
    color: white;
    border-radius: 12px;
  `;

  const Estrela = styled.img`
    width: 20px;
  `;
  const Like = styled.img`
    width: 60px;
  `;
  const Dislike = styled.img`
    width: 60px;
  `;
  return (
    <Container>
      <ContainerUsuario>
        <FotoUsuario src="" />
        <NomeUsuario>Nome do Usuário</NomeUsuario>
        <NickUsuario>@UsuarioTeste</NickUsuario>
        <div>
          <Estrela src="src/img/estrela.png" />
          <Estrela src="src/img/estrela.png" />
          <Estrela src="src/img/estrela.png" />
        </div>
      </ContainerUsuario>

      <ContainerMensagem>
        <Texto>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at
          lobortis dui. Vestibulum et elit turpis. Etiam imperdiet eros nunc.
          Duis et dictum lectus. Phasellus feugiat sodales lectus, eget dapibus
          orci finibus sit amet.{" "}
        </Texto>
        <ContainerBotoes>
          <BotaoRepostar>Repostar</BotaoRepostar>
          <BotaoResponder>Responder</BotaoResponder>
          <Dislike src="src/img/dislike.png" />
          <Like src="src/img/like.png" />
        </ContainerBotoes>
      </ContainerMensagem>
    </Container>
  );
}
