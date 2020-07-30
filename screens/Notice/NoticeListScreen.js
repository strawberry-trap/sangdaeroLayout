import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


export default class NoticeListScreen extends React.Component {

    // constructor
    constructor(props) {
        super(props);
    }
    

    async registerForPushNotification() {

        let token;
    
        // get exisitng permission
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
    
        // if no existing permission, ask one
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
    
        // if user didn't give permission, just return nothing
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
    
        console.log('[[Android device permission status : ', finalStatus,']]');
    
        token = (await Notifications.getExpoPushTokenAsync()).data; // *** ERROR LINE ***
    
        if (token == undefined) {
          console.log('[[undefined token]]');
        } else {
          console.log('[[Android device token fetch : ', token,']]');
        }
    
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        return token;
      }

      async sendPushNotification(expoPushToken) {

        const message = {
          to: 'ExponentPushToken[YadEHlHnt_Ks9qRolTIb9y]',
          sound: 'default',
          title: 'Original Title',
          body: 'And here is the body!',
          data: { data: 'goes here' },
        };
    
        console.log('in sendPush function,', message,);
    
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }
    

    render() {

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={styles.box}>
                    <Button
                        title="토큰 가져오기"
                        onPress={this.registerForPushNotification}
                        >
                    </Button>

                    <Button
                        title="푸시 보내기"
                        onPress={this.sendPushNotification}
                    >

                    </Button>

                </View>

            </ScrollView>
        );
    }
}

NoticeListScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 0,
    },
    button: {
        textAlign: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 25,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(29,140,121)',
        backgroundColor: 'rgb(223,244,243)',
        borderColor: 'rgb(29,140,121)',
        borderWidth: 1,
        borderRadius: 50,
        padding: 11,
    },
    box: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 11,
        marginRight: 11,
        borderRadius: 15,
        elevation: 5,
    },
    listBox: {
        padding: 3,
    },
    listFirst: {
        flex: 1,
        padding: 5,
        paddingRight: 10,
        paddingBottom: 8,
        marginTop: 3,
        flexDirection: 'row',
    },
    list: {
        flex: 1,
        padding: 5,
        paddingRight: 10,
        paddingBottom: 8,
        marginTop: 3,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: 'rgb(220,220,220)',
    },
    title: {
        margin: 5,
        fontSize: 16,
    },
    subTitle: {
        margin: 0,
        padding: 0,
        fontSize: 12,
        backgroundColor: '#777'
    },
    imageGroup: {
        flexDirection: 'row',
    },
    statusButton: {
        width: 70,
        height: 20,
        resizeMode: 'contain',
    },
    arrow: {
        width: 12,
        height: 20,
        resizeMode: 'center',
    }
});
