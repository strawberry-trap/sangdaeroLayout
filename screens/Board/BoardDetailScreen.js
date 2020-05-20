import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Card } from 'react-native-elements'

export default function BoardDetailScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.title}>
        <Text style={styles.postTitle}>제목</Text>
        <Text style={styles.postCategory}>상태</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.postCategory}>카테고리</Text>
        <Text style={styles.postTitle}></Text>
        <Text style={styles.postCategory}>마감시간</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>봉사자</Text>
          <Text style={styles.formContent}>전화번호</Text>  
        </View>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>김준서</Text>  
          <Text style={styles.formContent}>010-XXXX-XXXX</Text>  
        </View>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>권현우</Text>  
          <Text style={styles.formContent}>010-XXXX-XXXX</Text>  
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>이용자</Text>
          <Text style={styles.formContent}>전화번호</Text>  
        </View>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>이준섭</Text>  
          <Text style={styles.formContent}>010-XXXX-XXXX</Text>  
        </View>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>윤하늘</Text>  
          <Text style={styles.formContent}>010-XXXX-XXXX</Text>  
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.postContent}>활동 내용</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{flex:1}}>시간</Text>
          <Text style={{flex:5}}>2020-05-19 01:00 ~ 2020-05-19 03:00</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{flex:1}}>위치</Text>
          <Text style={{flex:5}}>포항시 북구 흥해흡 한동로 558</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{flex:1}}>세부 내용</Text>
          <Text style={{flex:5}}>어플리케이션 개발</Text>
        </View>
        <View>
          <Text>
            지도 위치
          </Text>
        </View>
      </View>
      <View style={{flexDirection:'row'}}>
        <Button title="봉사자 지원"/>
        <Button title="이용자 지원"/>
        <Button title="취소"/>
        <Button title="목록"/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
  contentContainer: {
    paddingTop: 0,
    alignItems: 'center',
    padding: 3,
  },
  title:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
  },
  postCategory: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  postTitle: {
    flex: 3,
    alignSelf: 'flex-start'
  },
  content: {
    flex: 3,
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  postContent: {
    backgroundColor: '#999',
    alignSelf: 'center',
  },
  account: {
    flex: 1,
    backgroundColor: '#BBB',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  accountMessage: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#999',
  },
  form: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  formCategory: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#999'
  },
  formTitle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#777'
  },
  formContent: {
    flex: 3,
    alignSelf: 'stretch',
    backgroundColor: '#777'
  },
});