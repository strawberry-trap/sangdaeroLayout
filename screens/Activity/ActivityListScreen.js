import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-ionicons'

export default class ActivityListScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log('Activity List Screen')

    this.state = {
      id: props.route.params.id,
      name: props.route.params.name,
      data: [],
      urgentCheckedData: [],
      isLoading: false,
    }

    this.getData();
  }

  getData() {

    if (this.state.id == null) {
      var url = 'http://saevom06.cafe24.com/activitydata/getActivitiesForUser?name='+ global.googleUserName + '&email='+global.googleUserEmail;
    } else {
      var url = 'http://saevom06.cafe24.com/activitydata/getActivities?id='+ this.state.id;
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

      if (diff <= 12 && diff >= 0) {
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

    this.setState({ urgentCheckedData: total });
  }

  compareAttribute(a, b) {
    if (a.isUrgent < b.isUrgent) return -1;
    if (a.isUrgent > b.isUrgent) return 1;
    // else
    return 0;

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
        <Image
          source={require('../../assets/images/right_arrow.png')}
          style={styles.arrow}
        />
      </View>
    )
  }

  createListItem(l, i) {

    var urgentTitle = l.title;
    if (l.isUrgent == 1) {
      if (i == 0) {
        return (
          <View>
            <ListItem
              key={i}
              title={urgentTitle}
              titleStyle={styles.title}
              leftElement={<Text style={styles.urgentText}>[긴급]</Text>}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
              containerStyle={styles.listFirst}
            />
          </View>
        )
      } else {
        return (
          <View>
            <ListItem
              key={i}
              title={urgentTitle}
              titleStyle={styles.title}
              leftElement={<Text style={styles.urgentText}>[긴급]</Text>}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
              containerStyle={styles.list}
            />
          </View>
        )
      }
    } else {

      if (i == 0) {
        return (
          <View>
            <ListItem
              key={i}
              title={urgentTitle}
              titleStyle={styles.title}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
              containerStyle={styles.listFirst}
            />
          </View>
        )
      } else {
        return (
          <View>
            <ListItem
              key={i}
              title={urgentTitle}
              titleStyle={styles.title}
              rightElement={this.getImage(l.status)}
              onPress={() => this.props.navigation.navigate('활동 내용', { data: this.state.data[i] })}
              containerStyle={styles.list}
            />
          </View>
        )
      }
    }
  }

  render() {

    const { data, urgentCheckedData, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {this.state.id != null &&
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('요청하기', { test: 'test', categoryName: this.state.name, categoryId: this.state.id })
        }}>
          <Text style={styles.button}>
            새로운 활동 추가하기 +
          </Text>
        </TouchableOpacity>
        }
        <View style={styles.box}>
          <View style={styles.listBox}>
            {isLoading ?
              (urgentCheckedData.map((l, i) => (
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
  urgentText :{
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
  },
  arrow: {
    width: 12,
    height: 20,
    resizeMode: 'center',
  }
});
