import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';

import LoginScreen from '../screens/Login/LoginScreen';
import ActivityScreen from '../screens/Activity/ActivityScreen';
import BoardScreen from '../screens/Board/BoardScreen';
import RequestScreen from '../screens/Activity/RequestScreen';
import BoardDetailScreen from '../screens/Board/BoardDetailScreen';
import MypageScreen from '../screens/Mypage/MypageScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html


  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="로그인"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-heart" />,
        }}
      />
      <BottomTab.Screen
        name="관심사"
        component={ActivityScreen}
        options={{
          title: 'Interest',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-heart" />,
        }}
      />
      <BottomTab.Screen
        name="활동"
        component={BoardScreen}
        options={{
          title: 'Activity',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="요청"
        component={RequestScreen}
        options={{
          title: 'Request',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cash" />,
        }}
      />
      <BottomTab.Screen
        name="활동 내용"
        component={BoardDetailScreen}
        options={{
          title: 'Detail',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cash" />,
        }}
      />
      <BottomTab.Screen
        name="개인"
        component={MypageScreen}
        options={{
          title: 'Mypage',
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
    case 'Home':
      return 'Home Screen';
    case 'Request':
      return 'Request Screen';
    case 'Donation':
      return 'Donation Screen';
    case 'Mypage':
      return 'MyPage Screen';
  }
}
*/