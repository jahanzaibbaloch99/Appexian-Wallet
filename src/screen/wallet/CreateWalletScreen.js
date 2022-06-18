import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {primary} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import LMTextInput from '../../component/common/LMTextInput';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMAlert from '../../component/common/LMAlert';
import {UserAction} from '../../persistent/user/UserAction';
import {Root} from 'popup-ui';
import {useDispatch} from 'react-redux';
import {responsiveSpacing} from '../../helpers/Utilities';
import AppButton from '../../component/common/AppButton';
import images from '../../assets/images';
import LMText from '../../component/common/LMText';
import CommonStyles from '../../CommonStyles';
export default function CreateWalletScreen({navigation, lang}) {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required(lang.pleaseInputPassword)
      .min(8, lang.passwordMustBeAtLeast8Characters),
    confirmPassword: yup
      .string()
      .required(lang.pleaseInputConfirmPassword)
      .oneOf([yup.ref('password'), null], lang.passwordMustMatch),
  });
  const {control, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [securePassword, setSecurePassword] = useState(true);
  const onSubmit = ({password}) => {
    navigation.navigate('CreateMnemonicsScreen', {password});
  };
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  return (
    <Root>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flexGrow: 1,
              paddingHorizontal: responsiveSpacing(20),
            }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{height: 300, width: 300}}>
                <Image
                  style={{flex: 1, height: undefined, width: undefined}}
                  source={images.apexianlogo}
                  resizeMode="contain"
                />
              </View>
              <View>
                <LMText
                  lableStyle={[
                    CommonStyles.fontMedium500,
                    {fontSize: 22, color: 'white'},
                  ]}>
                  Create A New Wallet
                </LMText>
              </View>
            </View>
            <View style={{flex: 2}}>
              <View>
                <View style={styles.row}>
                  <Controller
                    control={control}
                    render={({onChange, onBlur, value}) => (
                      <LMTextInput
                        label={lang.password}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        style={{borderRadius: 10}}
                        error={errors['password']}
                        secureTextEntry={securePassword}
                        placeholder={lang.password}
                        labelStyle={{color: 'white'}}
                        hint={lang.clickHereToShowYourPassword}
                        onHintPress={async () => {
                          setSecurePassword(false);
                          await sleep(1000);
                          setSecurePassword(true);
                        }}
                      />
                    )}
                    name="password"
                    defaultValue=""
                  />
                </View>
              </View>

              <View>
                <View style={styles.row}>
                  <Controller
                    control={control}
                    render={({onChange, onBlur, value}) => (
                      <LMTextInput
                        label={lang.confirmPassword}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        style={{borderRadius: 10}}
                        error={errors['confirmPassword']}
                        secureTextEntry={securePassword}
                        placeholder={lang.confirmPassword}
                        labelStyle={{color: 'white'}}
                        hint={lang.clickHereToShowYourPassword}
                        onHintPress={async () => {
                          setSecurePassword(false);
                          await sleep(5000);
                          setSecurePassword(true);
                        }}
                      />
                    )}
                    name="confirmPassword"
                    defaultValue=""
                  />
                </View>
              </View>

              <View style={{marginVertical: 20}}>
                <AppButton onPress={handleSubmit(onSubmit)}>
                  <Text>Confirm</Text>
                </AppButton>
              </View>
              <View>
                <View>
                  <LMText lableStyle={{fontSize: 18, textAlign: 'center'}}>
                    By Clicking Confirm, You have agree to our Term of Use
                  </LMText>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  row: {
    // marginVertical: 10,
  },
});
