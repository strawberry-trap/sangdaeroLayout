import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MonoText } from '../../components/StyledText';

import Dialog from "react-native-dialog";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class HomeScreen extends React.Component {

  state = {
    allActivities: [],
    showList: false,

    // for dialog
    dialogVisible: false, 
    isDatePickerVisible: false, // date picker in dialog
    finalConfirmDialog: false,

    // additional data to send to the web server
    userSelectedActivity: {},
    userSelectedDateTime: null, 
    userSelectedInterestCategory: {},
    serverUrl: '',
    type: 0,
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
 
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleConfirm = (date) => {
    this.setState({ userSelectedDateTime: date});
    this.hideDatePicker();
  };

  fetchPost(url, data) {
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',

        body: JSON.stringify(data),
      }).then((res) => { });
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  }

  constructor(props) {
    super(props);
    this.userMemo='';

    this.status = [
      '매칭 전',
      '매칭 중',
      '매칭 완료',
      '활동 진행중',
      '활동 종료',
      '활동 취소'
    ];
    
    try {
      // get first five activites from server
      let url = "http://saevom06.cafe24.com/activitydata/getTop5Activities"
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {
          console.log(responseInJson);
          this.setState({ allActivities: responseInJson }); // assign data to state variable
          this.setState({ showList: true });
        })
    } catch (e) {
      console.log(e);
    }
  }


  render() {

    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/home_back_test.png')} style={styles.background}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title style={{ color: '#000' }} children='required'>{this.state.userSelectedActivity.title}</Dialog.Title>

              <Dialog.Description>
                {this.status[this.state.userSelectedActivity.status]}
              </Dialog.Description>

              <Dialog.Description>
                {this.state.userSelectedInterestCategory.name}
              </Dialog.Description>

              <Dialog.Description>
                마감 기한 : {this.state.userSelectedActivity.deadline}
              </Dialog.Description>

              <Dialog.Button label="봉사자 지원" title="봉사자 지원" color='rgb(1, 192, 99)' onPress={
                () => {
                  this.fetchPost('http://saevom06.cafe24.com/requestdata/register', {
                    id: this.state.userSelectedActivity.id, // id of the activity that user chose
                    name: 'HyunWoo',//this.props.navigation.getParam('userName', 'invalid name from App: Homescreen.js [in <Dialog>]'),
                    email: '21400045@handong.edu',// this.props.navigation.getParam('userEmail', 'invalid email from App: Homescreen.js [in <Dialog>]'),
                    memo: this.userMemo,
                  });
                  this.setState({ dialogVisible: false });
                }
              } />

              <Dialog.Button label="이용자 지원" title="이용자 지원" color='rgb(1, 192, 99)' onPress={
                () => {
                  this.fetchPost('http://saevom06.cafe24.com/requestdata/newRegister', { //  ** NEED REST CONTROLLER URL **
                    id: this.state.userSelectedActivity.id,
                    name: this.props.navigation.getParam('userName', 'invalid name from App: Homescreen.js [in <Dialog>]'),
                    email: this.props.navigation.getParam('userEmail', 'invalid email from App: Homescreen.js [in <Dialog>]'),
                    memo: this.userMemo,
                  });
                  this.setState({ dialogVisible: false });
                }
              } />
              <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />
            </Dialog.Container>
              <View style={styles.topSpace}>
                <Text style={styles.topText}>환영합니다</Text>
                <Text style={styles.topText}>{global.googleUserName}님</Text>
              </View>
              <View style={styles.box}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>최근 활동 목록</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen : '관심사 목록', intial : false})}>
                    <Text style={styles.titleButton}>전체보기</Text>
                  </TouchableOpacity>
                </View>

                <SafeAreaView style={styles.listBox}>
                  <FlatList
                    data={this.state.allActivities}
                    renderItem={
                      ({ item }) => (
                        <View style={styles.list}>
                          <TouchableOpacity
                            onPress={() => {
                              // this.props.navigation.navigate('ActivityListScreen', {data: item}); // code for sending selected data when navigating
                              this.setState({userSelectedActivity:item});
                              this.setState({userSelectedInterestCategory:item.interestCategory});
                              this.setState({ dialogVisible: true });
                            }}
                          >
                              <Text style={styles.item}>{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    }
                    keyExtractor={(item) => item.id.toString()}
                  >
                  </FlatList>
              </SafeAreaView>
            </View>
            <View style={styles.box}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>최근 활동 목록</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen : '관심사 목록', intial : false})}>
                    <Text style={styles.titleButton}>전체보기</Text>
                  </TouchableOpacity>
                </View>

                <SafeAreaView style={styles.listBox}>
                  <FlatList
                    data={this.state.allActivities}
                    renderItem={
                      ({ item }) => (
                        <View style={styles.list}>
                          <TouchableOpacity
                            onPress={() => {
                              // this.props.navigation.navigate('ActivityListScreen', {data: item}); // code for sending selected data when navigating
                              this.setState({userSelectedActivity:item});
                              this.setState({userSelectedInterestCategory:item.interestCategory});
                              this.setState({ dialogVisible: true });
                            }}
                          >
                              <Text style={styles.item}>{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    }
                    keyExtractor={(item) => item.id.toString()}
                  >
                  </FlatList>
              </SafeAreaView>
            </View>
           
          </ScrollView>
          
        </ImageBackground>
      </View>
    )
  };
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
  },
  topSpace: {
    paddingTop: 20,
    marginBottom: 40,
  },
  topText: {
    color:'#FFF',
    fontSize: 30,
    padding: 5,
    paddingLeft: 20,
  },
  box: {
    flex:1,
    padding:18,
    backgroundColor:'#FFF',
    marginBottom:30,
    marginLeft:11,
    marginRight:11,
    borderRadius:15,
    elevation:5,
  },
  title: {
    padding: 3,
    flexDirection: 'row',
    marginBottom:15,
  },
  titleText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize:19,
    fontWeight:'bold',
    color:'rgb(29,140,121)',
  },
  titleButton: {
    alignSelf: 'flex-end',
    justifyContent:'center',
    color:'rgb(140,140,140)'

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
  item: {
    flex:1,
    fontSize:15,
  }
});
