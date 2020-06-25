import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Card } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../../components/TabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';

import NoticeListScreen from './NoticeListScreen';
import NoticeDetailScreen from './NoticeDetailScreen';

const NoticeStack = createStackNavigator();

export default function NoticeStackScreen({ navigation, route }){
    return(
        <NoticeStack.Navigator initialRouteName='공지 목록'
            screenOptions={{
                headerRight: () => (
                  <TouchableOpacity
                  onPress={() => navigation.navigate('알림')}
                  style={styles.rightIconContainer}>
                      <Ionicons
                        name='ios-notifications-outline'
                        size={30} 
                        style={{ marginBottom: -3 }}
                        color={'#FFF'}
                      />
                  </TouchableOpacity>
                ),
                headerBackground: ()=>(
                  <LinearGradient
                  colors={['rgb(1, 192, 99)', 'rgb(4, 166, 119)']}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  />
                ),
                headerTintColor: '#FFF',
            }}
        >
            <NoticeStack.Screen name='공지 목록' component={NoticeListScreen} />
            <NoticeStack.Screen name='공지 내용' component={NoticeDetailScreen} />            
        </NoticeStack.Navigator>
    )
}

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
      width: 110,
      resizeMode:'contain',
      marginLeft: 25,
    },
    rightIconContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 80,
    }
});