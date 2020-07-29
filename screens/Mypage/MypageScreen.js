import * as React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, TextInput, ImageBackground, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { ListItem } from 'react-native-elements';

export default class MypageScreen extends React.Component {

  state = {
    allUserActivities: [],
    userInfo: [],
    interestList:[],
    loadActivities: false,
    loadUserInfo: false,
    loadInterest: false,

    // for dialog
    dialogVisible: false,

    // additional data to send to the web server
    userSelectedActivity: {},
    userSelectedDateTime: null,
    userSelectedInterestCategory: {},
    serverUrl: '',

    //nickname change
    changedNickName: "",
  };

  constructor(props) {
    super(props);
    console.log('Mypage Screen');

    this.status = [
      '매칭 전',
      '매칭 중',
      '매칭 완료',
      '활동 진행중',
      '활동 종료',
      '활동 취소'
    ];

    this.getData('User');
    this.getData('Activity');
    this.getInterest();
  }

  componentDidUpdate() {
    if (this.props.route.params?.set) {
      if (this.props.route.params.set) {
        console.log("Get new data");
        this.props.route.params.set = false;
        this.getData('User');
        this.getData('Activity');
        this.getInterest();
      }
    }
  }

  getInterest() {
    var url = "http://saevom06.cafe24.com/userdata/eachUserInterest?name="+global.googleUserName+"&email="+global.googleUserEmail;

console.log(url);

    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {
          if (responseInJson.length > 0) {
            this.setState({ loadInterest: true });
            this.setState({ interestList: responseInJson});
          }
          console.log(this.state.interestList);
        })
    } catch (e) {
      console.log(e);
    }
  }

  getData(type) {
    let url;
    if (type == 'User') {
      url = "http://saevom06.cafe24.com/userdata/getUser?name=" + global.googleUserName + "&email=" + global.googleUserEmail;
    } else {
      url = "http://saevom06.cafe24.com/activitydata/getTop5ActivitiesForUser?name=" + global.googleUserName + "&email=" + global.googleUserEmail;
    }

    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {
          if (type == 'User') {
            console.log("Get user data");
            console.log(responseInJson);
            this.setState({ userInfo: responseInJson }); // assign data to state variable
            this.setState({ loadUserInfo: true });
          } else {
            console.log("Get activity data");
            for (var i = 0; i < responseInJson.length; i++) {
              if (responseInJson[i].deadline.charAt(4) != '/') {
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
            this.setState({ allUserActivities: responseInJson }); // assign data to state variable
            if (responseInJson.length > 0)
              this.setState({ loadUserActivities: true });
          }

        })
    } catch (e) {
      console.log(e);
    }
  }

  parseDate(date) {
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

  getImage(props) {
    var path;

    // Allocating path as dynamic will cause error
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
      <View style={styles.imageGroup}>
        <Image
          source={path}
          style={styles.statusButton}
        />
      </View>
    )
  }

  createListItem(l, i, type) {
    if (type == 0) {
      if (i == 0) {
        return (
          <ListItem
            key={i}
            title={l.interestName}
            titleStyle={styles.item}
            containerStyle={styles.listFirst}
            onPress={
              () => {
                this.props.navigation.navigate('Activity', { screen: '관심사 목록', params: { set: true, listType: 2, id: l.id, name: l.interestName }})
              }
            }
          />
        )
      } else {
        return (
          <ListItem
            key={i}
            title={l.interestName}
            titleStyle={styles.item}
            containerStyle={styles.list}
            onPress={
              () => {
                this.props.navigation.navigate('Activity', { screen: '관심사 목록', params: { set: true, listType: 2, id: l.id, name: l.interestName }})
              }
            }
          />
        )
      }
    } else {
      if (i == 0) {
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.item}
            containerStyle={styles.listFirst}
            rightElement={this.getImage(l.status)}
            onPress={
              () => {
                this.setState({ postType: 2 });
                this.setState({ userSelectedActivity: l });
                this.setState({ userSelectedInterestCategory: l.interestCategory });
                this.setState({ dialogVisible: true });
              }
            }
          />
        )
      } else {
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.item}
            containerStyle={styles.list}
            rightElement={this.getImage(l.status)}
            onPress={
              () => {
                this.setState({ postType: 2 });
                this.setState({ userSelectedActivity: l });
                this.setState({ userSelectedInterestCategory: l.interestCategory });
                this.setState({ dialogVisible: true });
              }
            }
          />
        )
      }
    }

  }

  changeNickName = () => {

    let nick = this.state.changedNickName;
    if (nick == "") nick = this.state.userInfo.nickname;

    let data = {
      'name': global.googleUserName,
      'email': global.googleUserEmail,
      'nickname': nick + "",
    }
    console.log(data);

    Alert.alert(
      "닉네임을 변경 하시겠습니까?",
      "",
      [
        {
          text: "확인", onPress: () => {
            const url = "http://saevom06.cafe24.com/userdata/modifyNickName";

            // post request
            try {
              fetch(url, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              }).then((res) => {
                //console.log("fetch successful!", res);
                Alert.alert("닉네임 변경이 완료 되었습니다.");
              });
            } catch (e) {
              //console.warn('fetch failed', e, url);
              Alert.alert("닉네임 변경이 실패했습니다.");
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

  unregister = () => {

    let data = {
      'name': global.googleUserName,
      'email': global.googleUserEmail,
    }

    Alert.alert(
      "정말 탈퇴하시겠습니까?",
      "탈퇴 시 번복이 불가능하니, 한번 더 생각해 주세요.",
      [
        {
          text: "확인", onPress: () => {
            const url = "http://saevom06.cafe24.com/userdata/unregisterUser"; // *** restcontroller implementation is needed

            // post request
            try {
              fetch(url, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              }).then((res) => {
                //console.log("fetch successful!", res);
                Alert.alert("회원 탈퇴 되었습니다.");
              });
            } catch (e) {
              //console.warn('fetch failed', e, url);
              Alert.alert("회원 탈퇴가 되지 않았습니다.");
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

  render() {

    console.disableYellowBox = true;
    const { allUserActivities, userInfo, interestList, loadUserActivities, loadUserInfo, loadInterest } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: '#000' }} children='required'>{this.state.userSelectedActivity.title}</Dialog.Title>

          <View>
            <Dialog.Description>
              <Text>
                {this.state.userSelectedInterestCategory.name}
              </Text>
            </Dialog.Description>
            <Dialog.Description>
              <Text>
                {this.state.userSelectedActivity.startTime} ~ {this.state.userSelectedActivity.endTime}
              </Text>
            </Dialog.Description>

            <Dialog.Description>
              <Text>
                {this.state.userSelectedActivity.place} {this.state.userSelectedActivity.placeDetail}
              </Text>
            </Dialog.Description>

            <Dialog.Description>
              <Text>
                {this.state.userSelectedActivity.content}
              </Text>
            </Dialog.Description>
          </View>

          <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />


        </Dialog.Container>
        <ImageBackground
          source={require('../../assets/images/home_back.png')}
          style={styles.background}
        >
          <View style={styles.topSpace}>
            <Text style={styles.topText}>{global.googleUserName}님,</Text>
            <Text style={styles.topText}>좋은 하루 되세요.</Text>
          </View>
        </ImageBackground>

        <View style={styles.box}>
          <View style={styles.title}>
            <Text style={styles.titleText}>닉네임</Text>
          </View>
          <View style={styles.listBox}>
            <View style={styles.listFirst}>
              <TextInput
                style={styles.item}
                defaultValue={this.state.userInfo.nickname}
                onChangeText={(input) => {
                  this.setState({ changedNickName: input });
                }}
              />
              <Ionicons
                onPress={() => { this.changeNickName(); }}
                name={'ios-build'}
                size={30}
                style={{ marginTop: 7 }}
                color={'rgb(220,220,220)'}
              />
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <Text style={styles.titleText}>봉사시간</Text>
          </View>
          <View style={styles.listBox}>
            <View style={styles.listFirst}>
              <Text style={styles.item}>{this.state.userInfo.volunteerTime} 시간</Text>
              <Text style={styles.itemReverse}>{this.state.userInfo.rank}등 / {this.state.userInfo.totalUser}등</Text>
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <Text style={styles.titleText}>관심사 즐겨찾기</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen: '관심사 목록', params: { set: true, listType: 0 } })}>
              <Text style={styles.titleButton}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityBox}>
            {loadInterest ?
              interestList.map((l, i) => (
                this.createListItem(l, i, 0)
              ))
              :
              <ListItem
                key={0}
                title='즐겨찾기 추가한 관심사가 없습니다'
                titleStyle={styles.item}
                containerStyle={styles.listFirst}
              />
            }
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <Text style={styles.titleText}>나의 활동</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen: '관심사 목록', params: { set: true, listType: 2 } })}>
              <Text style={styles.titleButton}>전체보기</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.activityBox}>
            {loadUserActivities ?
              allUserActivities.map((l, i) => (
                this.createListItem(l, i, 1)
              ))
              :
              <ListItem
                key={0}
                title='참여한 활동이 없습니다'
                titleStyle={styles.item}
                containerStyle={styles.listFirst}
              />
            }
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <Text style={styles.titleText}>계정관리</Text>
          </View>

          <View style={styles.listBox}>
            <TouchableOpacity
              style={styles.listFirst}
              onPress={() => this.props.navigation.navigate('설정', {params: {phoneAgree : this.state.userInfo.phoneAgree}})}
            >
              <Text style={styles.item}>설정</Text>
            </TouchableOpacity>
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
    color: '#FFF',
    fontSize: 25,
    padding: 0,
    paddingLeft: 20,
  },
  box: {
    flex: 1,
    backgroundColor: 'rgb(220,220,220)',
    marginBottom: 0,
  },
  title: {
    padding: 10,
    paddingLeft: 25,
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#888',
  },
  titleButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    color: 'rgb(140,140,140)'
  },
  listBox: {
    backgroundColor: '#FFF',
    paddingRight: 25,
    paddingLeft: 25,
  },
  activityBox: {
    backgroundColor: '#FFF',
    paddingRight: 8,
    paddingLeft: 8,
  },
  statusButton: {
    width: 70,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  listFirst: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 8,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 8,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: 'rgb(220,220,220)',
  },
  item: {
    flex: 1,
    textAlign:'left',
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  itemReverse: {
    flex: 1,
    textAlign:'right',
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
