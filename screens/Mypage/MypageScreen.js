import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { ListItem } from 'react-native-elements';

export default class MypageScreen extends React.Component {
  state = {
    allUserActivities: [],
    userInfo: [],
    loadActivities: false,
    loadUserInfo: false,

    // for dialog
    dialogVisible: false,

    // additional data to send to the web server
    userSelectedActivity: {},
    userSelectedDateTime: null,
    userSelectedInterestCategory: {},
    serverUrl: '',
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
            this.setState({ allUserActivities: responseInJson }); // assign data to state variable
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

  createListItem(l, i) {
    if (i == 0) {
      return (
        <ListItem
          key={i}
          title={l.title}
          titleStyle={styles.item}
          containerStyle={styles.listFirst}
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

  render() {

    console.disableYellowBox = true;
    const { allUserActivities, userInfo, loadUserActivities, loadUserInfo } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: '#000' }} children='required'><Text>{this.state.userSelectedActivity.title}</Text></Dialog.Title>

          <Dialog.Description>
          <Text>
            {this.status[this.state.userSelectedActivity.status]}
            </Text>
          </Dialog.Description>

          <Dialog.Description>
          <Text>
            마감 기한 : {this.state.userSelectedActivity.deadline}
            </Text>
          </Dialog.Description>

          <Dialog.Description>
          <Text>
            관심사 : {this.state.userSelectedInterestCategory.name}
            </Text>
          </Dialog.Description>

          <Dialog.Description>
          <Text>
            시작시간 : {this.state.userSelectedActivity.startTime}
            </Text>
          </Dialog.Description>

          <Dialog.Description>
          <Text>
            종료시간 : {this.state.userSelectedActivity.endTime}
            </Text>
          </Dialog.Description>

          <Dialog.Description>
          <Text>
            장소 : {this.state.userSelectedActivity.place}
            </Text>
          </Dialog.Description>

          <Dialog.Description>
          <Text>
            세부 내용 : {this.state.userSelectedActivity.content}
            </Text>
          </Dialog.Description>

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
              <Text style={styles.item}>{this.state.userInfo.nickname}</Text>
              <Ionicons
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
            <Text style={styles.titleText}>나의 활동</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen: '관심사 목록', intial: false })}>
              <Text style={styles.titleButton}>전체보기</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.activityBox}>
            {loadUserActivities ?
              allUserActivities.map((l, i) => (
                this.createListItem(l, i)
              ))
              :
              <View />
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
              onPress={() => this.props.navigation.navigate('설정')}
            >
              <Text style={styles.item}>설정</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listBox}>
            <View style={styles.list}>
              <Text style={styles.item}>로그아웃</Text>
            </View>
          </View>
          <View style={styles.listBox}>
            <View style={styles.list}>
              <Text style={styles.item}>회원탈퇴</Text>
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
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 8,
  }
});
