import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

import LoginScreen from '../screens/Login/LoginScreen';
import HomeStackScreen from '../screens/Home/HomeStackScreen'
import ActivityScreen from '../screens/Activity/ActivityScreen';
import BoardScreen from '../screens/Board/BoardScreen';
import RequestScreen from '../screens/Activity/RequestScreen';
import BoardDetailScreen from '../screens/Board/BoardDetailScreen';
import MypageScreen from '../screens/Mypage/MypageScreen';
import BoardStackScreen from '../screens/Board/BoardStackScreen';
import ActivityStackScreen from '../screens/Activity/ActivityStackScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

/*
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerLeft: () => (
      <View style={styles.leftIconContainer}>
        <TabBarIcon name='ios-menu'/>
      </View>
    ),
    headerRight: () => (
      <View style={styles.rightIconContainer}>
        <TabBarIcon name='ios-person-add'/>
        <TabBarIcon name='ios-notifications'/>
      </View>
    )
  });
  */

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: 'rgb(1, 192, 99)',
        inactiveTintColor: 'gray',
      }}
      >
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityStackScreen}
        options={{
          title: '요청하기',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-chatbubbles" />,
        }}
      />
      <BottomTab.Screen
        name="Request"
        component={RequestScreen}
        options={{
          title: '후원하기',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-filing" />,
        }}
      />
      <BottomTab.Screen
        name="Mypage"
        component={MypageScreen}
        options={{
          title: '내정보',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/*
function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Login':
      return '로그인';
    case 'Interest':
      return '관심사 목록';
    case 'Activity':
      return '활동 목록';
    case 'Request':
      return '요청 목록';
    case 'Detail':
      return '활동 내용';
    case 'Mypage':
      return '회원 정보';
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  leftIconContainer: {
    flexDirection: "row",
    justifyContent:'center',
    width: 60,
  },
  rightIconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  }
});