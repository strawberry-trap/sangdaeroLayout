import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MonoText } from '../../components/StyledText';

import Dialog from "react-native-dialog";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class HomeScreen extends React.Component {

  state = {
    allActivities: [],
    showList: false,

    // for dialog
    dialogVisible: false, 
    isDatePickerVisible: false, // date picker in dialog
    finalConfirmDialog: false,

    // additional data to send to the web server
    userSelectedActivity: {},
    userSelectedDateTime: null, 
    userSelectedInterestCategory: {},
    serverUrl: '',
    type: 0,
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
 
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleConfirm = (date) => {
    this.setState({ userSelectedDateTime: date});
    this.hideDatePicker();
  };

  fetchPost(url, data) {
    // var url = 'http://saevom06.cafe24.com/test/post';
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',

        body: JSON.stringify(data),
      }).then((res) => { });
      console.log(url);
      //console.warn('fetch successful', url);
      console.log(data);
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  }

  constructor(props) {
    super(props);
    this.userMemo='';

    try {
      // get first five activites from server
      let url = "http://saevom06.cafe24.com/activitydata/getActivities"
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {
          this.setState({ allActivities: responseInJson }); // assign data to state variable
          this.setState({ showList: true });
        })
    } catch (e) {
      console.log(e);
    }
  }

  status = [
    'Before matching',
    'During matching',
    'Finish matching',
    'Doing Activity',
    'Finish Activity',
    'Cancled Activity'
  ];
  
  list = [
    {
      name:'1',
      subtitle:this.status[0],
      badgeValue:'1+',
      badgeStatus:'success'
    },
    {
      name:'2',
      subtitle:this.status[1],
      badgeValue:'1+',
      badgeStatus:'success'
    },
    {
      name:'3',
      subtitle:this.status[2],
      badgeValue:'1+',
      badgeStatus:'success'
    },
    {
      name:'4',
      subtitle:this.status[3],
      badgeValue:'1+',
      badgeStatus:'success'
    },
    {
      name:'5',
      subtitle:this.status[4],
      badgeValue:'1+',
      badgeStatus:'success'
    },
    {
      name:'6',
      subtitle:this.status[5],
      badgeValue:'1+',
      badgeStatus:'success'
    },
  ];

  testList =[];

  render() {

    console.disableYellowBox = true;
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
        <View>
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="datetime"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />
        </View>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: 'rgb(1, 192, 99)' }}>{this.state.userSelectedActivity.title}</Dialog.Title>

          <Dialog.Description >
            {global.googleUserName}
          </Dialog.Description>

          <Dialog.Description >
            {this.state.userSelectedActivity.status}
          </Dialog.Description>

          <Dialog.Description >
            {this.state.userSelectedInterestCategory.name}
          </Dialog.Description>

          <Dialog.Description >
            {this.state.userSelectedActivity.deadline}
          </Dialog.Description>

          <Dialog.Input autoFocus underlineColorAndroid='rgb(1, 192, 99)' placeholder="메모를 입력해 주세요." onChangeText={(memo) => { this.userMemo = memo; }}
          ></Dialog.Input>

          <Dialog.Button label="봉사자 지원" title="봉사자 지원" color='rgb(1, 192, 99)' onPress={
            () => {
              this.fetchPost('http://saevom06.cafe24.com/requestdata/register', {
                id: this.state.userSelectedActivity.id, // id of the activity that user chose
                name: 'HyunWoo',//this.props.navigation.getParam('userName', 'invalid name from App: Homescreen.js [in <Dialog>]'),
                email: '21400045@handong.edu',// this.props.navigation.getParam('userEmail', 'invalid email from App: Homescreen.js [in <Dialog>]'),
                memo: this.userMemo,
              });
              this.setState({ dialogVisible: false });
            }
          } />

          <Dialog.Button label="이용자 지원" title="이용자 지원" color='rgb(1, 192, 99)' onPress={
            () => {
              this.fetchPost('http://saevom06.cafe24.com/requestdata/newRegister', { //  ** NEED REST CONTROLLER URL **
                id: this.state.userSelectedActivity.id,
                name: this.props.navigation.getParam('userName', 'invalid name from App: Homescreen.js [in <Dialog>]'),
                email: this.props.navigation.getParam('userEmail', 'invalid email from App: Homescreen.js [in <Dialog>]'),
                memo: this.userMemo,
              });
              this.setState({ dialogVisible: false });
            }
          } />
          <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />
        </Dialog.Container>
          
          <View style={styles.categoryOdd}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Notice</Text>
              <Button 
                title='+'
                style={styles.titleButton}
                onPress={() => this.props.navigation.navigate('Activity', { screen : 'Interest', intial : false})}
                />
            </View>

            <SafeAreaView style={{ flex: 1, alignItems: 'flex-start' }}>
            <FlatList
              data={this.state.allActivities}
              renderItem={
                ({ item }) => (
                  <View style={{ margin: 3, flex:1, flexDirection:'row' }}>
                    <Button
                      title={item.title}
                      buttonStyle={{ height: '100%' }}
                      titleStyle={{ color: 'rgb(1, 192, 99)', fontSize: 23 }}
                      containerStyle={{width: '100%', marginLeft:0}}
                      raised
                      type="outline"
                      onPress={() => {
                        // this.props.navigation.navigate('ActivityListScreen', {data: item}); // code for sending selected data when navigating
                        this.setState({userSelectedActivity:item});
                        this.setState({userSelectedInterestCategory:item.interestCategory});
                        this.setState({ dialogVisible: true });
                      }}
                    />
                  </View>
                )
              }
              keyExtractor={(item) => item.id.toString()}
            >
            </FlatList>
          </SafeAreaView>

          </View>
          <View style={styles.categoryEven}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Received Request</Text>
              <Button title='+' style={styles.titleButton}/>
            </View>
            <View style={styles.list}>
              <Text style={styles.post}>1</Text>
              <Text style={styles.post}>2</Text>
              <Text style={styles.post}>3</Text>
              <Text style={styles.post}>4</Text>
              <Text style={styles.post}>5</Text>
            </View>
          </View>
          <View style={styles.categoryOdd}>
            <View style={styles.title}>
              <Text style={styles.titleText}>My Request</Text>
              <Button title='+' style={styles.titleButton}/>
            </View>
            <View style={styles.list}>
              <Text style={styles.post}>1</Text>
              <Text style={styles.post}>2</Text>
              <Text style={styles.post}>3</Text>
              <Text style={styles.post}>4</Text>
              <Text style={styles.post}>5</Text>
            </View>
          </View>
          <View style={styles.categoryEven}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Sharing</Text>
              <Button title='+' style={styles.titleButton}/>
            </View>
            <View style={styles.list}>
              <Text style={styles.post}>1</Text>
              <Text style={styles.post}>2</Text>
              <Text style={styles.post}>3</Text>
              <Text style={styles.post}>4</Text>
              <Text style={styles.post}>5</Text>
            </View>
          </View>
          <View style={styles.categoryOdd}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Community</Text>
              <Button title='+' style={styles.titleButton}/>
            </View>
            <View style={styles.list}>
              <Text style={styles.post}>1</Text>
              <Text style={styles.post}>2</Text>
              <Text style={styles.post}>3</Text>
              <Text style={styles.post}>4</Text>
              <Text style={styles.post}>5</Text>
            </View>
          </View>
          <View style={styles.categoryEven}>
            <View style={styles.title}>
              <Text style={styles.titleText}>QnA</Text>
              <Button title='+' style={styles.titleButton}/>
            </View>
            <View style={styles.list}>
              <Text style={styles.post}>1</Text>
              <Text style={styles.post}>2</Text>
              <Text style={styles.post}>3</Text>
              <Text style={styles.post}>4</Text>
              <Text style={styles.post}>5</Text>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingTop: 0,
  },
  categoryOdd: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor:"#BBB",
  },
  categoryEven: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor:"#DDD",
  },
  title: {
    padding: 3,
    flexDirection: 'row'
  },
  titleText: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  titleButton: {
    alignSelf: 'flex-end'
  },
  list: {
    padding: 3,
    marginTop: 5,
    backgroundColor: "#999",
  },
  post: {
    padding: 1,
    marginTop: 2,
    backgroundColor: "#777",
  }
});
