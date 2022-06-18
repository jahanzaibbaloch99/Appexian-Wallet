import React from 'react';

import {View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Colors from '../Themes/Colors';
const GradientView = props => {
  return (
    <LinearGradient
      style={props.style}
      colors={props?.gradientColor || Colors.primaryGradient}
      end={{x: 1, y: 0}}
      start={{x: 0, y: 0}}>
      {props.children}
    </LinearGradient>
  );
};

export default GradientView;
