import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import Loading from '../components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  max-width: 600px;
  margin-bottom: 10px;
  display: flex; /* Adicionado */
  justify-content: center; /* Adicionado */
`;

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleLike = async (id) => {
    const postRef = doc(db, "posts", id);
    const post = posts.find(post => post.id === id);
    await updateDoc(postRef, {
      likes: (post.likes || 0) + 1
    });
    setPosts(posts.map(post => post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post));
  };

  const handleDislike = async (id) => {
    const postRef = doc(db, "posts", id);
    const post = posts.find(post => post.id === id);
    await updateDoc(postRef, {
      dislikes: (post.dislikes || 0) + 1
    });
    setPosts(posts.map(post => post.id === id ? { ...post, dislikes: (post.dislikes || 0) + 1 } : post));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate('/new-post'),
    onSwipedRight: () => navigate('/posts')
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container {...handlers}>
      {posts.map((post) => (
        <PostLink key={post.id} to={`/post/${post.id}`}>
          <PostCard 
            post={post} 
            onEdit={() => handleEdit(post.id)} 
            onDelete={() => handleDelete(post.id)} 
            onLike={() => handleLike(post.id)} 
            onDislike={() => handleDislike(post.id)} 
          />
        </PostLink>
      ))}
    </Container>
  );
};

export default PostsListPage;
