import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import {gray} from './LMStyle';
import LMText from './LMText';

export default function LMTextInput({...rest}) {
  const {error, label, labelStyle, style, hint, onHintPress, editable} = {
    ...rest,
  };
  const isErrorVisible = error !== undefined ? true : false;
  return (
    <View style={styles.container}>
      {label && (
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <LMText lableStyle={[styles.label, labelStyle]}>{label}</LMText>
        </View>
      )}
      <View>
        <TextInput
          placeholderTextColor={'#aaa'}
          {...rest}
          style={[
            styles.textInput,
            style,
            {color: editable ? 'white' : 'white'},
          ]}
        />
      </View>
      {isErrorVisible && (
        <View style={{marginVertical: 5}}>
          <Text style={styles.error}>{error['message']}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    paddingLeft: 5,
    width: '100%',
    height: 70,
    borderRadius: 5,
    backgroundColor: '#333333',
  },
  label: [CommonStyles.fontMedium500, {fontSize: 20}],
  hint: {
    marginLeft: 5,
    color: gray,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 10,
  },
  error: {color: 'red', fontWeight: 'bold'},
});
