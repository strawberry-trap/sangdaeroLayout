import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, SearchBar } from 'react-native-elements'
import Icon from 'react-native-ionicons'
import { Ionicons } from '@expo/vector-icons';

export default class ActivityListScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log('Activity List Screen')

    this.state = {
      id: props.route.params.id,
      name: props.route.params.name,
      interest: props.route.params.interest,
      data: [],
      urgentCheckedData: [],
      isLoading: false,
      search: '',
    }

    console.log(this.state.name)

    this.getData();
  }

  getData() {
    if (this.state.id == -1) {
      var url = 'http://saevom06.cafe24.com/activitydata/getActivitiesForUser?name=' + global.googleUserName + '&email=' + global.googleUserEmail;
    } else {
      var url = 'http://saevom06.cafe24.com/activitydata/getActivities?id=' + this.state.id;
    }

    console.log(url);

    fetch(url, {

      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false,
      },
    })
      .then((response) => response.json())
      .then((responseInJson) => {
        console.log('Get activity list');
        this.setState({ data: responseInJson });
        this.sortDataByUrgentDateTime(responseInJson, 12); // sort data regarding 'deadline'
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (this.state.data.length > 0)
          this.setState({ isLoading: true });
      })
  }

  // need restcontroller
  interestPost(type) {
    console.log('change interest');
    if (type == 0) {
      var url = 'http://saevom06.cafe24.com/userdata/addInterest';
    } else {
      var url = 'http://saevom06.cafe24.com/userdata/removeInterest';
    }
    console.log(url);
    var data = {
      name: global.googleUserName,
      email: global.googleUserEmail,
      interestId: this.state.id,
    }
    console.log(data);
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          async: false,
        },
        body: JSON.stringify(data)
      }).then((res) => {
      });
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  }

  // sort data by deadline, that the deadline is within 12 hours from current time
  // input 'data' should be a json list of "activities", and 'deadlineHourDifference' is like "if the deadline time is within 12 hours from now".
  sortDataByUrgentDateTime(data, deadlineHourDifference) {

    // function for add hours in Date() object
    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + (h * 60 * 60 * 1000));
      return this;
    }

    var allActivities = data; // all activities
    var urgent = [];
    var notUrgent = [];
    var total = [];

    // endTime == time right now + 12hours(which is, 'deadlineHourFromCurrentTime')
    var endTime = new Date().addHours(deadlineHourDifference);

    for (var i in allActivities) {

      var deadline = new Date(allActivities[i].deadline); // deadline of activity

      // difference between 'deadline' and '12 hours from right now' in hours
      var diff = (deadline - endTime) / (60 * 60 * 1000); // divide by milliseconds, since it is expressed as hours

      if (diff <= 12 && diff >= 0 && allActivities[i].status == 1) {
        allActivities[i]['isUrgent'] = 1;
        urgent.push(allActivities[i]);
      } else {
        allActivities[i]['isUrgent'] = 0;
        notUrgent.push(allActivities[i]);
      }
    }
    // sorted as urgent activities first, then not-urgent activities later
    for (var i = 0; i < urgent.length; i++) total.push(urgent[i]);
    for (var i = 0; i < notUrgent.length; i++) total.push(notUrgent[i]);

    this.setState({ data: total });
  }

  compareAttribute(a, b) {
    if (a.isUrgent < b.isUrgent) return -1;
    if (a.isUrgent > b.isUrgent) return 1;
    // else
    return 0;

  }

  getImage(props, urgent) {
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

    if (urgent) {
      return (
        <View style={styles.imageGroup}>
          <Ionicons name="ios-alert" size={20} color="rgb(29,140,121)" />
          <Image
            source={path}
            style={styles.statusButton}
          />
          <Image
            source={require('../../assets/images/right_arrow.png')}
            style={styles.arrow}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.imageGroup}>
          <Image
            source={path}
            style={styles.statusButton}
          />
          <Image
            source={require('../../assets/images/right_arrow.png')}
            style={styles.arrow}
          />
        </View>
      )
    }

  }

  createListItem(l, i) {
    l.status = this.editStatus(l.status, l.deadline, l.startTime, l.endTime);

    if (l.isUrgent == 1) {
      // Urgent : true
      if (i == 0) {
        // Urgent : true, First : true
        if (this.checkUser(l) && this.state.id != -1) {
          // Urgent : true, First : true, UserInclude : true, id != -1
          return (
            <View style={styles.listFirst}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundUserList}
              />
            </View>
          )
        } else {
          // Urgent : true, First : true, UserInclude : false
          return (
            <View style={styles.listFirst}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundList}
              />
            </View>
          )
        }
      } else {
        // Urgent : true, First : false
        if (this.checkUser(l) && this.state.id != -1) {
          // Urgent : true, First : false, UserInclude : true, id != -1
          return (
            <View style={styles.list}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundUserList}
              />
            </View>
          )
        } else {
          // Urgent : true, First : false, UserInclude : false
          return (
            <View style={styles.list}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundList}
              />
            </View>
          )
        }
      }
    } else {
      // Urgent : false
      if (i == 0) {
        // Urgent : false, First : true
        if (this.checkUser(l) && this.state.id != -1) {
          // Urgent : false, First : true, UserInclude : true, id != -1
          return (
            <View style={styles.listFirst}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundUserList}
              />
            </View>
          )
        } else {
          // Urgent : false, First : true, UserInclude : false
          return (
            <View style={styles.listFirst}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundList}
              />
            </View>
          )
        }
      } else {
        // Urgent : false, First : false
        if (this.checkUser(l) && this.state.id != -1) {
          // Urgent : false, First : false, UserInclude : true, id != -1
          return (
            <View style={styles.list}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundUserList}
              />
            </View>
          )
        } else {
          // Urgent : false, First : false, UserInclude : false
          return (
            <View style={styles.list}>
              <ListItem
                key={i}
                title={l.title}
                titleStyle={styles.title}
                rightElement={this.getImage(l.status, l.isUrgent)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
                containerStyle={styles.roundList}
              />
            </View>
          )
        }
      }
    }
  }

  checkUser(l) {
    var email = global.googleUserEmail;
    for (var i = 0; i < l.activityVolunteers.length; i++) {
      if (email == l.activityVolunteers[i].user.socialId) {
        return true;
      }
    }
    for (var i = 0; i < l.activityUsers.length; i++) {
      if (email == l.activityUsers[i].user.socialId) {
        return true;
      }
    }
    return false;
  }

  editStatus(status, deadline, startTime, endTime) {
    var newStatus = status;
    var date = new Date();
    var givenDeadline = this.parseDate(deadline);
    var givenStartTime = this.parseDate(startTime);
    var givenEndTime = this.parseDate(endTime);

    var year = date.getFullYear() * 100000000;
    var month = this.addZero(date.getMonth() + 1) * 1000000;
    var day = this.addZero(date.getDate()) * 10000;
    var hour = this.addZero(date.getHours()) * 100;
    var minute = this.addZero(date.getMinutes()) * 1;
    var nowDate = year + month + day + hour + minute;
    if (newStatus == 1 && givenDeadline < nowDate) {
      newStatus = 2
    }
    if (newStatus == 2 && givenStartTime < nowDate) {
      newStatus = 3
    }
    if (newStatus == 3 && givenEndTime < nowDate) {
      newStatus = 4
    }
    return newStatus;
  }

  parseDate(date) {
    var splitDash = date.split('-');
    var year = splitDash[0] * 100000000;
    var month = splitDash[1] * 1000000;
    var splitT = splitDash[2].split('T');
    var day = splitT[0] * 10000;
    var splitColon = splitT[1].split(':');
    var hour = splitColon[0] * 100;
    var minute = splitColon[1] * 1;

    return year + month + day + hour + minute;
  }

  addZero(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num + "";
    }

  }

  render() {

    const { data, urgentCheckedData, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {(this.state.id != -1 && this.state.id != 0) &&
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('요청하기', { test: 'test', categoryName: this.state.name, categoryId: this.state.id })
          }}>
            <Text style={styles.button}>
              새로운 활동 추가하기 +
          </Text>
          </TouchableOpacity>
        }
        <View style={styles.box}>
          <View style={styles.name}>
            <Text style={styles.nameText}>{this.state.name}</Text>
            {(this.state.id != -1 && this.state.id != 0 && this.state.interest) ?

              <TouchableOpacity
                onPress={() => {
                  this.setState({ interest: false })
                  this.interestPost(1)
                }}
                style={styles.nameButton}
              >
                <Ionicons name="ios-star" size={24} color="black" />
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => {
                  this.setState({ interest: true })
                  this.interestPost(0)
                }}
                style={styles.nameButton}
              >
                <Ionicons name="ios-star-outline" size={24} color="black" />
              </TouchableOpacity>
            }
          </View>
          <View>
            <SearchBar
              containerStyle={styles.searchContainerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="제목 검색"
              lightTheme
              round
              onChangeText={(text) => {
                this.setState({ search: text });
              }}
              value={this.state.search}
            />
          </View>

          <View style={styles.listBox}>
            {isLoading ?
              (data.map((l, i) => (
                this.createListItem(l, i)
              ))
              ) :
              <ListItem
                key={0}
                title='등록된 활동이 없습니다'
                containerStyle={styles.listFirst}
              />}
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 25,
  },
  searchContainerStyle: {
    width: '70%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderColor: 'transparent',
  },
  inputContainerStyle: {
    backgroundColor: 'transparent',
  },
  urgentText: {
    color: 'red',
    fontWeight: 'bold',
  },
  noActivityList: {
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(29,140,121)',
    backgroundColor: 'rgb(223,244,243)',
    borderColor: 'rgb(29,140,121)',
    borderWidth: 1,
    borderRadius: 50,
    padding: 11,
  },
  box: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 11,
    marginRight: 11,
    borderRadius: 15,
    elevation: 5,
  },
  name: {
    padding: 15,
    flexDirection: 'row',
    marginBottom: 15,
  },
  nameText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(29,140,121)',
  },
  nameButton: {
    color: 'rgb(140,140,140)',
    paddingRight: 5
  },
  listBox: {
    padding: 3,
  },
  listFirst: {

  },
  list: {
    borderTopWidth: 0.5,
    borderColor: 'rgb(220,220,220)',
  },
  roundList: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 3,
    marginBottom: 3,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 50
  },
  roundUserList: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 3,
    marginBottom: 3,
    flexDirection: 'row',
    backgroundColor: 'rgb(223,244,243)',
    borderRadius: 50
  },
  title: {
    margin: 5,
    fontSize: 16,
  },
  imageGroup: {
    flexDirection: 'row',
  },
  statusButton: {
    width: 70,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  arrow: {
    width: 12,
    height: 20,
    resizeMode: 'center',
  }
});
