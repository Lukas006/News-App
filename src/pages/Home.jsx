import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 15px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 18px;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>Willkommen in der mobilen App</h1>
      <p>Dies ist eine Beispiel-App, die wie eine mobile App aussieht.</p>
      <HomeButton to="/profile">Zum Profil</HomeButton>
    </HomeContainer>
  );
};

export default Home;
