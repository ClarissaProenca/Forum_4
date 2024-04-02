import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer.jsx";
import Posts from "../components/Posts.jsx";
import MenuLateral from "../components/MenuLateral.jsx";
import Header from "../components/Header.jsx";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto;
  grid-template-areas: "menu content";
`;

const MenuArea = styled.div`
  grid-area: menu;
  z-index: -10;
`;

const ContentArea = styled.div`
  grid-area: content;
`;

export default function HomeScreen() {
  return (
    <div>
      {/* <Header /> */}
      <GridContainer>
        <MenuArea>
          <MenuLateral />
        </MenuArea>
        <ContentArea>
          <Posts />
          <Posts />
          <Posts />
          <Posts />
        </ContentArea>
      </GridContainer>
      <Footer />
    </div>
  );
}
