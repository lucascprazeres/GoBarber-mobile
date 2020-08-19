import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Platform, FlatList } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  ${() => {
    return Platform.OS === 'ios'
      ? `padding-top: ${getStatusBarHeight() + 24}px`
      : '';
  }}
  background: #28262e;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  color: #f4ede8;
  line-height: 28px;
`;

export const UserName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f99000;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  contentContainerStyle: {
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
})``;

export const ProvidersListTitle = styled.Text`
  margin-bottom: 24px;
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #999591;
  margin-left: 8px;
`;
