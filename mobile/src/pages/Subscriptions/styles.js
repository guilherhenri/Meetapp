import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ActivityIndicator = styled.ActivityIndicator`
  margin: auto;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 30, paddingRight: 30 },
})``;
