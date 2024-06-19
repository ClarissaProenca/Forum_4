import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Card = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  font-family: 'Roboto', sans-serif;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Body = styled.p`
  margin: 10px 0;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #3f51b5;
  color: white;
  cursor: pointer;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #303f9f;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
  }
`;

const EditButton = styled(Link)`
  padding: 10px;
  border-radius: 5px;
  background-color: #3f51b5;
  color: white;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #303f9f;
  }

  @media (max-width: 768px) {
    width: 94,3%;
    margin-bottom: 10px;
  }
`;

const PostCard = ({ post, onDelete, onLike, onDislike }) => (
  <Card>
    {post.imageUri && <Image src={post.imageUri} alt="Post image" />}
    <Title style={{color: 'black'}}>{post.title}</Title>
    <Body style={{color: 'black'}}>{post.description}</Body>
    <ButtonGroup>
      <EditButton style={{color: 'white'}} to={`/edit-post/${post.id}`}>Editar</EditButton>
      <Button style={{ backgroundColor: '#a60a2e' }} onClick={() => onDelete(post.id)}>
        Deletar
      </Button>
      <Button style={{ backgroundColor: '#38c79e' }} onClick={() => onLike(post.id)}>
        <FaThumbsUp style={{ marginRight: '5px' }} />
        Curtir ({post.likes || 0})
      </Button>
      <Button style={{ backgroundColor: '#c73859' }} onClick={() => onDislike(post.id)}>
        <FaThumbsDown style={{ marginRight: '5px' }} />
        Descurtir ({post.dislikes || 0})
      </Button>
    </ButtonGroup>
  </Card>
);

export default PostCard;
