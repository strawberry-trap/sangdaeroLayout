import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, ListItem, Card, Button } from 'react-native-elements';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import TabBarIcon from '../../components/TabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';

import MypageScreen from './MypageScreen';
import ConfigScreen from './ConfigScreen';

const MypageStack = createStackNavigator();

export default function MypageStackScreen({ navigation, route }){
    return(
        <MypageStack.Navigator initialRouteName='내 정보'
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
            <MypageStack.Screen name='내 정보' component={MypageScreen} />
            <MypageStack.Screen name='설정' component={ConfigScreen} />
            
        </MypageStack.Navigator>
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