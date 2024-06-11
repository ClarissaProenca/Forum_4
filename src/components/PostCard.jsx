import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 3px solid #3f51b5;
  border-radius: 10px;
  margin: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: #e8eaf6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  margin: 0;
  color: #3f51b5;
`;

const Body = styled.p`
  margin: 0;
  color: #555;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #3f51b5;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: #303f9f;
  }
`;

const PostCard = ({ post, onEdit, onDelete, onLike, onDislike }) => {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Body>{post.body}</Body>
      <Actions>
        <Button onClick={() => onEdit(post.id)}>Editar</Button>
        <Button onClick={() => onDelete(post.id)}>Deletar</Button>
        <Button onClick={() => onLike(post.id)}>
          Curtir ({post.likes || 0})
        </Button>
        <Button onClick={() => onDislike(post.id)}>
          Descurtir ({post.dislikes || 0})
        </Button>
      </Actions>
    </Container>
  );
};

export default PostCard;
