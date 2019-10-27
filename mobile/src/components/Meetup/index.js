import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  SubContainer,
  Title,
  MenuInfo,
  Info,
  InfoText,
  Button,
  ButtonText,
} from './styles';

export default function Meetup({ data, onFunction, textButton, id }) {
  const dateFormatted = useMemo(
    () =>
      format(parseISO(data.date), "dd 'de' MMMM', às 'HH'h", { locale: pt }),
    [data]
  );

  return (
    <Container>
      <Banner
        source={{
          uri: data.file
            ? data.file.url
            : `https://api.adorable.io/avatar/50/${data.file.name}.png`,
        }}
      />

      <SubContainer>
        <Title>{data.title}</Title>

        <MenuInfo>
          <Info>
            <Icon name="event" size={20} color="#aaa3ab" />
            <InfoText>{dateFormatted}</InfoText>
          </Info>

          <Info>
            <Icon name="location-on" size={20} color="#aaa3ab" />
            <InfoText>{data.location}</InfoText>
          </Info>

          <Info>
            <Icon name="person" size={20} color="#aaa3ab" />
            <InfoText>Organizador: {data.organizer.name}</InfoText>
          </Info>
        </MenuInfo>

        <Button onPress={() => onFunction(id)} disabled={data.past}>
          <ButtonText>{textButton}</ButtonText>
        </Button>
      </SubContainer>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.object,
  onFunction: PropTypes.func,
  textButton: PropTypes.string,
  id: PropTypes.number,
};
