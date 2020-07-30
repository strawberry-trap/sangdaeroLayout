import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

export default class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Notification Screen')

    this.state = {
      data: [],
      isLoading: false,

      dialogVisible: false,
    }

    this.getNotification();
  }

  componentDidUpdate() {
    if (this.props.route.params?.set) {
      if (this.props.route.params.set) {
        console.log("Get new data");
        this.props.route.params.set = false;
        this.getNotification();
      }
    }
  }

  getNotification() {
    var name = global.googleUserName + "";
    var email = global.googleUserEmail + "";

    fetch('http://saevom06.cafe24.com/notificationdata/getNotificationsForUser?name=' + name + '&email=' + email, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false
      },
    })
      .then((response) => response.json())
      .then((responseInJson) => {
        this.setState({ data: responseInJson });
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (this.state.data.length > 0) {
          this.setState({ isLoading: true });
        } else {
          this.setState({ isLoading: false });
        }
      })
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          {isLoading ? (
            data.map((l, i) => (
              <ListItem
                key={i}
                title={l.message}
                leftElement={
                  <Ionicons
                    name='ios-notifications-outline'
                    size={45}
                    style={{ marginBottom: -3 }}
                    color={'rgb(1, 192, 99)'}
                  />}
                containerStyle={styles.item}
                titleStyle={styles.text}
              />)))
            :
            <View style={styles.emptyItem}>
              <Text style={styles.emptyText}>알림이 없습니다</Text>
            </View>
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
  },
  item: {
    flex: 1,
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderColor: 'rgb(220,220,220)',
  },
  text: {
    fontSize: 30,
    paddingLeft: 8,
    color: '#000',
  },
  emptyItem: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 45,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});
