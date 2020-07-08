import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'; // for image access
import Dialog from "react-native-dialog";

export default class ActivityDetailScreen extends React.Component {

  constructor(props) {
    super(props);

    console.log("[ ActivityDetailScreen.js ]");

    this.state = {
      data: props.route.params.data,
      isUserRelated: 0, // for three cases: volunteer = 1, benefiting-user = 2, not related = 0
      image: null, // check if image is selected or not
      dialogVisible: false, // dialog for image picking
      memoDialogVisible: false,
      pictureSendingUrl: "",
      memo: "복지관에 전달 할 메모를 남겨 주세요.",
      isMemoWritten: false,
    };

    this.volunteerList = "";
    this.userList = ""
    this.activityStatus = this.state.data.status;

    // check if user is related to this activity. Default is not-related.
    // 1) check if volunteer
    for (var i = 0; i < this.state.data.activityVolunteers.length; i++) {
      if (i == 0) {
        this.volunteerList = this.state.data.activityVolunteers[i].user.nickname + "";
      } else {
        this.volunteerList = this.volunteerList + ", " + this.state.data.activityVolunteers[i].user.nickname;
      }

      if (this.state.data.activityVolunteers[i].user.socialId == global.googleUserEmail) {
        this.state.isUserRelated = 1;
        console.log("current user is volunteer");
        console.log(this.state.isUserRelated);
      }
    }
    // 2) check if benefiting-user
    for (var i = 0; i < this.state.data.activityUsers.length; i++) {
      if (i == 0) {
        this.userList = this.state.data.activityUsers[i].user.nickname + "";
      } else {
        this.userList = this.userList + ", " + this.state.data.activityUsers[i].user.nickname + "";
      }

      if (this.state.data.activityUsers[i].user.socialId == global.googleUserEmail) {
        this.state.isUserRelated = 2;
        console.log("current user is benefiting-user");
      }
    }

    this.status = [
      '매칭 전',
      '매칭 중',
      '매칭 완료',
      '활동 진행중',
      '활동 완료',
      '취소된 활동'
    ];

    if (this.state.data.deadline.charAt(4) != '/') {
      if (this.state.data.deadline == null) {
        if (this.state.data.startTime == null) {
          this.state.data.deadline = '없음';
        } else {
          this.state.data.deadline = this.state.data.startTime;
        }
      }

      if (this.state.data.deadline != '없음') {
        this.state.data.deadline = this.parseDate(this.state.data.deadline);
      }

      this.state.data.startTime = this.parseDate(this.state.data.startTime);
      this.state.data.endTime = this.parseDate(this.state.data.endTime);
    }

  };

  async takeAndUploadPhotoAsync(url) {

    // open the camera screen on mobile phone
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // if disabled, "cut picture" function is disabled
      aspect: [4, 3], // rectangle size
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    } else {
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
    this.formData = new FormData();
    this.formData.append('image', { uri: localUri, name: filename, type });
    this.formData.append('name', global.googleUserName);
    this.formData.append('email', global.googleUserEmail);
    this.formData.append('id', this.state.data.id);

    this.setState({ pictureSendingUrl: url });
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
    console.log(result);

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    // formData.append('image', { uri: localUri, name: filename, type });
    this.formData = new FormData();
    this.formData.append('image', { uri: localUri, name: filename, type });
    this.formData.append('name', global.googleUserName);
    this.formData.append('email', global.googleUserEmail);
    this.formData.append('id', this.state.data.id);

    this.setState({ pictureSendingUrl: url });
  }

