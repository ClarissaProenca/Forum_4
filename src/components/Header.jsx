import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: #3f51b5;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #ffeb3b;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Meu Fórum</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/new-post">Novo Post</NavLink>
        <NavLink to="/login">Login</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
