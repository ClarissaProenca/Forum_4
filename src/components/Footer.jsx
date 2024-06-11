import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  background-color: #282c34;
  padding: 5px;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
  fontfamily: "Arial", sans-serif;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <p>© 2023 Meu Blog</p>
    </FooterContainer>
  );
}
