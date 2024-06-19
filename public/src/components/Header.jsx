import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #3f51b5;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-family: sans-serif;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: ${props => (props.open ? 'flex' : 'none')}; /* Mostrar ou esconder o menu */
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: sans-serif;
  padding: 7px 20px;

  &:hover {
    background-color: #8266c4;
    border-radius: 5px;
  }

  &:active {
    background-color: #5b468c;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const UserName = styled.span`
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff4081;
  color: white;
  cursor: pointer;
  margin-right: 50px;

  &:hover {
    background-color: #c60055;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
  }
`;

const Header = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <Title>Meu Fórum</Title>
      <MenuIcon onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </MenuIcon>
      <NavLinks open={menuOpen}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/new-post">Criar Post</NavLink>
        {user ? (
          <UserContainer>
            <UserName>{user.displayName}</UserName>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </UserContainer>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
