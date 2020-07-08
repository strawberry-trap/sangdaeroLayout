import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Activity Screen');

    this.state = {
      data: [],
      userData: [],
      isLoading: false,
      userLoading: false,
      donateId: 0,
      donateName:"",
    }

    this.getData('Interest');
    this.getData('User');
  }

  componentDidUpdate(){
    console.log("Update");
    if (this.props.route.params?.listType) {
      this.props.navigation.navigate('활동 목록', { id: this.props.route.params.id, name:this.props.route.params.name, interest: false,});
    }
    if (this.props.route.params?.set) {
      if (this.props.route.params.set) {
        console.log("Get new data");
        this.props.route.params.set= false;
        this.getData('Interest');
        this.getData('User');
      }
    }
  }

  getData(type) {
    var url;
    if (type == 'Interest') {
      url = 'http://saevom06.cafe24.com/interestdata/getAll'
    } else {
      url = "http://saevom06.cafe24.com/userdata/getUser?name=" + global.googleUserName + "&email=" + global.googleUserEmail;
    }
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false
      },
    })
      .then((response) => response.json())
      .then((responseInJson) => {
        if (type == 'Interest') {
          this.setState({ data: responseInJson });
          for (var i = 0; i < responseInJson.length; i++) {
            if (responseInJson[i].id == 1) {
              this.setState({ donateId: responseInJson[i].id })
              this.setState({ donateName: responseInJson[i].name })
            }
          }
        } else {
          var interestedList = [];
          var notInterestedList = [];
          var list = [];
          console.log('user');
          console.log(responseInJson.interestName);
          for (var i = 0; i < responseInJson.interestName.length; i++) {
            for (var j = 0; j < this.state.data.length; j++) {
              console.log(j);
              if (responseInJson.interestName[i] == this.state.data[j].name) {
                console.log(this.state.data[j]);
                interestedList.push(this.state.data[j]);
                this.state.data.splice(j, 1);
                break;
              }
            }
          }

          console.log(interestedList);
          console.log(notInterestedList);

          for (var i = 0; i < interestedList.length; i++)
            list.push(interestedList[i]);
          for (var i = 0; i < notInterestedList.length; i++)
            list.push(notInterestedList[i]);

          console.log(list);

          this.setState({ userData: list });
          console.log(this.state.data);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (type == 'Interest') {
          if (this.state.data.length > 0)
            this.setState({ isLoading: true });
        } else {
          if (this.state.userData.length > 0)
            this.setState({ userLoading: true });
        }
      })
  }

  createListItem(l, i, interested) {
    if (l.id != 1) {
      if (interested) {
        return (
          <ListItem
            key={i + 2}
            title={l.name}
            chevron={{ size: 30 }}
            onPress={() => this.props.navigation.navigate('활동 목록', { id: l.id, name: l.name, interest: true, listType: 0 })}
            rightElement={<Ionicons name="md-heart" size={30} color="#F77" />}
            containerStyle={styles.item}
            titleStyle={styles.text}
          />
        )
      } else {
        return (
          <ListItem
            key={i + 2}
            title={l.name}
            chevron={{ size: 30 }}
            onPress={() => this.props.navigation.navigate('활동 목록', { id: l.id, name: l.name, interest: false, listType: 0 })}
            containerStyle={styles.item}
            titleStyle={styles.text}
          />
        )
      }
      
    }
  }

  render() {
    const { data, userData, isLoading, userLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <ListItem
            key={1}
            title={this.state.donateName}
            chevron={{ size: 30 }}
            onPress={
              () => {
                this.props.navigation.navigate('물건 나눔', { id: this.state.donateId, name: '물건나누기' });
              }}
            containerStyle={styles.itemFirst}
            titleStyle={styles.textFirst}
          />
          <ListItem
            key={2}
            title={'전체 활동'}
            chevron={{ size: 30 }}
            onPress={() => this.props.navigation.navigate('활동 목록', { id: 0, name: '전체 활동', listType: 1 })}
            containerStyle={styles.itemFirst}
            titleStyle={styles.textFirst}
          />
          {userLoading ?
          (userData.map((l, i) => (this.createListItem(l, i, true)))) :
          <View/>
          }
          {isLoading ?
            
            (data.map((l, i) => (this.createListItem(l, i, false))))
            :
            <ListItem
              key={0}
              title='등록된 관심사가 없습니다'
              containerStyle={styles.item}
              titleStyle={styles.text}
            />
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#rgb(220,220,220)',
  },
  contentContainer: {
    paddingTop: 5,
  },
  noActivityList: {
    textAlign: "center",
    fontSize: 20,
  },
  itemFirst: {
    flex: 1,
    padding: 18,
    backgroundColor: 'rgb(29,140,121)',
    margin: 8,
    borderRadius: 10,
    height: 90,
    elevation: 2,
  },
  itemInterested: {
    flex: 1,
    padding: 18,
    backgroundColor: '#FFF',
    margin: 8,
    borderRadius: 10,
    height: 90,
    elevation: 2,
    borderColor: 'rgb(29,140,121)',
    borderWidth:2,
  },
  item: {
    flex: 1,
    padding: 18,
    backgroundColor: '#FFF',
    margin: 8,
    borderRadius: 10,
    height: 90,
    elevation: 2,
  },
  textFirst: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#FFF',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: 'rgb(29,140,121)',
  }
});
