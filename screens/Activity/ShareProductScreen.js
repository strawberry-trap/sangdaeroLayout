import * as React from 'react';
import { StyleSheet,Image, Text, View, Alert, TouchableOpacity, Platform, TouchableHighlightBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker'; // for image access
import Dialog from "react-native-dialog";

let formData = new FormData();
const url="http://saevom06.cafe24.com/requestdata/newProduct";

export default class ShareProductScreen extends React.Component {

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
    test: null, // just for test, not used
    interestCategoryId: 0,

    // camera related variables
    image: null, // check if image is selected or not
    isImageConfirmed: false, // if user clicks 'ok' when selecting an image, this variable becomes 'true'
    dialogVisible: false, // showing dialog or not
  }

  constructor(props) {
    super(props);

    var date = new Date();

    this.state = {
      test: props.route.params.test,
      categoryId: props.route.params.id,
      categoryName: props.route.params.name,

      startTime: this.parseDate(date),
      endTime: this.parseDate(date),
    }
  }

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

    return year + "년 " + month + "월 " + date + "일(" + day + ")" + ampm + " " + hour + "시 " + minute + "분";
  }

  parseDateForServer(newDate){
    
    var year = this.addZero(newDate.getFullYear());
    var month = this.addZero(newDate.getMonth() + 1);
    var date = this.addZero(newDate.getDate());
    var day = newDate.getDay();
    var hour = newDate.getHours();
    hour = this.addZero(hour);
    var minute = this.addZero(newDate.getMinutes());

    // YYYY-MM-DD HH:MM:00 (seconds are fixed to '00')
    var startTimeForServer = year+"-"+month+"-"+date+" "+hour+":"+minute+":00";
    return startTimeForServer;
  }

  addZero(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  // image picker
  async takeAndUploadPhotoAsync(url) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    console.log("camera");
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    } else {
      console.log('image selecting error!');
      return;
    }

    console.log(this.state.image);

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    // formData.append('image', { uri: localUri, name: filename, type });

    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('name', global.googleUserName);
    formData.append('email', global.googleUserEmail);
    formData.append('id', this.state.categoryId);
  }

  async pickImageFromGallery(url) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    } else {
      console.log('image selecting error!');
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    // formData.append('image', { uri: localUri, name: filename, type });

    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('name', global.googleUserName);
    formData.append('email', global.googleUserEmail);
    formData.append('id', this.state.categoryId);

  }

  async sendPictureToServer(url){

    // data validation check
    // ** divied user-input data and server-sending data. This logic is explained in line 167 of [RequestScreen.js]
    if (this.title == undefined) {
        this.title = "제목이 입력되지 않았습니다.";
        }
    if (this.memo == undefined) {
        this.memo = "메모가 입력되지 않았습니다.";
        }
    let startTemp = "";
    let endTemp="";

    if (this.state.startTimeDataForServer == undefined) { startTemp='0000-00-00 00:00:00'; }
    else startTemp = this.state.startTimeDataForServer;
    if (this.state.endTimeDataForServer == undefined) { endTemp='0000-00-00 00:00:00';}
    else endTemp = this.state.endTimeDataForServer;
      
    // at the point when the user picked an image, "id, image, name, email" are already appended to formData
    // hence, just add below values
    formData.append('startTime', startTemp);
    formData.append('endTime', endTemp);
    formData.append('title', this.title);
    formData.append('memo', this.memo);

    return await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(() => { console.log('success', url);});
  }

  createTwoButtonAlert = () => {

    Alert.alert(
      "물건 나눔을 등록합니다.",
      "정말 등록하시겠습니까?",
      [
        {
          text: "확인", onPress: () => {

            const url ="http://saevom06.cafe24.com/requestdata/newProduct";

            this.sendPictureToServer(url);
            const result = this.state.isImageConfirmed;

            if (result == true){
              Alert.alert("물건 나눔이 등록되었습니다!\n물건 나눔은 복지관 승인 후 등록됩니다.");
              this.setState({dialogVisible:false});
            } else {
                Alert.alert("사진이 등록되지 않았습니다.\n물건 나눔 사진 선택을 눌러주세요.");
                this.setState({dialogVisible:false});
            }
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
    if (this.state.isStartTime == true) {
      this.setState({ startTime: this.parseDate(date), startTimeDataForServer: this.parseDateForServer(date) });

      if (this.state.startTime > this.state.endTime) {
        this.setState({ endTime: this.state.startTime, endTimeDataForServer:this.state.startTimeDataForServer });
      }
    } else {
      this.setState({ endTime: this.parseDate(date), endTimeDataForServer: this.parseDateForServer(date) });

      if (this.state.startTime > this.state.endTime) {
        this.setState({ startTime: this.state.endTime, startTimeDataForServer: this.state.endTimeDataForServer });
      }
    }
    this.hideDatePicker();
  };

  render() {

    let { image } = this.state;

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

        <Dialog.Container visible={this.state.dialogVisible}>
          {!image &&
            <Dialog.Title style={styles.photoHeader}>
              <Text>사진을 등록해 주세요.</Text>
              </Dialog.Title>
          }
          {image &&
            <Dialog.Title style={styles.photoHeader}><Text>선택한 이미지를 전송하시겠습니까?</Text></Dialog.Title>
          }
          {image &&
            <Image source={{ uri: image }} style={styles.photo} />
          }
          
          {!image &&
            <View style={{flexDirection:'row-reverse', alignItems:'flex-end'}}>
              <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />
              <Dialog.Button title="갤러리에서 선택" label="갤러리에서 선택" color='#000' onPress={() => this.pickImageFromGallery(url)} />
              <Dialog.Button title='지금 사진 촬영' label='지금 사진 촬영' color='#000' onPress={() => this.takeAndUploadPhotoAsync(url)} />
            </View>
          }
          {image &&
            <View style={{flexDirection:'row-reverse', alignItems:'flex-end'}}>
              <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ isImageConfirmed:false, dialogVisible: false }); }} />
              <Dialog.Button label="확인" color='#000' 
                onPress={()=>{
                    this.setState({isImageConfirmed:true});
                    this.setState({dialogVisible:false});
                }}/>
            </View>
          }
          
        </Dialog.Container>

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
              <TouchableOpacity
                onPress={() => { this.setState({ isStartTime: true, isDatePickerVisible: true }) }
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
                onPress={() => { this.setState({ isStartTime: false, isDatePickerVisible: true }) }
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

          <View style={styles.list}>
            <TouchableOpacity onPress={() => {
            this.setState({ dialogVisible: true });
          }}>
            <Text style={styles.selectButton}>
              물건 나눔 사진 선택
            </Text>
          </TouchableOpacity>
          {image &&
            <Image source={{ uri: image }} style={styles.photo} />
          }
          </View>
            
        </View>
        <TouchableOpacity onPress={() => this.createTwoButtonAlert()}>
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
  timeText: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
    textAlignVertical: 'center',
    borderRadius: 50,
    color: '#FFF',
    backgroundColor: 'rgb(29,140,121)',
  },
  date: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 15,
    textAlign: 'left',
  },
  selectButton: {
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    fontSize: 22,
    color: 'rgb(29,140,121)',
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor:'rgb(29,140,121)',
    borderRadius:1,
    padding: 8,
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
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoHeader: {
    color:'#000',
    marginBottom: 30,
  },
  photo: {
    width:200,
    height:200,
    alignSelf:'center',
    resizeMode:'center',
  },
});