  // sending 'image' to server needs different body format from previous 'fetchPost', which is 'content-type': 'multipart/form-data'
  async sendPictureToServer(url) {
    return await fetch(url, {
      method: 'POST',
      body: this.formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(() => { console.log('success', url) });
  }

  parseDate(date) {
    console.log(date);
    var splitDash = date.split('-');

    var year = splitDash[0] + '/';
    var month = splitDash[1] + '/';

    var splitT = splitDash[2].split('T');

    var day = splitT[0] + ' ';

    var splitColon = splitT[1].split(':');
    var hour = splitColon[0] + ':';
    var minute = splitColon[1];

    return year + month + day + hour + minute;
  }

  // send POST request to server url
  fetchPost(url, data) {

    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then((res) => {
        Alert.alert("신청 되었습니다");
        this.setState({ dialogVisible: false });
      });
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  }

  getImage(props) {
    var path;

    switch (props) {
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
      <Image
        source={path}
        style={styles.statusButton}
      />
    )
  }

  sendMemo(){

    const url = "http://saevom06.cafe24.com/activitydata/updateMemo"
    let memo = this.state.memo;

    if (this.state.isMemoWritten == false){
      memo = "";
    }

    let data = {
      name:global.googleUserName,
      email:global.googleUserEmail,
      id:this.state.data.id,
      memo:memo,
    }

    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then((res) => {
        Alert.alert("메모가 저장 되었습니다.");
      });
    } catch (e) {
      console.warn('fetch failed', e, url);
    }

  }

  render() {

    let { image } = this.state;

    // console.log('current status : ', this.activityStatus);

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.box}>
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>{this.state.data.title}</Text>
              {this.getImage(this.state.data.status)}
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>마감 기한</Text>
                <Text style={styles.content}>{this.state.data.deadline}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>관심사</Text>
                <Text style={styles.content}>{this.state.data.interestCategory.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>담당인원</Text>
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>봉사자</Text>
                <Text style={styles.content}>{this.volunteerList}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>이용자</Text>
                <Text style={styles.content}>{this.userList}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>활동내용</Text>
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>활동기간</Text>
                <View style={styles.date}>
                  <Text style={styles.time}>{this.state.data.startTime} ~</Text>
                  <Text style={styles.time}>{this.state.data.endTime}</Text>
                </View>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>장소</Text>
                <Text style={styles.content}>{this.state.data.place}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>세부내용</Text>
                <Text style={styles.content}>{this.state.data.content}</Text>
              </View>
            </View>
          </View>


          <View style={styles.line} />
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>메모</Text>
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>
                  {this.state.memo}
                </Text>
              </View>
            </View>
          </View>

        </View>


        <Dialog.Container visible={this.state.dialogVisible}>
          {!image &&
            <Dialog.Title style={styles.photoHeader}><Text>사진을 업로드해 주세요.</Text></Dialog.Title>
          }
          {image &&
            <Dialog.Title style={styles.photoHeader}><Text>아래 이미지를 전송하시겠습니까?</Text></Dialog.Title>
          }
          {image &&
            <Image source={{ uri: image }} style={styles.photo} />
          }

          {!image &&
            <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
              <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />
              <Dialog.Button title="갤러리에서 선택" label="갤러리에서 선택" color='#000' onPress={() => this.pickImageFromGallery(this.state.pictureSendingUrl)} />
              <Dialog.Button title='지금 사진 촬영' label='지금 사진 촬영' color='#000' onPress={() => this.takeAndUploadPhotoAsync(this.state.pictureSendingUrl)} />
            </View>
          }
          {image &&
            <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
              <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false, image: null }); }} />
              <Dialog.Button label="전송하기" color='#000'
                onPress={() => {
                  this.sendPictureToServer(this.state.pictureSendingUrl).then(() => {
                    Alert.alert('전송 완료!', '사진이 전송되었습니다.', [{
                      text: '확인',
                      onPress: () => {
                        this.setState({ dialogVisible: false });
                        this.setState({ image: null });
                      }
                    }]);
                  });

                }} />
            </View>
          }

        </Dialog.Container>


        {this.state.isUserRelated == 0 && (this.activityStatus == 1) &&
          <TouchableOpacity
            onPress={() =>
              this.fetchPost('http://saevom06.cafe24.com/requestdata/register', {
                id: this.state.data.id, // id of the activity that user chose
                name: global.googleUserName,//this.props.navigation.getParam('userName', 'invalid name from App: Homescreen.js [in <Dialog>]'),
                email: global.googleUserEmail,// this.props.navigation.getParam('userEmail', 'invalid email from App: Homescreen.js [in <Dialog>]'),
                type: 1,
              })}
          >
            <Text style={styles.button}>
              봉사자 지원
          </Text>
          </TouchableOpacity>}

        <View style={styles.photoButtons}>
          {(this.state.isUserRelated == 1 && (this.activityStatus == 3 || this.activityStatus == 4)) && <TouchableOpacity onPress={() => {
            this.setState({ pictureSendingUrl: "http://saevom06.cafe24.com/activitydata/uploadStartImg" });
            this.setState({ dialogVisible: true });
          }}>
            <Text style={styles.startButton}>
              시작 사진 전송
            </Text>
          </TouchableOpacity>}


          {(this.state.isUserRelated == 1 && this.activityStatus == 4) && <TouchableOpacity onPress={() => {
            this.setState({ pictureSendingUrl: "http://saevom06.cafe24.com/activitydata/uploadEndImg" });
            this.setState({ dialogVisible: true });
          }}>
            <Text style={styles.endButton}>
              종료 사진 전송
            </Text>
          </TouchableOpacity>}

          {(this.state.isUserRelated == 1 && this.activityStatus <= 4) && <TouchableOpacity onPress={() => {
            this.setState({memoDialogVisible: true});
          }}>
            <Text style={styles.memoButton}>
              메모 작성
            </Text>
          </TouchableOpacity>}

          <Dialog.Container visible={this.state.memoDialogVisible}>

            <View>
              <Dialog.Input 
                autoFocus
                onChangeText={(text) => this.setState({ memo: text })}
                placeholder="메모를 작성해 주세요."
              >
              </Dialog.Input>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
                <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ 
                  memo: "복지관에 전달 할 메모를 남겨 주세요.",
                  isMemoWritten:false,
                  memoDialogVisible: false }); 
                  }} />
                <Dialog.Button title='작성 완료' label='작성 완료' color='#000' onPress={() => { 
                  this.setState({ 
                    memoDialogVisible: false ,
                    isMemoWritten:true,
                  }); 
                  this.sendMemo();
                  }} />
              </View>
            </View>
          </Dialog.Container>


          {((this.state.isUserRelated == 1 || this.state.isUserRelated == 2) && (this.activityStatus == 1 || this.activityStatus == 2)) && <TouchableOpacity
            onPress={() => Alert.alert('취소되었습니다')}>
            <Text style={styles.cancleButton}>
              취소하기
            </Text>
          </TouchableOpacity>}
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
    paddingTop: 25,
    padding: 3,
  },
  box: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 20,
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
  line: {
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: 'rgb(220, 220, 220)'
  },
  titleList: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataList: {
    padding: 5
  },
  data: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  header: {
    flex: 3,
    fontSize: 14,
  },
  content: {
    flex: 10,
    fontSize: 14,
  },
  date: {
    flex: 10,
  },
  time: {
    flex: 1,
  },
  statusButton: {
    width: 90,
    height: 35,
    resizeMode: 'contain',
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
    color: '#000',
    marginBottom: 30,
  },
  photo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'center',
  },
  startButton: {
    flex: 1,
    width: 100,
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 10,
    fontSize: 14,
    color: '#FFF',
    backgroundColor: 'rgb(1, 192, 99)',
    borderRadius: 50,
    padding: 8,
  },
  endButton: {
    flex: 1,
    width: 100,
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 10,
    fontSize: 14,
    color: '#FFF',
    backgroundColor: 'rgb(29,140,121)',
    borderRadius: 50,
    padding: 8,
  },
  memoButton: {
    flex: 1,
    width: 100,
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 10,
    fontSize: 14,
    color: '#FFF',
    backgroundColor: 'rgb(100,140,121)',
    borderRadius: 50,
    padding: 8,
  },
  cancleButton: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: '#777',
    borderRadius: 50,
    padding: 8,
  }
});