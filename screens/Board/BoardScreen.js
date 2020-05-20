import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { MonoText } from '../../components/StyledText';


export default class BoardScreen extends React.Component {
  status = [
    '매칭 전',
    '매칭중',
    '매칭 완료',
    '활동 진행중',
    '활동 종료',
    '취소된 활동'
  ];

  title = [
    '물건 나눔',
    '차량 지원',
    '말벗',
    '청소',
    '물품 요청',
    '기타'
  ];

  list = [
    {
      name:this.title[0],
      subtitle:this.status[0],
      badgeValue:this.status[0],
      badgeStatus:'error'
    },
    {
      name:this.title[1],
      subtitle:this.status[1],
      badgeValue:this.status[1],
      badgeStatus:'success'
    },
    {
      name:this.title[2],
      subtitle:this.status[2],
      badgeValue:this.status[2],
      badgeStatus:'primary'
    },
    {
      name:this.title[3],
      subtitle:this.status[3],
      badgeValue:this.status[3],
      badgeStatus:'success'
    },
    {
      name:this.title[4],
      subtitle:this.status[4],
      badgeValue:this.status[4],
      badgeStatus:'warning'
    },
    {
      name:this.title[5],
      subtitle:this.status[5],
      badgeValue:this.status[5],
      badgeStatus:'error'
    },
  ];

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          {
            this.list.map((l, i) => (
              <ListItem
                key={i}
                title={l.name}
                subtitle={l.subtitle}
                badge={{value: l.badgeValue, status: l.badgeStatus}}
                chevron
              />
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

BoardScreen.navigationOptions = {
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
  post: {
    backgroundColor: '#CCC',
    padding: 3,
    flexDirection: 'row',
  },
  postTitle: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  postButton: {
    alignSelf: 'flex-end'
  },
});
