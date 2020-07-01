import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'

export default class ActivityListScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Activity List Screen')

    this.state = {
      id: props.route.params.id,
      name: props.route.params.name,
      data: [],
      isLoading: false,
    }

    this.getData();
  }
  
  getData() {
    if (this.state.id == null) {
      var url = 'http://saevom06.cafe24.com/activitydata/getActivitiesForUser?name='+ global.googleUserName + '&email='+global.googleUserEmail;
    } else {
      var url = 'http://saevom06.cafe24.com/activitydata/getActivities?id='+ this.state.id;
    }

    console.log(url);

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false,
      },
    })
    .then((response) => response.json())
    .then((responseInJson) => {
      console.log('Get activity list');
      console.log(responseInJson);
      this.setState({data:responseInJson});
    })
    .catch((e) => console.log(e))
    .finally(() => {
      if (this.state.data.length > 0)
        this.setState({isLoading:true});
    })
  }

  getImage(props) {
    var path;

    // Allocating path as dynamic will cause error
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
      if (this.checkUser(l)) {
        return (
          <View style={styles.listFirst}>
            <ListItem
              key={i}
              title={l.title}
              titleStyle={styles.title}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', {data:this.state.data[i]})}
              containerStyle={styles.roundUserList}
            />
          </View>
        )
      } else {
        return (
          <View style={styles.listFirst}>
            <ListItem
              key={i}
              title={l.title}
              titleStyle={styles.title}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', {data:this.state.data[i]})}
              containerStyle={styles.roundList}
            />
          </View>
        )
      }
    } else {
      if (this.checkUser(l)) {
        return (
          <View style={styles.list}>
            <ListItem
              key={i}
              title={l.title}
              titleStyle={styles.title}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', {data:this.state.data[i]})}
              containerStyle={styles.roundUserList}
            />
          </View>
        )
      } else {
        return (
          <View style={styles.list}>
            <ListItem
              key={i}
              title={l.title}
              titleStyle={styles.title}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', {data:this.state.data[i]})}
              containerStyle={styles.roundList}
            />
          </View>
        )
      }
      
    }
  }

  checkUser(l) {
    var email = global.googleUserEmail;
    for (var i = 0; i < l.activityVolunteers.length; i++) {
      if (email == l.activityVolunteers[i].user.socialId) {
        console.log('user')
        return true;
      }
    }
    for (var i = 0; i < l.activityUsers.length; i++) {
      if (email == l.activityUsers[i].user.socialId) {
        return true;
      }
    }
    return false;
  }

  render() {

    const { data, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {this.state.id != null &&
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('요청하기', {test:'test',categoryName:this.state.name, categoryId:this.state.id})
          }}>
          <Text style={styles.button}>
            새로운 활동 추가하기 +
          </Text>
        </TouchableOpacity>
        }
        <View style={styles.box}>
          <View style={styles.listBox}>
            {isLoading ?
              (data.map((l, i) => (
                this.createListItem(l, i)
              ))
              ) :
              <ListItem
                key={0}
                title='등록된 활동이 없습니다'
                containerStyle={styles.listFirst}
              />}
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 25,
  },
  noActivityList:{
    textAlign:"center",
    fontSize:20,
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
    
  },
  list: {
    borderTopWidth:0.5,
    borderColor:'rgb(220,220,220)',
  },
  roundList: {
    flex:1,
    padding: 5,
    paddingRight:10,
    paddingLeft:10,
    marginTop: 3,
    marginBottom:3,
    flexDirection:'row',
    backgroundColor:'#FFF',
    borderRadius:50
  },
  roundUserList:{
    flex:1,
    padding: 5,
    paddingRight:10,
    paddingLeft:10,
    marginTop: 3,
    marginBottom:3,
    flexDirection:'row',
    backgroundColor:'rgb(223,244,243)',
    borderRadius:50
  },
  title: {
    margin:5,
    fontSize:16,
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
