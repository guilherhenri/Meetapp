import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
`;

export const Banner = styled.Image`
  height: 115px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const SubContainer = styled.View`
  padding: 20px 25px;

  display: flex;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const MenuInfo = styled.View`
  display: flex;

  padding: 4px;
  margin-bottom: 10px;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 10px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: #aaa3ab;
  padding-bottom: 1px;
  margin-left: 10px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  background: #f84c69;
  padding: 10px;
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
