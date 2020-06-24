import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { MonoText } from '../../components/StyledText';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class ActivityListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.route.params.id,
      data: [],
      isLoading: true,
    }

    this.status = [
      '매칭 전',
      '매칭 중',
      '매칭 완료',
      '활동 진행중',
      '활동 완료',
      '취소된 활동'
    ];

  }
  
  componentDidMount() {
    fetch('http://saevom06.cafe24.com/activitydata/getActivities?id='+ this.state.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false,
      },
    })
    .then((response) => response.json())
    .then((responseInJson) => {
      this.setState({data:responseInJson});
      console.log(this.state.data);
    })
    .catch((e) => console.log(e))
    .finally(() => {
      this.setState({isLoading:false});
    })
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          { isLoading ? <View/> : (
            data.map((l, i) => (
              <ListItem
                key={i}
                title={l.title}
                subtitle={this.status[l.status]}
                chevron
                onPress={() => this.props.navigation.navigate('활동 내용', {data:data[i]})}
              />
            ))
          )}
        </View>
        <Button 
            title="목록"
            onPress={() => this.props.navigation.goBack()}
            />
      </ScrollView>
    );
  }
}

ActivityListScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 0,
  },
  item: {
    margin:5,
  },
});
