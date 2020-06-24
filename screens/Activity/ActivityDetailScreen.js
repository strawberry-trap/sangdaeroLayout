import * as React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup } from 'react-native-elements'

export default class ActivityDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.route.params.data,
    };

    this.status = [
      '매칭 전',
      '매칭 중',
      '매칭 완료',
      '활동 진행중',
      '활동 완료',
      '취소된 활동'
    ];




    if (this.state.data.deadline.charAt(4) != '년') {
      if (this.state.data.deadline == null) {
        if (this.state.data.startTime == null) {
          this.state.data.deadline = '없음';
        } else {
          this.state.data.deadline = this.state.data.startTime;
        }
      }
  
      if (this.state.data.deadline != '없음') {
        this.state.data.deadline = this.parseDate(this.state.data.deadline);
      }
  
      this.state.data.startTime = this.parseDate(this.state.data.startTime);
      this.state.data.endTime = this.parseDate(this.state.data.endTime);
    }
    
  };

  parseDate(date) {
    console.log(date);
    var splitDash = date.split('-');
      
    var year = splitDash[0] + '년 ';
    var month = splitDash[1] + '월 ';

    var splitT = splitDash[2].split('T');

    var day = splitT[0] + '일 ';

    var splitColon = splitT[1].split(':');
    var hour = splitColon[0] + '시 ';
    var minute = splitColon[1] + '분';

    return year + month + day + hour + minute;
  }

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
        var url = 'http://saevom06.cafe24.com/activitydata/getActivities';
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(
              (res)=> res.json())
              .then((resJson) => {
                console.log(resJson);
              })
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
          <Text style={styles.postTitle}>{this.state.data.title}</Text>
          <Text style={styles.postCategory}>{this.state.data.interestCategory.name}</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.postTitle}>마감 기한 : {this.state.data.deadline}</Text>
          <Text style={styles.postCategory}>{this.status[this.state.data.status]}</Text>  
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
            <Text style={styles.contentDetail}>{this.state.data.startTime} ~ {this.state.data.endTime}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.contentCategory}>장소</Text>
            <Text style={styles.contentDetail}>{this.state.data.place}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.contentCategory}>세부 내용</Text>
            <Text style={styles.contentDetail}>{this.state.data.content}</Text>
          </View>
        </View>
        <ButtonGroup
          buttons={['봉사자 지원', '이용자 지원', '목록']}
          containerStyle={{backgroundColor: 'rgb(155, 249, 153)', marginTop:30}}
          textStyle={{color: 'black'}}
          onPress={()=>this.submit()}
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

function ButtonList(type) {
  switch(type) {
    case 'unRegister':
      console.log('UnRegister');
      break;
    case 'user':
      console.log('User');
      break;
    case 'volunteer':
      console.log('Volunteer');
      break;
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