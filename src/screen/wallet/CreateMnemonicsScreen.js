import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {primaryGradient, white} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import LMBackButton from '../../component/common/LMBackButton';
import {Root} from 'popup-ui';
import WalletModule from '../../module/etherjs/WalletModule';
import {responsiveSpacing} from '../../helpers/Utilities';
import images from '../../assets/images';
import CommonStyles from '../../CommonStyles';
import GradientText from '../../component/common/GradientText';
import AppButton from '../../component/common/AppButton';
export default function CreateMnemonicsScreen({navigation, route, lang}) {
  const {password} = route?.params;
  const [mnemonics, setMnemonics] = useState([]);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    onPressReveal();
  }, []);
  const onPressReveal = () => {
    const mnemonics = WalletModule.generateMnemonics();
    setMnemonics(mnemonics);
  };

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{paddingHorizontal: responsiveSpacing(50), flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 70,
              paddingBottom: 20,
            }}>
            <View style={{marginVertical: responsiveSpacing(10)}}>
              <View style={{height: 35, width: 150}}>
                <Image
                  style={{
                    flex: 1,
                    height: undefined,
                    width: undefined,
                    resizeMode: 'center',
                  }}
                  source={images.step2}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginTop: responsiveSpacing(10),
              }}>
              <GradientText
                style={[
                  CommonStyles.fontMedium500,
                  {fontSize: responsiveSpacing(20)},
                ]}
                colors={primaryGradient}
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}>
                {`${'Write '}`}
              </GradientText>
              <Text
                style={[
                  {fontSize: responsiveSpacing(20), color: 'white'},
                  CommonStyles.fontMedium500,
                ]}>
                down
              </Text>
              <GradientText
                style={[
                  CommonStyles.fontMedium500,
                  {fontSize: responsiveSpacing(20)},
                ]}
                colors={primaryGradient}
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}>
                {`${' Secret Recovery'}`}
              </GradientText>
            </View>
            <View>
              <GradientText
                style={[
                  CommonStyles.fontMedium500,
                  {fontSize: responsiveSpacing(20)},
                ]}
                colors={primaryGradient}
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}>
                {`${'Phrase'}`}
              </GradientText>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveSpacing(10),
              }}>
              <Text
                style={[
                  {
                    color: 'white',
                    textAlign: 'center',
                    fontSize: responsiveSpacing(13),
                  },
                  CommonStyles.fontRegular400,
                ]}>
                This your secret Recovery Phrase. Write it down on a paper and
                keep it in a safe place. You’ll be asked to re-eter this phrase
                on the next step.
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              // justifyContent: 'center',
              // alignItems: 'center',
              // alignContent: 'center',
            }}>
            <FlatList
              style={{flex: 1}}
              numColumns={2}
              data={mnemonics}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: responsiveSpacing(10),
                      paddingHorizontal: responsiveSpacing(15),
                      paddingVertical: responsiveSpacing(15),
                      backgroundColor: 'rgba(255,255,255, 0.1)',
                      marginVertical: responsiveSpacing(7),
                      borderRadius: 5,
                    }}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'white'}}>{index + 1}</Text>
                        </View>
                        <View style={{flex: 2}}>
                          <Text style={{color: 'white'}}>{item}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={{marginHorizontal: 20, marginBottom: 20}}>
          <AppButton
            onPress={() => {
              navigation.navigate('ConfirmMnemonicsScreen' , {
                password,
                mnemonics
              });
            }}>
            Proceed
          </AppButton>
        </View>
      </View>
    </Root>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  topBackBg: {
    height: 250,
    width: '100%',
    backgroundColor: '#F0B90B',
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
  },
  layerContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    width: '100%',
    marginBottom: 10,
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnemonicsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  overlayMnemonics: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnemonic: {
    margin: 5,
    width: 130,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#f5bd00',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
