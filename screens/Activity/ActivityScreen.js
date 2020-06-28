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
        this.setState({ isLoading: false });
      })
  }

  createListItem(l, i) { // input l is not used?
    if (this.state.data[i].name != '물건나누기') {
      return (
        <ListItem
          key={i + 1}
          title={this.state.data[i].name}
          chevron={{ size: 30 }}
          onPress={() => this.props.navigation.navigate('활동 목록', { id: this.state.data[i].id, name: this.state.data[i].name })}
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
        { (this.state.data.length) > 0 ? <View>
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
          {isLoading ?
            <View />
            :
            (data.map((l, i) => (this.createListItem(l, i))))
          }
        </View> : 
        <View>
          <View style={{margin:10}}></View>
          <Text style={styles.noActivityList}>
            등록된 관심사가 없습니다.
          </Text>  
        </View>}
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
  noActivityList:{
    textAlign:"center",
    fontSize:20,
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
