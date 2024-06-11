import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  margin-bottom: 10px;
`;

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      {posts.map((post) => (
        <PostLink key={post.id} to={`/post/${post.id}`}>
          <PostCard post={post} />
        </PostLink>
      ))}
    </Container>
  );
};

export default PostsListPage;
