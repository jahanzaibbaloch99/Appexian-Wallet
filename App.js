import React from 'react';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import {SafeAreaView} from 'react-native';
import {LogBox, StatusBar} from 'react-native';
import LMLoading from './src/component/common/LMLoading';
import LMAlert from './src/component/common/LMAlert';
import RootStore from './src/module/redux/RootStore';
import LMSelect from './src/component/common/LMSelect';
import ApplicationNavigator from './src/module/navigation/ApplicationNavigator';

enableScreens();
LogBox.ignoreLogs(['Warning: Cannot']);
LogBox.ignoreLogs(['component']);
LogBox.ignoreLogs(['Clipboard']);
LogBox.ignoreLogs(['RCTUI']);
LogBox.ignoreLogs(['[auth/p']);
LogBox.ignoreLogs(['[User cancelled the login process']);
LogBox.ignoreLogs(['Require cycles are allowed']);
LogBox.ignoreLogs(['Setting a timer for a long']);
export default function App() {
  return (
    <Provider store={RootStore}>
      <StatusBar
        hidden={false}
        backgroundColor={'#000'}
        translucent={true}
        barStyle={'light-content'}
      />
      <SafeAreaView style={{flex:1}}>
        <ApplicationNavigator />
        <LMLoading ref={ref => LMLoading.setRef(ref)} />
        <LMSelect ref={ref => LMSelect.setRef(ref)} />
        <LMAlert ref={ref => LMAlert.setRef(ref)} />
      </SafeAreaView>
    </Provider>
  );
}
