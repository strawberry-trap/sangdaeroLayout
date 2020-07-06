import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('Activity Screen');

    this.state = {
      data: [],
      isLoading: false,
      donateId: "",
    }

    this.getData();
  }

  componentDidUpdate(){
    console.log("Update");
    if (this.props.route.params?.listType) {
      this.props.navigation.navigate('활동 목록', { listType: this.props.route.params.listType, id: this.props.route.params.id, name:this.props.route.params.name});
    }
    if (this.props.route.params?.set) {
      if (this.props.route.params.set) {
        console.log("Get new data");
        this.props.route.params.set= false;
        this.getData();
      }
    }
  }

  getData() {
    fetch('http://saevom06.cafe24.com/interestdata/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false
      },
    })
      .then((response) => response.json())
      .then((responseInJson) => {
        this.setState({ data: responseInJson });
        for (var i = 0; i < responseInJson.length; i++) {
          if (responseInJson[i].name == '물건나누기')
            this.setState({ donateId: responseInJson[i].id })
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (this.state.data.length > 0)
          this.setState({ isLoading: true });
      })
  }

  createListItem(l, i) { // input l is not used?
    if (this.state.data[i].name != '물건나누기') {
      return (
        <ListItem
          key={i + 2}
          title={this.state.data[i].name}
          chevron={{ size: 30 }}
          onPress={() => this.props.navigation.navigate('활동 목록', { id: this.state.data[i].id, name: this.state.data[i].name, listType: 0 })}
          containerStyle={styles.item}
          titleStyle={styles.text}
        />
      )
    }
  }

  render() {
    const { data, isLoading } = this.state;

    

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <ListItem
            key={1}
            title={'물건나누기'}
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
          {isLoading ?
            (data.map((l, i) => (this.createListItem(l, i))))
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
    paddingTop: 15,
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
