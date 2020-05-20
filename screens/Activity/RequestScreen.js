import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
          <Picker.Item label="물건 나누기" value='1' />
          <Picker.Item label="차량 지원" value='2' />
          <Picker.Item label="말벗" value='3' />
          <Picker.Item label="청소" value='4' />
          <Picker.Item label="물품 요청" value='5' />
        </Picker>
        <View style={{flexDirection:'row'}}>
          <Text style={{flex:1}}>지원자</Text>
          <Text style={{flex:5}} name='name'>이름</Text>
        </View>
        <Button
          title="요청하기"
          onPress={
            ()=>{
              this._fetchPost('http://saevom06.cafe24.com/test/post', {user:'data'}
            )}}
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