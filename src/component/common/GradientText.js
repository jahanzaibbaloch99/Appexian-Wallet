import React from 'react';
import {Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={props.colors} start={props.start} end={props.end}>
        <Text style={[props.style, {opacity: 0}]}>{props.children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
