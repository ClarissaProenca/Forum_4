import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  @media (max-width: 950px) {
    justify-content: flex-end;
  }
`;

const MenuLinks = styled.div`
  display: flex;
`;

const Link = styled.a`
  color: black;
  font-size: 0.8rem;
  text-decoration: none;
  margin-left: 20px;
  @media (max-width: 950px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px 40px 5px 10px;
  background-image: url("src/img/lupa.png") no-repeat;
  background-position: right 10px center;
  border-radius: 12px;
  border: 3px solid #febe10;
`;

const SearchIcon = styled.img`
  width: 30px;
`;

export default function Header() {
  return (
    <MenuContainer>
      <SearchContainer>
        <SearchInput type="text" placeholder="Pesquisar..." />
        {/* <SearchIcon src="src/img/lupa.png" /> */}
      </SearchContainer>
      <MenuLinks>
        <Link href="#">TOP TÓPICOS</Link>
        <Link href="#">TOP POSTS</Link>
        <Link href="#">PERFIL</Link>
      </MenuLinks>
    </MenuContainer>
  );
}
