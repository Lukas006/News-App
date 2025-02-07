import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  text-align: center;
`;

const ProfileButton = styled(Link)`
  display: inline-block;
  background-color: #008CBA;
  color: white;
  padding: 15px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 18px;
  margin-top: 20px;

  &:hover {
    background-color: #007B8C;
  }
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <h1>Profilseite</h1>
      <p>Hier ist dein Profil. Viel Spaß beim Erkunden!</p>
      <ProfileButton to="/">Zurück zur Startseite</ProfileButton>
    </ProfileContainer>
  );
};

export default Profile;
