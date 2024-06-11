    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import styled from "styled-components";

    const Container = styled.div`
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #3f51b5;
      border-radius: 10px;
      background-color: #f5f5f5;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: 'Arial', sans-serif;
    `;

    const Title = styled.h1`
      color: #3f51b5;
    `;

    const Body = styled.p`
      color: #555;
    `;

    const PostDetailPage = () => {
      const { id } = useParams();
      const [post, setPost] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setPost(data);
            setLoading(false);
          });
      }, [id]);

      if (loading) {
        return <p>Carregando...</p>;
      }

      if (!post) {
        return <p>Post não encontrado</p>;
      }

      return (
        <Container>
          <Title>{post.title}</Title>
          <Body>{post.body}</Body>
        </Container>
      );
    };

    export default PostDetailPage;
