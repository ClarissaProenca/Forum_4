import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #e3f2fd;
  width: 60%

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CenteredLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handleLike = async (id) => {
    try {
      const postRef = doc(db, "posts", id);
      const post = posts.find((post) => post.id === id);
      if (!post) {
        console.error(`Post not found for id: ${id}`);
        return;
      }

      await updateDoc(postRef, {
        likes: (post.likes || 0) + 1,
      });
      setPosts(posts.map((post) => (post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post)));
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

  const handleDislike = async (id) => {
    try {
      const postRef = doc(db, "posts", id);
      const post = posts.find((post) => post.id === id);
      if (!post) {
        console.error(`Post not found for id: ${id}`);
        return;
      }

      await updateDoc(postRef, {
        dislikes: (post.dislikes || 0) + 1,
      });
      setPosts(posts.map((post) => (post.id === id ? { ...post, dislikes: (post.dislikes || 0) + 1 } : post)));
    } catch (error) {
      console.error("Error disliking post: ", error);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate('/new-post'),
    onSwipedRight: () => navigate('/posts'),
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container {...handlers}>
      {posts.length === 0 ? (
        <p>Não há posts em nosso site atualmente</p>
      ) : (
        posts.map((post) => (
          <CenteredLink key={post.id} to={`/post/${post.id}`}>
            <PostCard
              post={post}
              onDelete={() => handleDelete(post.id)}
              onLike={() => handleLike(post.id)}
              onDislike={() => handleDislike(post.id)}
            />
          </CenteredLink>
        ))
      )}
    </Container>
  );
};

export default PostsListPage;
