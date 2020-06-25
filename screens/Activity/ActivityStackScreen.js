import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Card } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../../components/TabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';

import ActivityScreen from './ActivityScreen';
import ActivityListScreen from './ActivityListScreen';
import ActivityDetailScreen from './ActivityDetailScreen';
import RequestScreen from './RequestScreen';

const ActivityStack = createStackNavigator();

export default function ActivityStackScreen(){
    return(
        <ActivityStack.Navigator initialRouteName='관심사 목록'
            screenOptions={{
                headerRight: () => (
                    <View style={styles.rightIconContainer}>
                        <Ionicons
                          name='ios-notifications-outline'
                          size={30}
                          style={{ marginBottom: -3 }}
                          color={'#FFF'}
                        />
                    </View>
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
            <ActivityStack.Screen name='관심사 목록' component={ActivityScreen} />
            <ActivityStack.Screen name='활동 목록' component={ActivityListScreen} />
            <ActivityStack.Screen name='활동 내용' component={ActivityDetailScreen} />
            <ActivityStack.Screen name='요청하기' component={RequestScreen} />
            
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