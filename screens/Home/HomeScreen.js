import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  state = {
    allNotices: [],
    allActivities: [],
    allUserActivities: [],
    loadNotices: false,
    loadActivities: false,
    loadUserActivities: false,
    activityUser: [],

    // for dialog
    dialogVisible: false,
    isDatePickerVisible: false, // date picker in dialog
    finalConfirmDialog: false,
    postType: 1,
    register: false,

    information: false,

    // additional data to send to the web server
    userSelectedActivity: {},
    userSelectedInterestCategory: {},
    userSelectedNotice: {},
    serverUrl: '',
    type: 0,
  };

  constructor(props) {
    super(props);
    console.log('Home Screen');
    this.userType = 1;

    this.status = [
      '매칭 전',
      '매칭 중',
      '매칭 완료',
      '활동 진행중',
      '활동 종료',
      '활동 취소'
    ];

    this.getData('Notice');
    this.getData('Activity');
    this.getData('User');
  }

  componentDidUpdate() {
    if (this.props.route.params?.set) {
      if (this.props.route.params.set) {
        console.log("Get new data");
        this.props.route.params.set = false;
        this.getData('Notice');
        this.getData('Activity');
        this.getData('User');
      }
    }
  }

  getData(type) {
    let url;
    if (type == 'Notice') {
      url = "http://saevom06.cafe24.com/noticedata/getTop5Notices"
    } else if (type == 'Activity') {
      url = "http://saevom06.cafe24.com/activitydata/getTop5Activities"
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
          if (type == 'Notice') {
            console.log("Get notice data");
          } else if (type == 'Activity') {
            console.log("Get activity data");
          } else {
            console.log("Get user activity data");
          }
          for (var i = 0; i < responseInJson.length; i++) {
            if (type == 'Notice') {
              responseInJson[i].modDate = this.parseDate(responseInJson[i].modDate);
              responseInJson[i].regDate = this.parseDate(responseInJson[i].regDate);
            } else {
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
          }
          if (type == 'Notice') {
            this.setState({ allNotices: responseInJson }); // assign data to state variable
          } else if (type == 'Activity') {
            this.setState({ allActivities: responseInJson }); // assign data to state variable
          } else {
            this.setState({ allUserActivities: responseInJson }); // assign data to state variable
          }
          if (type == 'Notice') {
            if (this.state.allNotices.length > 0)
              this.setState({ loadNotices: true })
          } else if (type == 'Activity') {
            if (this.state.allActivities.length > 0)
              this.setState({ loadActivities: true })
          } else {
            if (this.state.allUserActivities.length > 0)
              this.setState({ loadUserActivities: true })
          }
        })
    } catch (e) {
      console.log(e);
    }
  }

  fetchPost(url, data) {
    console.log(data);
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',

        body: JSON.stringify(data),
      }).then((res) => {
        Alert.alert("신청 되었습니다");
        this.setState({ dialogVisible: false });
      });
    } catch (e) {
      console.warn('fetch failed', e, url);
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
    var related = true;
    if (type == 1) {
      related = this.checkUser(l);
    }
    if (i == 0) {
      if (type == 0) {
        // Notice
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.text}
            containerStyle={styles.listFirst}
            onPress={
              () => {
                this.setState({ postType: type });
                this.setState({ userSelectedNotice: l });
                this.setState({ dialogVisible: true });
                this.setState({ related: true });
              }
            }
          />
        )
      } else if ((type == 1 && related == true) || type == 2) {
        // Activity 
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.text}
            containerStyle={styles.listFirst}
            rightElement={this.getImage(l.status)}
            onPress={
              () => {
                this.setState({ postType: type });
                this.setState({ userSelectedActivity: l });
                this.setState({ userSelectedInterestCategory: l.interestCategory });
                this.setState({ dialogVisible: true });
                this.setState({ related: related });
              }
            }
          />
        )
      } else {
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.text}
            containerStyle={styles.listFirst}
            rightElement={this.getImage(l.status)}
            onPress={
              () => {
                this.setState({ postType: type });
                this.setState({ userSelectedActivity: l });
                this.setState({ userSelectedInterestCategory: l.interestCategory });
                this.setState({ dialogVisible: true });
                this.setState({ related: related });
              }
            }
          />
        )
      }
    } else {
      if (type == 0) {
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.text}
            containerStyle={styles.list}
            onPress={
              () => {
                this.setState({ postType: type });
                this.setState({ userSelectedNotice: l });
                this.setState({ dialogVisible: true });
                this.setState({ related: true });
              }
            }
          />
        )
      } else if ((type == 1 && related == true) || type == 2) {
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.text}
            containerStyle={styles.list}
            rightElement={this.getImage(l.status)}
            onPress={
              () => {
                this.setState({ postType: type });
                this.setState({ userSelectedActivity: l });
                this.setState({ userSelectedInterestCategory: l.interestCategory });
                this.setState({ dialogVisible: true });
                this.setState({ related: related });
              }
            }
          />
        )
      } else {
        return (
          <ListItem
            key={i}
            title={l.title}
            titleStyle={styles.text}
            containerStyle={styles.list}
            rightElement={this.getImage(l.status)}
            onPress={
              () => {
                this.setState({ postType: type });
                this.setState({ userSelectedActivity: l });
                this.setState({ userSelectedInterestCategory: l.interestCategory });
                this.setState({ dialogVisible: true });
                this.setState({ related: related });
              }
            }
          />
        )
      }
    }
  }

  checkUser(l) {
    for (var i = 0; i < l.activityVolunteers.length; i++) {
      if (l.activityVolunteers[i].user.socialId == global.googleUserEmail) {
        return true;
      }
    }
    for (var i = 0; i < l.activityUsers.length; i++) {
      if (l.activityUsers[i].user.socialId == global.googleUserEmail) {
        return true;
      }
    }
    return false;
  }

  checkUserStatus(l) {
    for (var i = 0; i < l.activityVolunteers.length; i++) {
      if (l.activityVolunteers[i].user.socialId == global.googleUserEmail) {
        switch(l.activityVolunteers[i].status) {
          case 0:
            return '승인 대기중'
          case 1:
            return '승인'
          default:
            return '취소'
        }
      }
    }
    for (var i = 0; i < l.activityUsers.length; i++) {
      if (l.activityUsers[i].user.socialId == global.googleUserEmail) {
        return '이용자';
      }
    }
    return '에러';
  }

  render() {

    console.disableYellowBox = true;
    const { allNotices, allActivities, allUserActivities, loadNotices, loadActivities, loadUserActivities } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/home_back_test.png')} style={styles.background}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Dialog.Container visible={this.state.dialogVisible}>
              {this.state.postType != 0 ?
                <Dialog.Title style={{ color: '#000' }} children='required'>
                  {this.state.userSelectedActivity.title}
                </Dialog.Title>
                :
                <Dialog.Title style={{ color: '#000' }} children='required'>{this.state.userSelectedNotice.title}</Dialog.Title>
              }
              {this.state.postType != 0 ?
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
                :
                <View>
                  <Dialog.Description>
                    <Text>
                      등록일 : {this.state.userSelectedNotice.modDate}
                    </Text>
                  </Dialog.Description>
                  <Dialog.Description>
                    <Text>
                      {this.state.userSelectedNotice.content}
                    </Text>
                  </Dialog.Description>
                </View>
              }
              {this.state.related == false && this.state.userSelectedActivity.statue == 1 &&
                <Dialog.Button label="봉사자 지원" title="봉사자 지원" color='#000' onPress={
                  () => {
                    this.fetchPost('http://saevom06.cafe24.com/requestdata/register', {
                      id: this.state.userSelectedActivity.id, // id of the activity that user chose
                      name: global.googleUserName,//this.props.navigation.getParam('userName', 'invalid name from App: Homescreen.js [in <Dialog>]'),
                      email: global.googleUserEmail,// this.props.navigation.getParam('userEmail', 'invalid email from App: Homescreen.js [in <Dialog>]'),
                      type: this.userType,
                    });
                  }
                } />
              }
              <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />
            </Dialog.Container>


            <Dialog.Container visible={this.state.information}>
              <Dialog.Title style={{ color: '#000', fontSize:25 }} children='required'>상대로 사용 설명서</Dialog.Title>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <Text style={styles.userManual}>
                  {"\n"}
                  {"\n"}
                    1. 홈 페이지{"\n"}
                    홈 페이지는 공지사항, 최근 등록된 활동, 나의 활동이 보여집니다. {"\n"}
                    각 항목별로, 우측의 "전체보기" 를 터치하여 전체 리스트를 열람할 수 있습니다.{"\n"}
                    공지, 활동을 터치하면 팝업과 함께 간단한 정보를 확인할 수 있습니다.{"\n"}
                    화면 우측 상단의 종 아이콘을 터치하여 나에게 온 알림들을 볼 수 있습니다.{"\n"}
                    {"\n"}{"\n"}
                    
                    2. 활동 페이지{"\n"}
                    활동 페이지에서는 물건나눔을 하거나, 봉사활동 목록 열람, 그리고 봉사자로서
                    활동을 하겠다는 신청을 할 수 있습니다.{"\n"}
                    물건 나눔 메뉴를 통해 필요한 정보를 입력하고, 복지관에 전달할 수 있습니다.{"\n"}
                    {"\n"}{"\n"}

                    3. 공지사항 페이지{"\n"}{"\n"}
                    공지 사항들을 볼 수 있습니다.{"\n"}{"\n"}
                    {"\n"}{"\n"}

                    4. 내 정보 페이지{"\n"}{"\n"}
                    닉네임을 터치하여 수정한 위, 우측의 스패너 아이콘을 터치하여 닉네임 변경 요청을 할 수 있습니다.{"\n"}{"\n"}
                    계정관리의 "설정" 을 터치하여 전화번호 공유 승인을 수락 또는 거절할 수 있습니다.{"\n"}{"\n"}

                  </Text>
                </ScrollView>
              <Dialog.Button label="확인" color='black' onPress={() => { this.setState({ information: false }); }} />
            </Dialog.Container>

            <View style={styles.topSpace}>
              <View style={styles.topSpaceText}>
                <Text style={styles.topText}>환영합니다</Text>
                <Text style={styles.topText}>{global.googleUserName}님</Text>
              </View>
              <TouchableOpacity
                style={styles.topSpaceTouch}
                onPress={() => this.setState({ information: true })}
              >
                <Ionicons style={styles.informationButton} name="ios-information-circle" size={40} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.box}>
              <View style={styles.title}>
                <Text style={styles.titleText}>공지사항</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Notice', { screen: '공지 목록', params: { set: true } })}>
                  <Text style={styles.titleButton}>전체보기</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.listBox}>
                {loadNotices ?
                  allNotices.map((l, i) => (
                    this.createListItem(l, i, 0)
                  ))
                  :
                  <ListItem
                    key={0}
                    title='등록된 공지사항이 없습니다'
                    titleStyle={styles.text}
                    containerStyle={styles.listFirst}
                  />
                }
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.title}>
                <Text style={styles.titleText}>최근 등록된 활동</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen: '관심사 목록', params: { set: true, listType: 1, id:0, name:'전체 목록' } })}>
                  <Text style={styles.titleButton}>전체보기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.listBox}>
                {loadActivities ?
                  allActivities.map((l, i) => (
                    this.createListItem(l, i, 1)
                  ))
                  :
                  <ListItem
                    key={0}
                    title='등록된 활동이 없습니다'
                    titleStyle={styles.text}
                    containerStyle={styles.listFirst}
                  />
                }
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.title}>
                <Text style={styles.titleText}>나의 활동</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen: '관심사 목록', params: { set: true, listType: 2, id: -1, name:'나의 활동' } })}>
                  <Text style={styles.titleButton}>전체보기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.listBox}>
                {loadUserActivities ?
                  allUserActivities.map((l, i) => (
                    this.createListItem(l, i, 2)
                  ))
                  :
                  <ListItem
                    key={0}
                    title='등록된 활동이 없습니다'
                    titleStyle={styles.text}
                    containerStyle={styles.listFirst}
                  />
                }
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    )
  };
}

