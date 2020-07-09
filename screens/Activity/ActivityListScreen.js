import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, SearchBar } from 'react-native-elements'
import Dialog from "react-native-dialog";
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
      doingMatch: [],
      finishedMatch:[],
      doingActivity:[],
      finishedActivity:[],
      cancledActivity:[],
      filterList: [],
      isLoading: false,
      search: '',
      filterStatus: 1,
      statusVisible: false,
    }


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
        console.log(responseInJson);
        this.setState({ data: responseInJson });
        this.sortDataByUrgentDateTime(responseInJson, 12); // sort data regarding 'deadline'
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (this.state.data.length > 0)
          this.setState({ isLoading: true });
      })
  }

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

      switch(allActivities[i].status) {
        case 1:
          this.state.doingMatch.push(allActivities[i]);
          break;
        case 2:
          this.state.finishedMatch.push(allActivities[i]);
          break;
        case 3:
          this.state.doingActivity.push(allActivities[i]);
          break;
        case 4:
          this.state.finishedActivity.push(allActivities[i]);
          break;
        default:
          this.state.cancledActivity.push(allActivities[i]);
          break;
      }

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
    this.setList(this.state.filterStatus, this.state.search);
  }

  compareAttribute(a, b) {
    if (a.isUrgent < b.isUrgent) return -1;
    if (a.isUrgent > b.isUrgent) return 1;
    // else
    return 0;
  }

  getImage(props, urgent, type) {
    var path;

    // Allocating path as dynamic will cause error
    switch (props) {
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
      case 5:
        path = require('../../assets/images/status_5.png');
        break;
      default:
        path = require('../../assets/images/status_6.png');
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
        </View>
      )
    } else if (type == 0) {
      return (
        <View style={styles.imageGroup}>
          <Image
            source={path}
            style={styles.statusButton}
          />
        </View>
      )
    } else if (type == 1) {
      return (
        <View style={styles.imageGroup}>
          <Image
            source={path}
            style={styles.filterButton}
          />
        </View>
      )
    } else {
      // Button at dialog list
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({ filterStatus: props})
            this.setState({ statusVisible: false})
            this.setList(props, this.state.search)
          }}
        >
          <View style={styles.imageGroup}>
            <Image
              source={path}
              style={styles.statusListButton}
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

  setList(status, search) {
    var tmplist = [];
    var list = [];
    switch (status) {
      case 1:
        tmplist = this.state.doingMatch;
        console.log('1')
        break;
      case 2:
        tmplist = this.state.finishedMatch;
        console.log('2')
        break;
      case 3:
        tmplist = this.state.doingActivity;
        console.log('3')
        break;
      case 4:
        tmplist = this.state.finishedActivity;
        console.log('4')
        break;
      case 5:
        tmplist = this.state.cancledActivity;
        console.log('5')
        break;
      default:
        tmplist = this.state.data;
        console.log('0')
        break;
    }

    console.log(search);
    for (var i = 0; i < tmplist.length; i++) {
      console.log(tmplist[i].title);
      if (tmplist[i].title.match(search)) {
        list.push(tmplist[i]);
      }
    }
    //console.log(list);
    this.setState({ filterList : list })
  }

  createListItem(l, i) {

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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
                rightElement={this.getImage(l.status, l.isUrgent, 0)}
                onPress={() => this.props.navigation.navigate('활동 내용', { data: l })}
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
      if (email == l.activityVolunteers[i].user.socialId && l.activityVolunteers[i].status == 1) {
        return true;
      }
    }
    for (var i = 0; i < l.activityUsers.length; i++) {
      if (email == l.activityUsers[i].user.socialId && l.activityUsers[i].status == 1) {
        return true;
      }
    }
    return false;
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

  checkInterest(id, interest) {
    if (id == -1 || id == 0) {
      return (<View />)
    } else {
      if (interest) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.setState({ interest: false })
              this.interestPost(1)
            }}
            style={styles.nameButton}
          >
            <Ionicons name="md-heart" size={30} color="#F77" />
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity
            onPress={() => {
              this.setState({ interest: true })
              this.interestPost(0)
            }}
            style={styles.nameButton}
          >
            <Ionicons name="md-heart-empty" size={30} color="#F77" />
          </TouchableOpacity>
        )
      }
    }
  }

  render() {

    const { filterList, isLoading, filterStatus } = this.state;

    const statusList = [1, 2, 3, 4, 5, 6];

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Dialog.Container visible={this.state.statusVisible}>
          <View>
            {this.getImage(0, false, 2)}
            {this.getImage(1, false, 2)}
            {this.getImage(2, false, 2)}
            {this.getImage(3, false, 2)}
            {this.getImage(4, false, 2)}
            {this.getImage(5, false, 2)}
          </View>
        </Dialog.Container>

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
            {this.checkInterest(this.state.id, this.state.interest)}
          </View>
          <View style={{flexDirection:'row'}}>
            <SearchBar
              containerStyle={styles.searchContainerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="제목 검색"
              lightTheme
              round
              onChangeText={(text) => {
                this.setState({ search: text },
                this.setList(this.state.filterStatus, text))
              }}
              value={this.state.search}
            />
            <TouchableOpacity
              style={styles.filterContainer}
              onPress={() => this.setState({statusVisible: true})}
            >
              {this.getImage(filterStatus, false, 1)}
            </TouchableOpacity>
          </View>

          <View style={styles.listBox}>
            {
              !isLoading &&
                <ListItem
                  key={0}
                  title='등록된 활동이 없습니다'
                  containerStyle={styles.listFirst}
                />
              || isLoading &&
                (filterList.map((l, i) => (
                  this.createListItem(l, i)
                )))
            }
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
    paddingTop: 0,
  },
  searchContainerStyle: {
    flex: 2,
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
  filterContainer: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  filterButton: {
    width: 70,
    height: 20,
    resizeMode: 'contain',
  },
  statusListButton: {
    flex: 1,
    padding:25,
    marginBottom: 30,
    resizeMode: 'contain',
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
    marginBottom: 15,
    marginTop: 20,
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
