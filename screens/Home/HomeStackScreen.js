import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';


const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation, route }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('알림', {params : {set:true}})}
            style={styles.rightIconContainer}>
            <Ionicons
              name='ios-notifications-outline'
              size={30}
              style={{ marginBottom: -3 }}
              color={'#FFF'}
            />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <Image
            style={styles.leftIconContainer}
            source={require('../../assets/images/logo_1.png')}
          />
        ),
        headerBackground: () => (
          <LinearGradient
            colors={['rgb(1, 192, 99)', 'rgb(4, 166, 119)']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTitle: () => (
          <Text></Text>
        ),
      }}
    >
      <HomeStack.Screen name='홈' component={HomeScreen} />
      <HomeStack.Screen name='알림' component={NotificationScreen} />

    </HomeStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  leftIconContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    width: 110,
    resizeMode: 'contain',
    marginLeft: 25,
  },
  rightIconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 80,
  }
});