import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const windowHeight = Dimensions.get('window').height;
const responsiveSpacing = num => {
  return RFValue(num, windowHeight);
};

export {responsiveSpacing};