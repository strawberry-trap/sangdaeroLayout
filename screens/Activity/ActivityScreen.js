import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup, ListItem } from 'react-native-elements';

let buttonList = [];
let interestCategory = [];

export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    }
    this.bottomButtons = ['Logout', 'Home', 'Json Data', 'Button Ex'];

    this.fixList =[
      {
        name:'물건 나눔',
        subtitle:'물건 나눔',
        badgeValue:'2',
        badgeStatus:'success'
      },
      {
        name:'요청하기',
        subtitle:'요청하기',
        badgeValue:'4',
        badgeStatus:'success'
      },
      {
        name:'내 활동',
        subtitle:'내 활동',
        badgeValue:'4',
        badgeStatus:'success'
      },
    ]
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
                key={i+2}
                title={l.name}
                chevron={{size:30}}
                onPress={() => this.props.navigation.navigate('활동 목록', {id:l.id})}
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
    backgroundColor: '#rgb(220,220,220)',
  },
  contentContainer: {
    paddingTop: 15,
  },
  item: {
    flex:1,
    padding:18,
    backgroundColor:'#FFF',
    margin:8,
    borderRadius:10,
    height:90,
    elevation:2,
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
    fontSize:25,
    fontWeight:'bold',
    paddingLeft:20,
    color:'rgb(29,140,121)',
  }
});
