import React from 'react';
import { Button as RneButton } from 'react-native-elements';

const Button = ({ title, disabled, loading, onPress, ...rest }) => (
  <RneButton
    title={title}
    disabled={disabled}
    loading={loading}
    onPress={onPress}
    {...rest}
  />
);

export { Button };
