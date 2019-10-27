import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function Input({ style, ...rest }, ref) {
  return (
    <Container style={style}>
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(Input);

Input.propTypes = {
  style: PropTypes.object,
  icon: PropTypes.string,
};
