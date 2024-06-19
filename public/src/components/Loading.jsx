import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  color: #fff;
  font-size: 1.5rem;
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
`;

const Loading = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

export default Loading;
