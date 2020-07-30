import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Dialog from "react-native-dialog";

export default class ConfigScreen extends React.Component {
  state = {
    // for dialog
    dialogVisible: false,
  };

  constructor(props) {
    super(props);
    console.log('Config Screen');

    this.state = {
      phoneAgree: props.route.params.phoneAgree,
    }
  }

  fetchPost(agree) {
    var url = 'http://saevom06.cafe24.com/userdata/setPhoneAgree';
    var data = {
      name : global.googleUserName,
      email : global.googleUserEmail,
      phoneAgree : agree,
    }
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then((res) => {
        console.log('Change to '+agree);
      });
    } catch (e) {
      console.warn('fetch failed', e, url);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title style={{ color: '#000', fontSize: 35 }} children='required'>
            개인정보 제공 동의
          </Dialog.Title>

          <Dialog.Description style={{fontSize: 25}}>
            1. 제공 받는 자 : 활동으로 연결된 이용자
          </Dialog.Description>

          <Dialog.Description style={{fontSize: 25}}>
            2. 이용 목적 : 이용자와 봉사자 간의 소통
          </Dialog.Description>

          <Dialog.Description style={{fontSize: 25}}>
            3. 제공 항목 : 이름, 전화번호
          </Dialog.Description>

          <Dialog.Description style={{fontSize: 25}}>
            4. 보유 기간 : 활동 종료 시까지 보유
          </Dialog.Description>

          <Dialog.Button label="취소" color='gray'  style={{fontSize: 25}} onPress={() => { this.setState({ dialogVisible: false }); }} />


        </Dialog.Container>

        <View style={styles.box}>
          <View style={styles.listBox}>
            <View style={styles.list}>
              <Text style={styles.item}>전화번호 공유 승인</Text>
              {this.state.phoneAgree ?
                <TouchableOpacity
                  onPress={() => {
                    this.fetchPost(false);
                    this.setState({ phoneAgree: false });
                  }}
                >
                  <Ionicons
                    name='ios-checkmark-circle'
                    size={40}
                    style={{ marginTop: 7 }}
                    color={'#000'}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => {
                    this.fetchPost(true);
                    this.setState({ phoneAgree: true });
                  }}
                >
                  <Ionicons
                    name='ios-checkmark-circle-outline'
                    size={40}
                    style={{ marginTop: 7 }}
                    color={'#000'}
                  />
                </TouchableOpacity>
              }
            </View>
            <TouchableOpacity
              style={styles.sub}
              onPress={() => this.setState({ dialogVisible: true })}
            >
              <Text style={styles.subText}>개인정보 공유 동의 약관</Text>
            </TouchableOpacity>
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
    flex: 1,
    backgroundColor: 'rgb(220,220,220)',
    marginBottom: 0,
  },
  listBox: {
    backgroundColor: '#FFF',
    paddingRight: 25,
    paddingLeft: 25,
  },
  list: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: 'rgb(220,220,220)',
  },
  item: {
    flex: 1,
    fontSize: 35,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sub: {
    paddingBottom: 20,
  },
  subText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#888',
  },
});
