import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Input } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import TabBarIcon from '../../components/TabBarIcon';
/*
function _fetchPost() {
  var url = 'http://saevom06.cafe24.com/test/get';
  try {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',

      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue'
      }),
    });
    console.log(url);
    console.warn('fetch successful');
  } catch (e) {
    console.warn('fetch failed');
    //console.warn(e);
  }
}
*/


export default class RequestScreen extends React.Component {

  createTwoButtonAlert = () =>
  Alert.alert(
    "한동대학교 청소",
    "요청하기",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => Alert.alert("요청되었습니다") }
    ],
    { cancelable: false }
  );

  state = {
    index: '1',
  };

  _fetchPost(url, data) {
    // var url = 'http://saevom06.cafe24.com/test/post';
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',
  
        body: JSON.stringify(data),
      });
      console.log(url);
      console.warn('fetch successful', url);
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.title}>
          <Text style={styles.postTitle}>제목</Text>
        </View>
        <Input
          name='title'
          placeholder='제목'
          leftIcon={
            <TabBarIcon name="ios-clipboard"/>
          }
        />
        <View style={styles.category}>
          <Text style={styles.postCategory}>카테고리</Text>
        </View>
        
        <Picker
          name='category'
          selectedValue={this.state.index}
          style={{height: 50, width: 200}}
          onValueChange={(itemValue) =>
            this.setState({index: itemValue})
          }>
          <Picker.Item label="차량지원" value='1' />
          <Picker.Item label="환경미화" value='2' />
          <Picker.Item label="장보기" value='3' />
          <Picker.Item label="물건 전달" value='4' />
          <Picker.Item label="재능기부" value='5' />
          <Picker.Item label="행사지원" value='6' />
          <Picker.Item label="아동센터" value='7' />
          <Picker.Item label="심리상담" value='9' />
        </Picker>
        <Button
          title='활동 시간'
        />


        <Input
          name='title'
          placeholder='시작 시간 : 2020-06-01 14:00'
          leftIcon={
            <TabBarIcon name="ios-clipboard"/>
          }
        />
        <Input
        name='title'
        placeholder='종료 시간 : 2020-06-01 14:30'
        leftIcon={
          <TabBarIcon name="ios-clipboard"/>
        }
        />
        <Button
          title='지원자'
        />
        <Input
        name='title'
        placeholder='지원자'
        leftIcon={
          <TabBarIcon name="ios-clipboard"/>
        }
        />
        <Button
          title="등록하기"
          onPress={
            ()=>this.createTwoButtonAlert()}
        />
      </ScrollView>
    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
  contentContainer: {
    paddingTop: 0,
    alignItems: 'center',
    padding: 3,
  },
  title:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
  },
  category:{
    flex: 1,
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
  },
  postCategory: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  postTitle: {
    flex: 3,
    alignSelf: 'flex-start'
  },
  content: {
    flex: 3,
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  postContent: {
    backgroundColor: '#999',
    alignSelf: 'center',
  },
  account: {
    flex: 1,
    backgroundColor: '#BBB',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  accountMessage: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#999',
  },
  form: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  formCategory: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#999'
  },
  formTitle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#777'
  },
  formContent: {
    flex: 3,
    alignSelf: 'stretch',
    backgroundColor: '#777'
  },
});