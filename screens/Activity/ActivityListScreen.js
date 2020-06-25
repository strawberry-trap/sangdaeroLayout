import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { MonoText } from '../../components/StyledText';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class ActivityListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.route.params.id,
      name: props.route.params.name,
      data: [],
      isLoading: true,
    }

    this.status = [
      '매칭 전',
      '매칭 중',
      '매칭 완료',
      '활동 진행중',
      '활동 완료',
      '취소된 활동'
    ];

  }
  
  componentDidMount() {
    fetch('http://saevom06.cafe24.com/activitydata/getActivities?id='+ this.state.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false,
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

  getImage(props) {
    var path;

    switch(props) {
      case 0:
        path = require('../../assets/images/status_0.png');
        break;
      case 1:
        path = require('../../assets/images/status_1.png');
        break;
      case 2:
        path = require('../../assets/images/status_2.png');
        break;
      case 3:
        path = require('../../assets/images/status_3.png');
        break;
      case 4:
        path = require('../../assets/images/status_4.png');
        break;
      default:
        path = require('../../assets/images/status_5.png');
        break;
    }

    return (
      <View style={styles.imageGroup}>
        <Image
          source={path}
          style={styles.statusButton}
        />
        <Image
          source={require('../../assets/images/right_arrow.png')}
          style={styles.arrow}
        />
      </View>
    )
  }

  createListItem(l, i) {
    if (i == 0) {
      return (
        <ListItem
          key={i}
          title={l.title}
          titleStyle={styles.title}
          rightElement={this.getImage(l.status)}
          onPress={() => this.props.navigation.navigate('활동 내용', {data:this.state.data[i]})}
          containerStyle={styles.listFirst}
        />
      )
    } else {
      return (
        <ListItem
          key={i}
          title={l.title}
          titleStyle={styles.title}
          rightElement={this.getImage(l.status)}
          onPress={() => this.props.navigation.navigate('활동 내용', {data:this.state.data[i]})}
          containerStyle={styles.list}
        />
      )
    }
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('요청하기', {test:'test',categoryName:this.state.name, categoryId:this.state.id})}>
          <Text style={styles.button}>
            새로운 활동 추가하기 +
          </Text>
        </TouchableOpacity>
        <View style={styles.box}>
          <View style={styles.listBox}>
            { isLoading ? <View/> : (
              data.map((l, i) => (
                this.createListItem(l, i)
              ))
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

ActivityListScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 25,
  },
  button: {
    textAlign:'center',
    marginLeft:35,
    marginRight:35,
    marginBottom:25,
    fontSize:16,
    fontWeight:'bold',
    color:'rgb(29,140,121)',
    backgroundColor:'rgb(223,244,243)',
    borderColor:'rgb(29,140,121)',
    borderWidth:1,
    borderRadius:50,
    padding:11,
  },
  box: {
    flex:1,
    padding:10,
    backgroundColor:'#FFF',
    marginTop:15,
    marginBottom:15,
    marginLeft:11,
    marginRight:11,
    borderRadius:15,
    elevation:5,
  },
  listBox: {
    padding: 3,
  },
  listFirst: {
    flex:1,
    padding: 5,
    paddingRight:10,
    paddingBottom: 8,
    marginTop: 3,
    flexDirection:'row',
  },
  list: {
    flex:1,
    padding: 5,
    paddingRight:10,
    paddingBottom: 8,
    marginTop: 3,
    flexDirection:'row',
    borderTopWidth:0.5,
    borderColor:'rgb(220,220,220)',
  },
  title: {
    margin:5,
    fontSize:16,
  },
  subTitle: {
    margin:0,
    padding:0,
    fontSize:12,
    backgroundColor:'#777'
  },
  imageGroup:{
    flexDirection:'row',
  },
  statusButton: {
    width:70,
    height:20,
    resizeMode:'contain',
  },
  arrow: {
    width:12,
    height:20,
    resizeMode:'center',
  }
});
