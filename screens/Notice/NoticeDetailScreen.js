import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'; // for image access
import Dialog from "react-native-dialog";

export default class NoticeDetailScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.route.params.data, // single notice data
    };
  };
  
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.box}>
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>{this.state.data.title}</Text>
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
          <View style={styles.line} />
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
          <View style={styles.line} />
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


        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: 'rgb(1, 192, 99)' }}>사진을 업로드해 주세요.</Dialog.Title>
          <View style={{ margin: 30 }}></View>

          {image && <Text style={{ fontSize: 15 }}>
            아래 이미지를 전송하시겠습니까?
          </Text>}
          {image && <View style={{ margin: 10 }}></View>}
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          {image && <View style={[{ width: "50%", margin: 20, backgroundColor: "white" }]}>
            <Button
              buttonStyle={{ backgroundColor: 'orange', height: 40 }}
              titleStyle={{ fontSize: 23 }}

              onPress={() => {
                this.sendPictureToServer(this.state.pictureSendingUrl).then(()=>{
                  Alert.alert('전송 완료!', '확인을 눌러 카테고리 선택 화면으로 돌아갑니다.', [{
                    text: '확인',
                    onPress: () => { 
                      this.setState({dialogVisible:false});
                      this.props.navigation.navigate('활동 목록'); }
                  }]);
                });
 
              }}

              title="전송하기"
              raised
            >
            </Button>

          </View>}

          <Dialog.Button title='지금 사진 촬영' label='지금 사진 촬영' color='rgb(1, 192, 99)' onPress={() => this.takeAndUploadPhotoAsync(this.state.pictureSendingUrl)} />
          <Dialog.Button title="갤러리에서 선택" label="갤러리에서 선택" color='rgb(1, 192, 99)' onPress={() => this.pickImageFromGallery(this.state.pictureSendingUrl)} />
          <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />
        </Dialog.Container>


        {this.state.isUserRelated == 0 && <TouchableOpacity onPress={() => console.log("add")}>
          <Text style={styles.button}>
            봉사자 지원
          </Text>
        </TouchableOpacity>}

        {(this.state.isUserRelated == 0 || this.state.isUserRelated == 0) && <View style={styles.photoButtons}>
          <TouchableOpacity onPress={() => {
            this.setState({pictureSendingUrl : "http://saevom06.cafe24.com/activitydata/uploadStartImg"});
            this.setState({ dialogVisible: true });
          }}>
            <Text style={styles.startButton}>
              시작 사진 전송
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this.setState({pictureSendingUrl : "http://saevom06.cafe24.com/activitydata/uploadEndImg"});
            this.setState({ dialogVisible: true });
          }}>
            <Text style={styles.endButton}>
              종료 사진 전송
            </Text>
          </TouchableOpacity>
        </View>}
      </ScrollView>
    )
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
    flex: 1,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    marginBottom: 25,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 25,
    elevation: 2,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: 'rgb(220, 220, 220)'
  },
  titleList: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataList: {
    padding: 5
  },
  data: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  header: {
    flex: 3,
    fontSize: 14,
  },
  content: {
    flex: 10,
    fontSize: 14,
  },
  date: {
    flex: 10,
  },
  time: {
    flex: 1,
  },
  statusButton: {
    width: 90,
    height: 35,
    resizeMode: 'contain',
  },
  button: {
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: 'rgb(29,140,121)',
    borderRadius: 50,
    padding: 8,
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startButton: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 10,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: 'rgb(1, 192, 99)',
    borderRadius: 50,
    padding: 8,
  },
  endButton: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 0,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: 'rgb(29,140,121)',
    borderRadius: 50,
    padding: 8,
  }
});