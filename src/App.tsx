import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38d' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
