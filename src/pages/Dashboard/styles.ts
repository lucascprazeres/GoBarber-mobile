import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Platform } from 'react-native';

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
