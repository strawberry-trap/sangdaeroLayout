import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MonoText } from '../../components/StyledText';
import { Ionicons } from '@expo/vector-icons';

import Dialog from "react-native-dialog";

export default class ConfigScreen extends React.Component {
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
  };

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
          console.log("then");
          for (var i = 0; i < responseInJson.length; i++) {
            if (responseInJson[i].deadline.charAt(4) != '년') {
              if (responseInJson[i].deadline == null) {
                if (responseInJson[i].startTime == null) {
                  responseInJson[i].deadline = '없음';
                } else {
                  responseInJson[i].deadline = responseInJson[i].startTime;
                }
              }
          
              if (responseInJson[i].deadline != '없음') {
                responseInJson[i].deadline = this.parseDate(responseInJson[i].deadline);
              }
          
              responseInJson[i].startTime = this.parseDate(responseInJson[i].startTime);
              responseInJson[i].endTime = this.parseDate(responseInJson[i].endTime);
            }
          }
          console.log(responseInJson[0]);
          console.log(responseInJson.length);
          this.setState({ allActivities: responseInJson }); // assign data to state variable
          this.setState({ showList: true });
        })
    } catch (e) {
      console.log(e);
    }
  }


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

  parseDate(date) {
    console.log(date);
    var splitDash = date.split('-');
      
    var year = splitDash[0] + '년 ';
    var month = splitDash[1] + '월 ';

    var splitT = splitDash[2].split('T');

    var day = splitT[0] + '일 ';

    var splitColon = splitT[1].split(':');
    var hour = splitColon[0] + '시 ';
    var minute = splitColon[1] + '분';

    return year + month + day + hour + minute;
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: '#000' }} children='required'>{this.state.userSelectedActivity.title}</Dialog.Title>

          <Dialog.Description>
            {this.status[this.state.userSelectedActivity.status]}
          </Dialog.Description>

          <Dialog.Description>
            마감 기한 : {this.state.userSelectedActivity.deadline}
          </Dialog.Description>

          <Dialog.Description>
            관심사 : {this.state.userSelectedInterestCategory.name}
          </Dialog.Description>

          <Dialog.Description>
            시작시간 : {this.state.userSelectedActivity.startTime}
          </Dialog.Description>

          <Dialog.Description>
            종료시간 : {this.state.userSelectedActivity.endTime}
          </Dialog.Description>

          <Dialog.Description>
            장소 : {this.state.userSelectedActivity.place}
          </Dialog.Description>

          <Dialog.Description>
            세부 내용 : {this.state.userSelectedActivity.content}
          </Dialog.Description>

          <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />

        
        </Dialog.Container>

        <View style={styles.box}>
          <View style={styles.listBox}>
            <View style={styles.listFirst}>
              <Text style={styles.item}>위치정보 승인</Text>
              <Ionicons
                name='ios-checkmark-circle'
                size={30} 
                style={{ marginTop: 7 }}
                color={'#000'}
                />
            </View>
            <View style={styles.sub}>
              <Text style={styles.subText}>위치정보 공유 동의 설명</Text>
            </View>
          </View>
          <View style={styles.listBox}>
            <View style={styles.list}>
              <Text style={styles.item}>전화번호 공유 승인</Text>
              <Ionicons
                name='ios-checkmark-circle'
                size={30} 
                style={{ marginTop: 7 }}
                color={'#000'}
                />
            </View>
            <View style={styles.sub}>
              <Text style={styles.subText}>번화번호 공유 동의 설명</Text>
            </View>
          </View>
          <View style={styles.listBox}>
            <View style={styles.list}>
              <Text style={styles.item}>알림</Text>
              <Ionicons
                name='ios-checkmark-circle-outline'
                size={30} 
                style={{ marginTop: 7 }}
                color={'#000'}
                />
            </View>
          </View>
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
    fontSize: 25,
    padding: 0,
    paddingLeft: 20,
  },
  box: {
    flex:1,
    backgroundColor:'rgb(220,220,220)',
    marginBottom:0,
  },
  listBox: {
    backgroundColor:'#FFF',
    paddingRight:25,
    paddingLeft:25,
  },
  listFirst: {
    flex:1,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection:'row',
  },
  list: {
    flex:1,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection:'row',
    borderTopWidth:0.5,
    borderColor:'rgb(220,220,220)',
  },
  item: {
    flex:1,
    fontSize:20,
    paddingTop:8,
    paddingBottom:8,
  },
  sub: {
    paddingBottom: 20,
  },
  subText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize:15,
    fontWeight:'bold',
    color:'#888',
  },
});
