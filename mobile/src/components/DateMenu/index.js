import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, Menu, MenuText } from './styles';

export default function DateMenu({ date, onChange }) {
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  return (
    <Container>
      <Menu>
        <TouchableOpacity onPress={() => onChange(subDays(date, 1))}>
          <Icon name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <MenuText>{dateFormatted}</MenuText>
        <TouchableOpacity onPress={() => onChange(addDays(date, 1))}>
          <Icon name="chevron-right" size={28} color="#fff" />
        </TouchableOpacity>
      </Menu>
    </Container>
  );
}

DateMenu.propTypes = {
  date: PropTypes.any,
  onChange: PropTypes.func,
};
