import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Card } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../../components/TabBarIcon';

import ActivityScreen from './ActivityScreen';
import ActivityListScreen from './ActivityListScreen';
import ActivityDetailScreen from './ActivityDetailScreen';
import RequestScreen from './RequestScreen';

const ActivityStack = createStackNavigator();

export default function ActivityStackScreen(){
    return(
        <ActivityStack.Navigator initialRouteName='Interest'
            screenOptions={{
                headerRight: () => (
                    <View style={styles.rightIconContainer}>
                        <TabBarIcon name='ios-person-add'/>
                        <TabBarIcon name='ios-notifications'/>
                    </View>
                )
            }}
        >
            <ActivityStack.Screen name='Interest' component={ActivityScreen} />
            <ActivityStack.Screen name='활동 목록' component={ActivityListScreen} />
            <ActivityStack.Screen name='활동 내용' component={ActivityDetailScreen} />
            <ActivityStack.Screen name='Request' component={RequestScreen} />
            
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
      width: 60,
    },
    rightIconContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 120,
    }
});