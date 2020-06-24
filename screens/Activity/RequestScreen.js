import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert, Platform, TouchableHighlightBase } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Input } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import TabBarIcon from '../../components/TabBarIcon';

// date picker
import DateTimePickerModal from "react-native-modal-datetime-picker";

let interestCategory = [];
let title="";

let dataFromActivityScreen;
export default class RequestScreen extends React.Component {

  state = {
    index:1,
    isDataLoaded: false,
    isDatePickerVisible: false, // date picker
    isStartTime:false, // since I need to save both startTime and endTime with one picker, use a flag to seperate them
    startTime: null, // data to send to the web server
    endTime: null, // data to send to the web server

    interestCategoryId : 0,
    interestCategoryName : ""
  }

  constructor(props) {
    super(props);

    this.state ={
      interestCategoryId: props.route.params.interestType,
      interestCategoryName: props.route.params.interestName
    }

    // get interest categories from server
    var url = 'http://saevom06.cafe24.com/interestdata/getAll';
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {

          // save each category
          for (var i = 0; i < responseInJson.length; i++) {
            interestCategory.push(responseInJson[i]);
          }
          this.setState({ isDataLoaded: true });
        })
    } catch (e) {
      this.setState({ isDataLoaded: false });
      console.warn('[failed getting interest categories from server: RequestScreen.js]', e);
    }
  }

    // datetime picker
    _showDatePicker = () => {
      this.setState({ isDatePickerVisible: true });
    };
   
    _hideDatePicker = () => {
      this.setState({ isDatePickerVisible: false });
    };
  
    _handleConfirm = (date) => {
      if (this.state.isStartTime == true){
        this.setState({ startTime: date});
      } else {
        this.setState({endTime: date});
      }

      this._hideDatePicker();
    };

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
    console.log(this.state.interestCategoryId);
    if (this.state.isDataLoaded == true) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View>
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="datetime"
              display="spinner"
              onConfirm={this._handleConfirm}
              onCancel={this._hideDatePicker}
            />
          </View>

          <View style={{ margin: 30 }}>
          </View>

          <View style={styles.roundedBackground}>
            <View style={styles.title}>
              <Text style={styles.postTitle}>제목</Text>
            </View>

            <Input
              name='title'
              placeholder='제목'
              leftIcon={
                <TabBarIcon name="ios-clipboard" />
              }
            />

            <View style={styles.category}>
              <Text style={styles.postCategory}>카테고리</Text>
            </View>

            <Picker
              name='category'
              selectedValue={this.state.index}
              style={{ height: 50, width: 200 }}
              mode='dropdown'
              onValueChange={(itemValue) =>
                this.setState({ index: itemValue })
              }>

              {
                interestCategory.map((interest) => {
                  return (<Picker.Item label={interest.name} value={interest.id} key={interest.id} selectedValue={this.state.interestCategoryId} />)
                })
              }

            </Picker>

            <View style={styles.category}>
              <Text style={styles.postCategory}>활동 시간</Text>
            </View>

            <Button
              title='시작 시간'
              onPress={
                ()=>{
                  this.setState({ isStartTime:true ,isDatePickerVisible: true });
                }
              }
            />

            <Button
              title='종료 시간'
              onPress={
                ()=>{
                  this.setState({ isStartTime:false ,isDatePickerVisible: true });
                }
              }
            />

            <View style={{margin:10}}>
            </View>
          </View>

          <View style={{ margin: 10 }}></View>

          <View>
            <Button
              title="등록하기"
              onPress={
                () => this.createTwoButtonAlert()}
            />
          </View>

        </ScrollView>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text>Data is loading...</Text>
        </View>
      );
    }
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
  roundedBackground: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    paddingTop: 1,
    paddingBottom: 1,
    alignSelf: 'stretch',

    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: { width: 8, height: 8, },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: { elevation: 12, },
    }),

    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },

  title: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
  },
  category: {
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
    alignSelf: 'flex-start',
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