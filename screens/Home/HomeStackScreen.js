import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Card } from 'react-native-elements';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import TabBarIcon from '../../components/TabBarIcon';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './HomeScreen';


const HomeStack = createStackNavigator();

export default function HomeStackScreen(){
    return(
        <HomeStack.Navigator
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
                headerLeft: () => (
                  <Image
                  style={styles.leftIconContainer}
                  source={require('../../assets/images/logo_1.png')}
                  />
                ),
                headerBackground: ()=>(
                  <LinearGradient
                  colors={['rgb(1, 192, 99)', 'rgb(4, 166, 119)']}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  />
                ),
                headerTitle:() => (
                  <Text></Text>
                ),
            }}
        >
            <HomeStack.Screen name='Home' component={HomeScreen} />
            
        </HomeStack.Navigator>
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