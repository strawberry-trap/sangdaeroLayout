import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup, ListItem } from 'react-native-elements';

let buttonList = [];
let interestCategory = [];

export default class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    }
  }
  
  componentDidMount() {
    fetch('http://saevom06.cafe24.com/interestdata/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false
      },
    })
    .then((response) => response.json())
    .then((responseInJson) => {
      this.setState({data:responseInJson});
      console.log(this.state.data);
    })
    .catch((e) => console.log(e))
    .finally(() => {
      this.setState({isLoading:false});
    })
  }

  

  render() {
    const { data, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          { isLoading ? <View/> : (
            data.map((l, i) => (
              <ListItem
                title={l.name}
                leftElement={
                  <Ionicons
                    name='ios-notifications-outline'
                    size={27} 
                    style={{ marginBottom: -3 }}
                    color={'rgb(1, 192, 99)'}
                  />}
                containerStyle={styles.item}
                titleStyle={styles.text}
              />
            ))
          )}
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingTop: 0,
  },
  item: {
    flex:1,
    backgroundColor:'#FFF',
    borderBottomWidth:0.5,
    borderColor:'rgb(220,220,220)',
  },
  listBox: {
    padding: 3,
  },
  list: {
    flex:1,
    padding: 5,
    paddingRight:10,
    paddingBottom: 8,
    marginTop: 3,
    flexDirection:'row',
    borderBottomWidth:0.5,
    borderColor:'rgb(220,220,220)',
  },
  text: {
    fontSize:17,
    paddingLeft:8,
    color:'#000',
  }
});
