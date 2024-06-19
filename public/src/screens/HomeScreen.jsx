import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import Loading from '../components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("likes", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Title style={{color: 'white'}}>Top 5 Posts Mais Curtidos</Title>
      <PostsContainer>
        {posts.map((post) => (
          <PostLink key={post.id} to={`/post/${post.id}`}>
            <PostCard post={post} />
          </PostLink>
        ))}
      </PostsContainer>
    </Container>
  );
};

export default HomeScreen;
