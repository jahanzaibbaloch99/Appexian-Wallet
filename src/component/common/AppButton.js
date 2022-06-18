import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
// import Colors from '../Themes/Colors';
import {primaryGradient} from '../common/LMStyle';
import LinearGradient from 'react-native-linear-gradient';
// import CommonStyles from '../CommonStyles';
import CommonStyles from '../../CommonStyles';
const AppButton = ({
  textStyle,
  onPress,
  children,
  containerStyles,
  disabled,
  iconOnly,
  reverted,
  gradientColor = primaryGradient,
  touchStyle,
  start = {x: 0.5, y: 0.5},
  end = {x: 0.5, y: 0.5},
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    disabled={disabled}
    onPress={onPress}
    style={[
      touchStyle,
      {opacity: disabled ? 0.7 : 1, overflow: 'hidden', borderRadius: 20},
    ]}>
    <LinearGradient
      locations={[0.07, 0.92]}
      // angleCenter={{x: 0.6, y: 0.2}}
      useAngle={true}
      angle={260}
      colors={gradientColor}>
      <View style={[styles.appButtonContainer, containerStyles]}>
        <View>
          {iconOnly ? (
            <Image
              source={iconOnly}
              style={{...styles.appButtonText, height: 20, width: 20}}
            />
          ) : (
            <Text
              style={[
                styles.appButtonText,
                textStyle,
                CommonStyles.fontRegular400,
              ]}>
              {children}
            </Text>
          )}
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});

export default AppButton;
