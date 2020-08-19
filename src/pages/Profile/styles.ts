import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.ScrollView.attrs({
  flex: 1,
  contentContainerStyle: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
})``;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0 24px;
  text-align: left;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: 93px;
  align-self: center;
`;

export const BacktoSignIn = styled.TouchableOpacity`
  border-top-width: 1px;

  padding: 32px 0 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BacktoSignInText = styled.Text`
  color: #c53030;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