/*
<TouchableOpacity style={styles.topSpaceTouch}>
                <Text style={styles.informationButton}>
                  사용
                  설명서
                </Text>
              </TouchableOpacity>
*/

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
  userManual:{
    fontSize: 18,
  },
  background: {
    flex: 1,
  },
  topSpace: {
    paddingTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
  },
  topSpaceText: {
    flex : 3,
  },
  topText: {
    color: '#FFF',
    fontSize: 30,
    padding: 5,
    paddingLeft: 20,
  },
  topSpaceTouch: {
    flex: 1,
    marginRight: 20,
  },
  informationButton: {
    flex: 1,
    textAlign:'right',
    fontWeight:'bold',
  },
  box: {
    flex: 1,
    padding: 18,
    backgroundColor: '#FFF',
    marginBottom: 30,
    marginLeft: 11,
    marginRight: 11,
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    padding: 3,
    flexDirection: 'row',
    marginBottom: 15,
  },
  titleText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgb(29,140,121)',
  },
  titleButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    color: 'rgb(140,140,140)'
  },
  statusButton: {
    width: 70,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  listBox: {
    padding: 3,
  },
  listFirst: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
    paddingBottom: 8,
    marginTop: 3,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
    paddingBottom: 8,
    marginTop: 3,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: 'rgb(220,220,220)',
  },
});
