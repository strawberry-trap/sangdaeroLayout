import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

let title = "";
let memo = "";
export default class RequestScreen extends React.Component {

  state = {
    index: 1,
    isDataLoaded: false,
    isDatePickerVisible: false, // date picker
    isStartTime: false, // since I need to save both startTime and endTime with one picker, use a flag to seperate them

    // data to send to the web server
    startTime: null,
    endTime: null,
    startTimeDataForServer: null,
    endTimeDataForServer: null,
    test: null,
    interestCategoryId: 0,
  }

  constructor(props) {
    super(props);
    console.log('Request Screen');

    var date = new Date();

    this.state = {
      test: props.route.params.test,
      categoryId: props.route.params.categoryId,
      categoryName: props.route.params.categoryName,

      startTime: date,
      endTime: date,
    }
  }

  handleConfirm = (date) => {
    if (this.state.isStartTime == true) {
      this.setState({ startTime: date, startTimeDataForServer: this.parseDateForServer(date) });

      if (this.state.startTime > this.state.endTime) {
        this.setState({ endTime: this.state.startTime, endTimeDataForServer: this.state.startTimeDataForServer });
      }
    } else {
      this.setState({ endTime: date, endTimeDataForServer: this.parseDateForServer(date) });

      if (this.state.startTime > this.state.endTime) {
        this.setState({ startTime: this.state.endTime, startTimeDataForServer: this.state.endTimeDataForServer });
      }
    }
    this.hideDatePicker();
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  parseDate(newDate) {
    var year = this.addZero(newDate.getFullYear());
    var month = this.addZero(newDate.getMonth() + 1);
    var date = this.addZero(newDate.getDate());
    var day = newDate.getDay();

    switch (day) {
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

    return year + "/" + month + "/" + date + "(" + day + ") " + ampm + " " + hour + ":" + minute;
  }

  parseDateForServer(newDate) {

    var year = this.addZero(newDate.getFullYear());
    var month = this.addZero(newDate.getMonth() + 1);
    var date = this.addZero(newDate.getDate());
    var hour = newDate.getHours();
    hour = this.addZero(hour);
    var minute = this.addZero(newDate.getMinutes());

    // YYYY-MM-DD HH:MM:00 (seconds are fixed to '00')
    var startTimeForServer = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":00";
    return startTimeForServer;
  }

  addZero(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  createTwoButtonAlert = () => {
    Alert.alert(
      "새로운 봉사활동을 요청합니다",
      "요청하시겠습니까?",
      [
        {
          text: "신청", onPress: () => {
            let data = this.generateDataToSend(); // generate data
            this.sendRequestToServer(data); // send the generated data to server.
          }
        },
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  }

  generateDataToSend() {

    let data = {
      id: this.state.categoryId,
      name: global.googleUserName,
      email: global.googleUserEmail,
      startTime: this.state.startTimeDataForServer,
      endTime: this.state.endTimeDataForServer,
      title: this.title,
      memo: this.memo,
    }

    // data validation check
    /*
      I divided the variable for user-input and server-sending data.
      This is due to the setState() issue. When only using this.state variables, the updated variables
      are not updated when sending to the server. Hence, I divided two types of variable that works just the same.
      "data" is the actual data to send to the server, and this.state's 'startTimeDataForServer' and 'endTimeDataForServer'
      are the data that changes when user chooses each time. So when checking null in user input, I first check this.state's variables
      then assign default values to "data", that is to be sent to the server.
    */
    if (this.title == undefined) {
      data["title"] = "제목이 입력되지 않았습니다.";
    }
    if (this.memo == undefined) {
      data["memo"] = "메모가 입력되지 않았습니다.";
    }
    if (this.state.startTimeDataForServer == undefined) { data['startTime'] = '0000-00-00 00:00:00'; }
    if (this.state.endTimeDataForServer == undefined) { data['endTime'] = '0000-00-00 00:00:00'; }

    return data;
  }

  // this method will post request creating a new 'volunteer' activity request.
  async sendRequestToServer(data) {

    const url = 'http://saevom06.cafe24.com/requestdata/newRegister';
    return await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(() => {
      Alert.alert("등록 완료", "새로운 봉사활동 요청이 등록 되었습니다!");
    });
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            date={this.state.startTime}
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
              onChangeText={(input) => { this.title = input; }}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>카테고리</Text>

            <Text style={styles.text} name='category'>
              {this.state.categoryName}
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>활동시간</Text>
            <View style={styles.time}>
              <Text style={styles.text}>시작시간</Text>
              <TouchableOpacity
                onPress={() => { this.setState({ isStartTime: true, isDatePickerVisible: true }) }
                }>
                <Text style={styles.date}>{this.parseDate(this.state.startTime)}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <Text style={styles.text}>종료시간</Text>
              <TouchableOpacity
                onPress={() => { this.setState({ isStartTime: false, isDatePickerVisible: true }) }
                }>
                <Text style={styles.date}>{this.parseDate(this.state.endTime)}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.title}>지원자</Text>
            <Text style={styles.text}>
              {global.googleUserName}
            </Text>
          </View>
          <View style={styles.list}>
            <View>
              <Text style={styles.title}>메모</Text>
            </View>
            <Input
              name='memo'
              placeholder='메모를 입력하세요'
              onChangeText={(input) => { this.memo = input; }}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => this.createTwoButtonAlert()}>
          <Text style={styles.button}>
            요청하기
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
    flex: 1,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#FFF',
    marginBottom: 25,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 25,
    elevation: 2,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    fontSize: 15,
    textAlignVertical: 'center',
  },
  time: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  timeList: {
    padding: 5,
  },
  date: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
    fontSize: 15,
    textAlignVertical: 'center',
  },
  button: {
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: 'rgb(29,140,121)',
    borderRadius: 50,
    padding: 8,
  }
});