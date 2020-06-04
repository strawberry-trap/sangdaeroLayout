import * as React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup } from 'react-native-elements'

export default class BoardDetailScreen extends React.Component {
  createTwoButtonAlert = () =>
  Alert.alert(
    "시작 사진 전송",
    "",
    [
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "갤러리",
        onPress: () => Alert.alert("지원되었습니다")
      },
      { text: "카메라",
        onPress: () => Alert.alert("지원되었습니다")
      }
    ],
    { cancelable: false }
  );

  submit = () => { // for some examples, they don't use async


        // console.warn(collection); // for debugging

        // HTTP post here
        var url = 'http://saevom06.cafe24.com/test/post';
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstParam: 'yourValue',
                    secondParam: 'yourOtherValue'
                }),
            });
            console.warn(url);
        } catch(e){
            console.warn('fetch failed');
            console.warn(e);
            
        }
        // fetch(url, {
        //     method: 'POST', // or 'PUT'
        //     body: JSON.stringify(collection),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // }).then(result => result.json())
        //     .catch(error => console.error('Error: ', error))
        //     .then(response => console.log('Success', response));
    }


  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={{padding:10}} />
        <View style={styles.title}>
          <Text style={styles.postTitle}>한동대학교 청소</Text>
          <Text style={styles.postCategory}>환경미화</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.postTitle}>마감 기한 : 2020-06-01 14:00</Text>
          <Text style={styles.postCategory}>매칭 전</Text>  
        </View>
        <View style={{paddingTop:30, borderBottomWidth: 1, alignSelf:'stretch'}} />
        <View style={styles.form}>
          <View style={styles.formCategory}>
            <Text style={styles.formName}>봉사자</Text>
            <Text style={styles.formPhone}>전화번호</Text>  
          </View>
          <View style={styles.formCategory}>
            <Text style={styles.formContentName}>김준서</Text>  
            <Text style={styles.formContentPhone}>010-XXXX-XXXX</Text>  
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.formCategory}>
            <Text style={styles.formName}>이용자</Text>
            <Text style={styles.formPhone}>전화번호</Text>  
          </View>
          <View style={styles.formCategory}>
            <Text style={styles.formContentName}>이용호</Text>  
            <Text style={styles.formContentPhone}>010-XXXX-XXXX</Text>  
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>활동 내용</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.contentCategory}>활동 기간</Text>
            <Text style={styles.contentDetail}>2020-06-01 14:00 ~ 2020-06-01 14:30</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.contentCategory}>장소</Text>
            <Text style={styles.contentDetail}>포항시 북구 흥해읍 한동로 558</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.contentCategory}>세부 내용</Text>
            <Text style={styles.contentDetail}>한동대 뉴턴홀 주변 화단 정리</Text>
          </View>
        </View>
        <ButtonGroup
          buttons={['봉사자 지원', '이용자 지원', '목록']}
          containerStyle={{backgroundColor: 'rgb(155, 249, 153)', marginTop:30}}
          textStyle={{color: 'black'}}
          onPress={()=>this.createTwoButtonAlert()}
        />
        <ButtonGroup
          buttons={['시작 사진 전송', '종료 사진 전송']}
          containerStyle={{backgroundColor: 'rgb(155, 249, 153)', marginTop:30}}
          textStyle={{color: 'black'}}
          onPress={()=>Alert.alert(
            "전송하시겠습니까?",
            "사진 부분",
            [
              {
                text: "취소",
                style: "cancel"
              }, 
              {
                text: "전송",
                onPress: () => Alert.alert("전송되었습니다"),
              }
            ]
            )}
        />
      </ScrollView>
    )
  }
}

/*
        <View style={{flexDirection:'row'}}>
          <Button title="봉사자 지원"/>
          <Button title="이용자 지원"/>
          <Button 
            title="목록"
            onPress={() => this.props.navigation.popToTop()}
            />
        </View>
        */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
    alignItems: 'center',
    padding: 3,
  },
  title:{
    flexDirection: 'row',
    paddingStart: 10,
    paddingEnd: 10,
  },
  postTitle: {
    flex: 3,
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(155, 249, 153)',
    fontSize: 18,
    padding: 5,
  },
  postCategory: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(155, 249, 153)',
    fontSize: 18,
    padding: 5,
  },
  form: {
    alignSelf: 'stretch',
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 1,
  },
  formCategory: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  formName: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(155, 249, 153)',
    fontSize: 15,
    padding: 2,
  },
  formPhone: {
    flex: 3,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(155, 249, 153)',
    fontSize: 15,
    padding: 2,
  },
  formContentName: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(215, 252, 214)',
    fontSize: 15,
    padding: 2,
  },
  formContentPhone: {
    flex: 3,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(215, 252, 214)',
    fontSize: 15,
    padding: 2,
  },
  content: {
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  contentTitle: {
    backgroundColor: 'rgb(155, 249, 153)',
    alignSelf: 'stretch',
    fontSize: 15,
    padding: 2,
  },
  contentCategory: {
    backgroundColor: 'rgb(215, 252, 214)',
    alignSelf: 'stretch',
    flex:1,
    fontSize: 13,
    padding: 2,
  },
  contentDetail: {
    backgroundColor: 'rgb(215, 252, 214)',
    alignSelf: 'stretch',
    flex:5,
    fontSize: 13,
    padding: 2,
  },
});