import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native';
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

    console.log(this.state.data.activityUsers[0]);

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

  getImage(props) {
    var path;

    switch(props) {
      case 0:
        path = require('../../assets/images/status_0.png');
        break;
      case 1:
        path = require('../../assets/images/status_1.png');
        break;
      case 2:
        path = require('../../assets/images/status_2.png');
        break;
      case 3:
        path = require('../../assets/images/status_3.png');
        break;
      case 4:
        path = require('../../assets/images/status_4.png');
        break;
      default:
        path = require('../../assets/images/status_5.png');
        break;
    }

    return (
      <Image
          source={path}
          style={styles.statusButton}
      />
    )
  }
    


  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.box}>
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>{this.state.data.title}</Text>
              {this.getImage(this.state.data.status)}
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>마감 기한</Text>
                <Text style={styles.content}>{this.state.data.deadline}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>관심사</Text>
                <Text style={styles.content}>{this.state.data.interestCategory.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line}/>
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>담당인원</Text>
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>봉사자</Text>
                <Text style={styles.content}>윤하늘</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>이용자</Text>
                <Text style={styles.content}>김준서</Text>
              </View>
            </View>
          </View>
          <View style={styles.line}/>
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>활동내용</Text>
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>활동기간</Text>
                <View style={styles.date}>
                <Text style={styles.time}>{this.state.data.startTime} ~</Text>
                <Text style={styles.time}>{this.state.data.endTime}</Text>
                </View>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>장소</Text>
                <Text style={styles.content}>경북 포항시 북구 흥해읍 한동로 558</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>세부내용</Text>
                <Text style={styles.content}>어르신에게 말벗 해드리기</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={()=>console.log("add")}>
          <Text style={styles.button}>
            봉사자 지원
          </Text>
        </TouchableOpacity>
        <View style={styles.photoButtons}>
          <TouchableOpacity onPress={()=>console.log("add")}>
            <Text style={styles.startButton}>
              시작 사진 전송
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>console.log("add")}>
            <Text style={styles.endButton}>
              종료 사진 전송
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

/*
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
*/

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 25,
    padding: 3,
  },
  box: {
    flex:1,
    padding:20,
    paddingTop:15,
    paddingBottom:20,
    backgroundColor:'#FFF',
    marginBottom:25,
    marginLeft:8,
    marginRight:8,
    borderRadius:25,
    elevation:2,
  },
  list: {
    marginTop:10,
    marginBottom:10,
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth:1,
    borderColor:'rgb(220, 220, 220)'
  },
  titleList: {
    flexDirection:'row',
    marginBottom: 7,
  },
  title:{
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    fontSize:20,
    fontWeight:'bold',
  },
  dataList:{
    padding:5
  },
  data: {
    flexDirection:'row',
    marginTop:3,
    marginBottom:3,
  },
  header: {
    flex:3,
    fontSize:14,
  },
  content: {
    flex:10,
    fontSize:14,
  },
  date: {
    flex:10,
  },
  time: {
    flex:1,
  },
  statusButton: {
    width:90,
    height:35,
    resizeMode:'contain',
  },
  button: {
    textAlign:'center',
    marginLeft:35,
    marginRight:35,
    fontSize:22,
    color:'#FFF',
    backgroundColor:'rgb(29,140,121)',
    borderRadius:50,
    padding:8,
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent:'center',
  },
  startButton: {
    flex:1,
    textAlign:'center',
    marginLeft:0,
    marginRight:10,
    fontSize:22,
    color:'#FFF',
    backgroundColor:'rgb(1, 192, 99)',
    borderRadius:50,
    padding:8,
  },
  endButton: {
    flex:1,
    textAlign:'center',
    marginLeft:10,
    marginRight:0,
    fontSize:22,
    color:'#FFF',
    backgroundColor:'rgb(29,140,121)',
    borderRadius:50,
    padding:8,
  }
});