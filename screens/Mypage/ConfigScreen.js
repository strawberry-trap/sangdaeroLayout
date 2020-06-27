import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Dialog from "react-native-dialog";

export default class ConfigScreen extends React.Component {
  state = {
    allActivities: [],
    showList: false,

    // for dialog
    dialogVisible: false, 

    // additional data to send to the web server
    userSelectedActivity: {},
    userSelectedDateTime: null, 
    userSelectedInterestCategory: {},
    serverUrl: '',
  };

  constructor(props) {
    super(props);
    console.log('Config Screen');
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: '#000' }} children='required'>{this.state.userSelectedActivity.title}</Dialog.Title>

          <Dialog.Description>
            {this.status[this.state.userSelectedActivity.status]}
          </Dialog.Description>

          <Dialog.Description>
            마감 기한 : {this.state.userSelectedActivity.deadline}
          </Dialog.Description>

          <Dialog.Description>
            관심사 : {this.state.userSelectedInterestCategory.name}
          </Dialog.Description>

          <Dialog.Description>
            시작시간 : {this.state.userSelectedActivity.startTime}
          </Dialog.Description>

          <Dialog.Description>
            종료시간 : {this.state.userSelectedActivity.endTime}
          </Dialog.Description>

          <Dialog.Description>
            장소 : {this.state.userSelectedActivity.place}
          </Dialog.Description>

          <Dialog.Description>
            세부 내용 : {this.state.userSelectedActivity.content}
          </Dialog.Description>

          <Dialog.Button label="취소" color='gray' onPress={() => { this.setState({ dialogVisible: false }); }} />

        
        </Dialog.Container>

        <View style={styles.box}>
          
          <View style={styles.listBox}>
            <View style={styles.list}>
              <Text style={styles.item}>전화번호 공유 승인</Text>
              <Ionicons
                name='ios-checkmark-circle'
                size={30} 
                style={{ marginTop: 7 }}
                color={'#000'}
                />
            </View>
            <View style={styles.sub}>
              <Text style={styles.subText}>번화번호 공유 동의 약관</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  box: {
    flex:1,
    backgroundColor:'rgb(220,220,220)',
    marginBottom:0,
  },
  listBox: {
    backgroundColor:'#FFF',
    paddingRight:25,
    paddingLeft:25,
  },
  list: {
    flex:1,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection:'row',
    borderTopWidth:0.5,
    borderColor:'rgb(220,220,220)',
  },
  item: {
    flex:1,
    fontSize:20,
    paddingTop:8,
    paddingBottom:8,
  },
  sub: {
    paddingBottom: 20,
  },
  subText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize:15,
    fontWeight:'bold',
    color:'#888',
  },
});
