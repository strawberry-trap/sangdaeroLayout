import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { MonoText } from '../../components/StyledText';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class BoardScreen extends React.Component {
  status = [
    '매칭 전',
    '매칭 중',
    '매칭 완료',
    '활동 진행중',
    '활동 완료',
    '취소된 활동'
  ];

  title = [
    '활동 1',
    '활동 2',
    '활동 3',
    '활동 4',
    '활동 5',
    '활동 6'
  ];

  list = [
    {
      name:'한동대학교 청소',
      subtitle:'환경미화',
      badgeValue:this.status[0],
      badgeStatus:'error'
    },
    {
      name:'포항 성모병원 차량 지원',
      subtitle:'차량 지원',
      badgeValue:this.status[1],
      badgeStatus:'warning'
    },
    {
      name:'양덕동 주거지 환경 미화',
      subtitle:'환경미화',
      badgeValue:this.status[1],
      badgeStatus:'warning'
    },
    {
      name:'양덕동 거주 어르신 장보기 대행',
      subtitle:'장보기',
      badgeValue:this.status[1],
      badgeStatus:'warning'
    },
    {
      name:'나눔 물건 전달',
      subtitle:'물건 전달',
      badgeValue:this.status[2],
      badgeStatus:'success'
    },
    {
      name:'은퇴 노인 재취업 직업 교육',
      subtitle:'재능기부',
      badgeValue:this.status[2],
      badgeStatus:'success'
    },
    {
      name:'복지관 체육대회 스태프',
      subtitle:'행사 지원',
      badgeValue:this.status[3],
      badgeStatus:'primary'
    },
    {
      name:'포항지역아동센터 선생님',
      subtitle:'아동센터',
      badgeValue:this.status[3],
      badgeStatus:'primary'
    },
    {
      name:'청소년 수련관 심리상담',
      subtitle:'심리상담',
      badgeValue:this.status[3],
      badgeStatus:'primary'
    },
  ];

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          {
            this.list.map((l, i) => (
              <ListItem
                containerStyle={styles.item}
                key={i}
                title={l.name}
                subtitle={l.subtitle}
                badge={{value: l.badgeValue, status: l.badgeStatus}}
                chevron
                onPress={() => this.props.navigation.navigate('활동 내용')}
              />
            ))
          }
        </View>
        <Button 
            title="목록"
            onPress={() => this.props.navigation.goBack()}
            />
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
  item: {
    margin:5,
  },
});
