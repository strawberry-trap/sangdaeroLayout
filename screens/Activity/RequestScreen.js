import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Platform, TouchableHighlightBase } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Input } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import TabBarIcon from '../../components/TabBarIcon';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class RequestScreen extends React.Component {

  state = {
    index:1,
    isDataLoaded: false,
    isDatePickerVisible: false, // date picker
    isStartTime:false, // since I need to save both startTime and endTime with one picker, use a flag to seperate them
    startTime: null, // data to send to the web server
    endTime: null, // data to send to the web server
    test:null,
    interestCategoryId : 0,
  }

  constructor(props) {
    super(props);

    var date = new Date();

    this.state = {
      test: props.route.params.test,
      //interestCategoryId: props.route.params.interestType,
      startTime: this.parseDate(date),
      endTime: this.parseDate(date),
    }
    console.log(this.state.test);
    
  }

  parseDate(newDate) {
    console.log(newDate+"");

    var year = this.addZero(newDate.getFullYear());
    var month = this.addZero(newDate.getMonth() + 1);
    var date = this.addZero(newDate.getDate());
    var day = newDate.getDay();
    
    switch(day) {
      case 0:
        day = "일";
        break;
      case 1:
        day = "월";
        break;
      case 2:
        day = "화";
        break;
      case 3:
        day = "수";
        break;
      case 4:
        day = "목";
        break;
      case 5:
        day = "금";
        break;
      default:
        day = "토";
        break;
    }

    var hour = newDate.getHours();
    var ampm;
    if (hour < 12) {
      ampm = "오전";
    } else {
      ampm = "오후";

      hour = hour - 12;
    }
    hour = this.addZero(hour);
    var minute = this.addZero(newDate.getMinutes());

    return year+"년 "+month+"월 "+date+"일("+day+")"+ampm+" "+hour+"시 "+minute+"분";
  }

  addZero(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

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
      });
      console.log(url);
      console.warn('fetch successful', url);
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleConfirm = (date) => {
    if (this.state.isStartTime == true){
      this.setState({ startTime: this.parseDate(date)});

      if (this.state.startTime > this.state.endTime) {
        this.setState({endTime: this.state.startTime});
      }
    } else {
      this.setState({endTime: this.parseDate(date)});

      if (this.state.startTime > this.state.endTime) {
        this.setState({startTime: this.state.endTime});
      }
    }


    this.hideDatePicker();
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="datetime"
            display="spinner"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />
        </View>
        
        <View style={styles.box}>
          <View style={styles.list}>
            <View>
              <Text style={styles.title}>제목</Text>
            </View>
            <Input
              name='title'
              placeholder='제목을 입력하세요'
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>카테고리</Text>
            
            <Text style={styles.text} name='category'>
              {global.googleUserName}
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>활동시간</Text>
            <View style={styles.time}>
              <TouchableOpacity 
                onPress={()=>{this.setState({ isStartTime:true ,isDatePickerVisible: true })}
              }>
                <Text style={styles.timeText}>시작시간 선택</Text>
              </TouchableOpacity>
              <View style={styles.timeList}>
                <Text style={styles.date}>{this.state.startTime.substring(0, 16)}</Text>
                <Text style={styles.date}>{this.state.startTime.substring(16, 26)}</Text>
              </View>
            </View>
            <View style={styles.time}>
              <TouchableOpacity 
                onPress={()=>{this.setState({ isStartTime:true ,isDatePickerVisible: true })}
              }>
                <Text style={styles.timeText}>종료시간 선택</Text>
              </TouchableOpacity>
              <View style={styles.timeList}>
                <Text style={styles.date}>{this.state.endTime.substring(0, 16)}</Text>
                <Text style={styles.date}>{this.state.endTime.substring(16, 26)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>지원자</Text>
            <Text style={styles.text}>
              {global.googleUserName}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>this.createTwoButtonAlert()}>
          <Text style={styles.button}>
            등록하기
          </Text>
        </TouchableOpacity>
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
    paddingTop: 25,
    padding: 5,
  },
  box: {
    flex:1,
    padding:20,
    paddingTop:30,
    paddingBottom:30,
    backgroundColor:'#FFF',
    marginBottom:25,
    marginLeft:8,
    marginRight:8,
    borderRadius:25,
    elevation:2,
  },
  list: {
    marginTop:10,
    marginBottom:10,
  },
  title:{
    flex: 1,
    flexDirection: 'row',
    padding: 3,
    fontSize:20,
    fontWeight:'bold',
  },
  text: {
    flex:1,
    padding:5,
    paddingLeft:10,
    fontSize:15,
    textAlignVertical:'center',
  },
  time: {
    flex:1,
    flexDirection:'row',
    marginBottom:5,
  },
  timeList: {
    padding:5,
  },
  timeText:{
    flex:1,
    paddingLeft:5,
    paddingRight:5,
    fontSize:15,
    textAlignVertical:'center',
    borderRadius:50,
    color:'#FFF',
    backgroundColor:'rgb(29,140,121)',
  },
  date: {
    flex:1,
    paddingLeft: 5,
    fontSize:15,
    textAlign:'left',
  },
  button: {
    textAlign:'center',
    marginLeft:35,
    marginRight:35,
    fontSize:22,
    color:'#FFF',
    backgroundColor:'rgb(29,140,121)',
    borderRadius:50,
    padding:8,
  }
});