import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const DashBoard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  const handleNavigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#28262e" />
      <Container>
        <Header>
          <HeaderTitle>
            Seja bem vindo, {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>

          <ProfileButton onPress={handleNavigateToProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </ProfileButton>
        </Header>
      </Container>
    </>
  );
};

export default DashBoard;
