import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import LoginScreen from './screens/Login/LoginScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AgreementScreen from './screens/Login/AgreementScreen';
import NaverLoginScreen from './screens/Login/NaverLoginScreen';
const Stack = createStackNavigator();

export default class App extends React.Component {

  state = {
    appIsReady : false,
  }

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  prepareResources = async() => {
    await performAPICalls();
    await downloadAssets();

    this.setState({ appIsReady : true }, async() => {
      await SplashScreen.hideAsync();
    })
  }

  render() {
    if (!this.state.appIsReady) {
      console.log('Loading');
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Log" component={LoginScreen} />
              <Stack.Screen name="Main" component={BottomTabNavigator} />
              <Stack.Screen name="Agreement" component={AgreementScreen}/>
              <Stack.Screen name="Naver" component={NaverLoginScreen}/>
              
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    }
  }
}

async function performAPICalls() {
  console.log('APIcalls');
}

async function downloadAssets() {
  console.log('Download');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
