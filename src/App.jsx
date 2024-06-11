import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import PostsListPage from "./screens/PostsListPage";
import CreatePost from "./screens/CreatePost";
import EditPost from "./screens/EditPost";
import PostDetailPage from "./screens/PostDetailPage";
import Login from "./screens/Login";
import Header from "./components/Header";

const Content = styled.div`
  padding: 20px;
  background-color: #e3f2fd;
  min-height: 100vh;
  margin-top: 60px; /* Space for the fixed header */
`;

export default function App() {
  const [postagem, setPostagem] = useState([]);

  function addPost(post) {
    setPostagem([...postagem, post]);
  }

  return (
    <Router>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/posts" element={<PostsListPage />} />
          <Route path="/new-post" element={<CreatePost addPost={addPost} />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Content>
    </Router>
  );
}
