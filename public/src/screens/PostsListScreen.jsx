import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Certifique-se de que este caminho está correto
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

const PostsListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p style={{ fontFamily: "sans-serif", fontSize: "42px" }}>Carregando...</p>;
  }

  return (
    <Container>
      {posts.length === 0 ? (
        <p style={{ fontFamily: "sans-serif", fontSize: "42px" }}>Nenhum post encontrado</p>
      ) : (
        posts.map((post) => (
          <PostLink key={post.id} to={`/post/${post.id}`}>
            <PostCard post={post} />
          </PostLink>
        ))
      )}
    </Container>
  );
};

export default PostsListScreen;
