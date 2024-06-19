import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomeScreen from "./screens/HomeScreen";
import PostsListPage from "./screens/PostsListPage";
import CreatePost from "./screens/CreatePost";
import EditPost from "./screens/EditPost";
import PostDetailPage from "./screens/PostDetailPage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Header from "./components/Header";

const Content = styled.div`
  padding: 20px;
  background-color: #e3f2fd;
  min-height: 100vh;
  margin-top: 80px;

  @media (max-width: 768px) {
    padding: 10px;
    margin-top: 100px;
  }
`;

export default function App() {
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/posts" element={<PostsListPage />} />
          <Route path="/new-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Content>
    </>
  );
}
