import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import { ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component {

  state = {
    allActivities: [],
    allUserActivities: [],
    loadActivities: false,
    loadUserActivities:false,

    // for dialog
    dialogVisible: false,
    isDatePickerVisible: false, // date picker in dialog
    finalConfirmDialog: false,
    postType: 1,

    // additional data to send to the web server
    userSelectedActivity: {},
    userSelectedDateTime: null,
    userSelectedInterestCategory: {},
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

    this.getData('Activity');
    this.getData('User');
  }

  getData(type) {
    let url;
    if (type == 'Activity') {
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
          if (type == 'Activity') {
            console.log("Get activity data");  
          } else {
            console.log("Get user activity data");
          }
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
          if (type == 'Activity') {
            this.setState({ allActivities: responseInJson }); // assign data to state variable
          } else {
            this.setState({ allUserActivities: responseInJson }); // assign data to state variable
          }
          if (type == 'Activity') {
            this.setState({loadActivities:true})
          } else {
            this.setState({loadUserActivities:true})
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

  createListItem(l, i) {
    if (i == 0) {
      return (
        <ListItem
          key={i}
          title={l.title}
          titleStyle={styles.text}
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
          titleStyle={styles.text}
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
    const { allActivities, allUserActivities, loadActivities, loadUserActivities } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/home_back_test.png')} style={styles.background}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title style={{ color: '#000' }} children='required'>{this.state.userSelectedActivity.title}</Dialog.Title>

              <Dialog.Description>
                {this.status[this.state.userSelectedActivity.status]}
              </Dialog.Description>

              <Dialog.Description>
                마감 기한 : {this.state.userSelectedActivity.deadline}
              </Dialog.Description>

              <Dialog.Description>
                관심사 : {this.state.userSelectedInterestCategory.name}
              </Dialog.Description>

              <Dialog.Description>
                시작시간 : {this.state.userSelectedActivity.startTime}
              </Dialog.Description>

              <Dialog.Description>
                종료시간 : {this.state.userSelectedActivity.endTime}
              </Dialog.Description>

              <Dialog.Description>
                장소 : {this.state.userSelectedActivity.place}
              </Dialog.Description>

              <Dialog.Description>
                세부 내용 : {this.state.userSelectedActivity.content}
              </Dialog.Description>

              {this.state.postType == 1 &&
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
            <View style={styles.topSpace}>
              <Text style={styles.topText}>환영합니다</Text>
              <Text style={styles.topText}>{global.googleUserName}님</Text>
            </View>
            <View style={styles.box}>
              <View style={styles.title}>
                <Text style={styles.titleText}>최근 등록된 활동</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen: '관심사 목록', intial: false })}>
                  <Text style={styles.titleButton}>전체보기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.listBox}>
                { loadActivities ? 
                  allActivities.map((l, i) => (
                    this.createListItem(l, i)
                  ))
                  :
                  <View/>
                }
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.title}>
                <Text style={styles.titleText}>나의 활동</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity', { screen: '관심사 목록', intial: false })}>
                  <Text style={styles.titleButton}>전체보기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.listBox}>
                { loadUserActivities ? 
                  allUserActivities.map((l, i) => (
                    this.createListItem(l, i)
                  ))
                  :
                  <View/>
                }
              </View>
            </View>

          </ScrollView>

        </ImageBackground>
      </View>
    )
  };
}

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
  background: {
    flex: 1,
  },
  topSpace: {
    paddingTop: 20,
    marginBottom: 40,
  },
  topText: {
    color: '#FFF',
    fontSize: 30,
    padding: 5,
    paddingLeft: 20,
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
