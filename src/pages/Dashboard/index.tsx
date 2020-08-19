import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

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
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const DashBoard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const handleNavigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

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
          ListHeaderComponent={
            <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleNavigateToCreateAppointment(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda a sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>8:00 as 18:00</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      </Container>
    </>
  );
};

export default DashBoard;
