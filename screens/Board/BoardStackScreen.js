import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Card } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../../components/TabBarIcon';

import BoardScreen from './BoardScreen';
import BoardDetailScreen from './BoardDetailScreen';

const BoardStack = createStackNavigator();

export default function BoardStackScreen(){
    return(
        <BoardStack.Navigator
            screenOptions={{
                headerRight: () => (
                    <View style={styles.rightIconContainer}>
                        <TabBarIcon name='ios-person-add'/>
                        <TabBarIcon name='ios-notifications'/>
                    </View>
                )
            }}
        >
            <BoardStack.Screen name='Board' component={BoardScreen} />
            <BoardStack.Screen name='Detail' component={BoardDetailScreen} />
        </BoardStack.Navigator>
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