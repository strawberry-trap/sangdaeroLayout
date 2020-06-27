import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

import HomeStackScreen from '../screens/Home/HomeStackScreen'
import ActivityStackScreen from '../screens/Activity/ActivityStackScreen';
import NoticeStackScreen from '../screens/Notice/NoticeStackScreen';
import MypageStackScreen from '../screens/Mypage/MyPageStackScreen';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
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
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityStackScreen}
        options={{
          title: '활동',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-filing" />,
        }}
      />
      <BottomTab.Screen
        name="Notice"
        component={NoticeStackScreen}
        options={{
          title: '공지사항',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-megaphone" />,
        }}
      />
      <BottomTab.Screen
        name="Mypage"
        component={MypageStackScreen}
        options={{
          title: '내정보',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});