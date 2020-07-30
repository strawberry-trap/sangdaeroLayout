import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import ActivityScreen from './ActivityScreen';
import ActivityListScreen from './ActivityListScreen';
import ActivityDetailScreen from './ActivityDetailScreen';
import RequestScreen from './RequestScreen';
import ShareProductScreen from './ShareProductScreen';

const ActivityStack = createStackNavigator();

export default function ActivityStackScreen({ navigation, route }) {
  return (
    <ActivityStack.Navigator initialRouteName='활동 목록'
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Home', {screen: '알림', params: {set: true}})}
            style={styles.rightIconContainer}>
            <Ionicons
              name='ios-notifications-outline'
              size={45}
              style={{ marginBottom: -3 }}
              color={'#FFF'}
            />
          </TouchableOpacity>
        ),
        headerBackground: () => (
          <LinearGradient
            colors={['rgb(1, 192, 99)', 'rgb(4, 166, 119)']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerLeft: null,
        headerTintColor: '#FFF',
        headerTitleStyle: {fontSize:30, fontWeight:'bold'}
      }}
    >
      <ActivityStack.Screen name='활동 목록' component={ActivityListScreen} />
      <ActivityStack.Screen name='관심사 목록' component={ActivityScreen} />
      <ActivityStack.Screen name='활동 내용' component={ActivityDetailScreen} />
      <ActivityStack.Screen name='요청하기' component={RequestScreen} />
      <ActivityStack.Screen name='물건 나눔' component={ShareProductScreen} />

    </ActivityStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  rightIconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 80,
  }
});