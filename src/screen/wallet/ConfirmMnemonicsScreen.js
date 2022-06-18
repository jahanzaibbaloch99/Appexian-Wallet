import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  green,
  primary,
  secondaryGradient,
  secondBackground,
} from '../../component/common/LMStyle';
import _ from 'lodash';
import {WalletAction} from '../../persistent/wallet/WalletAction';
import {useDispatch} from 'react-redux';
import LMButton from '../../component/common/LMButton';
import LMBackButton from '../../component/common/LMBackButton';
import {Root, Toast} from 'popup-ui';
import {UserAction} from '../../persistent/user/UserAction';
import LMLoading from '../../component/common/LMLoading';
import LMToast from '../../component/common/LMToast';
import {responsiveSpacing} from '../../helpers/Utilities';
import AppButton from '../../component/common/AppButton';
import images from '../../assets/images';
import CommonStyles from '../../CommonStyles';
import GradientText from '../../component/common/GradientText';
export default function ConfirmMnemonicsScreen({navigation, route, lang}) {
  const dispatch = useDispatch();

  const {mnemonics, password} = route.params;
  const [selectable, setSelectable] = useState(_.shuffle([...mnemonics]));
  const [selected, setSelected] = useState([]);

  const onPressMnemonic = (mnemonic, isSelected) => {
    if (isSelected) {
      setSelectable(selectable.filter(m => m !== mnemonic));
      setSelected(selected.concat([mnemonic]));
    } else {
      setSelectable(selectable.concat([mnemonic]));
      setSelected(selected.filter(m => m !== mnemonic));
    }
  };
  const renderMnemonic = (mnemonic, index, selected) => (
    <TouchableOpacity
      style={styles.mnemonic}
      key={index}
      onPress={() => {
        onPressMnemonic(mnemonic, selected);
      }}>
      <View style={{width: '80%'}}>
        <Text style={{textAlign: 'left'}}>
          {index + 1}. {mnemonic}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const renderSelectableMnemonic = (mnemonic, index, selected) => (
    <TouchableOpacity
      style={styles.selectableMnemonic}
      key={index}
      onPress={() => {
        onPressMnemonic(mnemonic, selected);
      }}>
      <Text>{mnemonic}</Text>
    </TouchableOpacity>
  );
  const renderSelected = () => (
    <View style={styles.mnemonicsContainer}>
      {selected.map((mnemonic, index) => {
        return renderMnemonic(mnemonic, index, false);
      })}
    </View>
  );

  const renderSelectable = () => (
    <View style={styles.selectableMnemonicsContainer}>
      {selectable.map((mnemonic, index) => {
        return renderSelectableMnemonic(mnemonic, index, true);
      })}
    </View>
  );
  const isValidSequence = () => {
    return _.isEqual(mnemonics, selected);
  };
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  return (
    <Root>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'space-between',
            flexGrow: 1,
          }}>
          <View style={{paddingHorizontal: responsiveSpacing(50), flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: responsiveSpacing(70),
                paddingBottom: responsiveSpacing(20),
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
                    source={images.step3}
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
                <Text
                  style={[
                    {fontSize: responsiveSpacing(20), color: 'white'},
                    CommonStyles.fontMedium500,
                  ]}>
                  Enter your Secret
                </Text>
                <GradientText
                  style={[
                    CommonStyles.fontMedium500,
                    {fontSize: responsiveSpacing(20)},
                  ]}
                  colors={secondaryGradient}
                  end={{x: 1, y: 0}}
                  start={{x: 0, y: 0}}>
                  {`${' Recovery'}`}
                </GradientText>
              </View>
              <View>
                <GradientText
                  style={[
                    CommonStyles.fontMedium500,
                    {fontSize: responsiveSpacing(20)},
                  ]}
                  colors={secondaryGradient}
                  end={{x: 1, y: 0}}
                  start={{x: 0, y: 0}}>
                  Phrase
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
                  Enter your 12 phrase code you just got from your wallet.
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
              <View>{renderSelected()}</View>
            </View>
          </View>
          <View style={styles.row}>{renderSelectable()}</View>
          <View
            style={{
              marginHorizontal: responsiveSpacing(20),
              marginVertical: responsiveSpacing(20),
            }}>
            <AppButton
              onPress={async () => {
                if (isValidSequence()) {
                  LMToast.error({
                    title: lang.error,
                    text: lang.yourSeedPhraseOrderIsIncorrect,
                  });
                  return;
                }
                LMLoading.show();
                await sleep(1000);
                dispatch(
                  WalletAction.addFromMnemonic({
                    mnemonics,
                    name: lang.defaultWalletName,
                    isMain: true,
                  }),
                ).then(response => {
                  console.log(response, 'RESPONSe');
                  const {success, data} = response;
                  if (success) {
                    dispatch(
                      UserAction.signUp({
                        password: password,
                        walletAddress: data.address,
                        secretRecoveryPhrase: mnemonics.join(' '),
                      }),
                    );
                  }
                  LMLoading.hide();
                });
              }}>
              Secure Your Wallet
            </AppButton>
          </View>
        </ScrollView>
      </View>
      {/* <View style={styles.layerContainer}>
          <View style={styles.contentContainer}>{renderSelected()}</View>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>{renderSelectable()}</View>
            <View style={styles.row}>
              <LMButton
                label={lang.continue}
                onPress={async () => {
                  if (isValidSequence()) {
                    LMToast.error({
                      title: lang.error,
                      text: lang.yourSeedPhraseOrderIsIncorrect,
                    });
                    return;
                  }
                  LMLoading.show();
                  await sleep(1000);
                  dispatch(
                    WalletAction.addFromMnemonic({
                      mnemonics,
                      name: lang.defaultWalletName,
                      isMain: true,
                    }),
                  ).then(response => {
                    const {success, data} = response;
                    if (success) {
                      dispatch(
                        UserAction.signUp({
                          password: password,
                          walletAddress: data.address,
                          secretRecoveryPhrase: mnemonics.join(' '),
                        }),
                      );
                    }
                    LMLoading.hide();
                  });
                }}
              />
            </View>
          </View>
        </View> */}
      {/* </SafeAreaView> */}
    </Root>
  );
}
const styles = StyleSheet.create({
  selectableMnemonicsContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  selectableMnemonic: {
    width: 70,
    height: 35,
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 2,
  },

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
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
