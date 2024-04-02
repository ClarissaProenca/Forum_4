import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const MenuLogo = styled.h1`
  margin: 0;
`;

const MenuLinks = styled.div`
  display: flex;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
`;

export default function Header() {
  return (
    <MenuContainer>
      <MenuLogo>Logo</MenuLogo>
      <MenuLinks>
        <Link href="#">Link 1</Link>
        <Link href="#">Link 2</Link>
        <Link href="#">Link 3</Link>
      </MenuLinks>
      <SearchContainer>
        <SearchInput type="text" placeholder="Pesquisar..." />
        <SearchIcon style={{ color: "white" }} />
      </SearchContainer>
    </MenuContainer>
  );
}
