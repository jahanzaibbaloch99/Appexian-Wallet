import React from 'react';
import {StyleSheet, Text} from 'react-native';
import CommonStyles from '../../CommonStyles';

const LMText = ({children, lableStyle, ...rest}) => {
  return (
    <Text {...rest} style={[CommonStyles.fontMedium500,lableStyle]}>
      {children}
    </Text>
  );
};
export default LMText;
