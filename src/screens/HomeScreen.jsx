import React from "react";
import styled from "styled-components";
import PostsListPage from "./PostsListPage";
import Footer from "../components/Footer";
import Header from "../components/Header";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: "content";
  padding-top: 60px;
`;

const ContentArea = styled.div`
  grid-area: content;
  padding: 20px;
`;

export default function HomeScreen() {
  return (
    <div>
      <Header />
      <GridContainer>
        <ContentArea>
          <PostsListPage />
        </ContentArea>
      </GridContainer>
      <Footer />
    </div>
  );
}
