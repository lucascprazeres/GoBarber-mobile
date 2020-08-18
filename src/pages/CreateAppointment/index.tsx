import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { StatusBar, Platform, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Provider } from '../Dashboard';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  available: boolean;
  hour: number;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();

  const { navigate, goBack } = useNavigation();

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProviderId, setSelectedProviderId] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProviderId}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProviderId]);

  const handleNavigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProviderId(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(prevState => !prevState);
  }, []);

  const handleChangeDate = useCallback((_, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProviderId,
        date,
      });

      navigate('AppointmentCreated', {
        date: date.getTime(),
      });
    } catch (err) {
      Alert.alert(
        'Erro ao realizar agendamento',
        'Ocorreu um erro ao realizar o agendamento, tente novamente.',
      );
    }
  }, [navigate, selectedDate, selectedProviderId, selectedHour]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          available,
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          available,
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#28262e" />
      <Container>
        <Header>
          <BackButton onPress={handleNavigateBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <HeaderTitle>Cabeleireiros</HeaderTitle>

          <UserAvatar source={{ uri: user.avatar_url }} />
        </Header>

        <Content>
          <ProvidersListContainer>
            <ProvidersList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={providers}
              keyExtractor={provider => provider.id}
              renderItem={({ item: provider }) => (
                <ProviderContainer
                  onPress={() => handleSelectProvider(provider.id)}
                  selected={provider.id === selectedProviderId}
                >
                  <ProviderAvatar source={{ uri: provider.avatar_url }} />

                  <ProviderName selected={provider.id === selectedProviderId}>
                    {provider.name}
                  </ProviderName>
                </ProviderContainer>
              )}
            />
          </ProvidersListContainer>

          <Calendar>
            <Title>Escolha a data</Title>

            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>
                Selecionar outra data
              </OpenDatePickerButtonText>
            </OpenDatePickerButton>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={selectedDate}
                onChange={handleChangeDate}
              />
            )}
          </Calendar>

          <Schedule>
            <Title>Escolha o horário</Title>

            <Section>
              <SectionTitle>Manhã</SectionTitle>

              <SectionContent>
                {morningAvailability.map(
                  ({ hour, hourFormatted, available }) => {
                    return (
                      <Hour
                        enabled={available}
                        selected={selectedHour === hour}
                        key={hourFormatted}
                        available={available}
                        onPress={() => handleSelectHour(hour)}
                      >
                        <HourText selected={selectedHour === hour}>
                          {hourFormatted}
                        </HourText>
                      </Hour>
                    );
                  },
                )}
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>Tarde</SectionTitle>

              <SectionContent>
                {afternoonAvailability.map(
                  ({ hour, hourFormatted, available }) => {
                    return (
                      <Hour
                        enabled={available}
                        selected={selectedHour === hour}
                        key={hourFormatted}
                        available={available}
                        onPress={() => handleSelectHour(hour)}
                      >
                        <HourText selected={selectedHour === hour}>
                          {hourFormatted}
                        </HourText>
                      </Hour>
                    );
                  },
                )}
              </SectionContent>
            </Section>
          </Schedule>

          <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        </Content>
      </Container>
    </>
  );
};

export default CreateAppointment;
