import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const DashBoard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

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

        <ProvidersList
          data={providers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <UserName>{item.name}</UserName>}
        />
      </Container>
    </>
  );
};

export default DashBoard;
