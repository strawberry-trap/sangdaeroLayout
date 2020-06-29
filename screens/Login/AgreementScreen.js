import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { CheckBox, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

export default class AgreementScreen extends Component {

  constructor(props) {
    super(props);
    console.log("[ AgreementScreen.js ]");
  }

  state = {
    didAgree: false,
    checkedFirst: false,
    checkedSecond: false,
    checkedThird: false,
    page: 1,
    numberFirst: "",
    numberSecond: "",
    numberThird: "",
  }

  toggleCheckBox(state) {
    if (state == true) return false;
    else return true;
  }

  addUser() {
    console.log('Pass this method');
  }

  render() {

    // checkbox) https://react-native-elements.github.io/react-native-elements/docs/checkbox.html#icontype
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/home_back_test.png')} style={styles.background}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
            {this.state.page== 1 ? 
            <View style={styles.box}>
              <View style={styles.listBox}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>개인정보 수집 및 이용 동의 (필수)</Text>
                </View>
                <ScrollView style={styles.listFirst}>
                  <Text>1. 목적 : 이용자 개인 식별, 이용자와의 원활한 의사소통</Text>
                  <Text>2. 항목 : 이름, 로그인 계정, 전화번호</Text>
                  <Text>3. 보유 기간 : 회원 탈퇴 시까지 보유</Text>
                </ScrollView>
                {!this.state.checkedFirst ?
                  <TouchableOpacity
                    onPress={() => {
                      let toggleValue = this.toggleCheckBox(this.state.checkedFirst);
                      this.setState({ checkedFirst: toggleValue })
                    }}
                  >
                    <Text style={styles.disAgreeButton}>
                      동의
                  </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => {
                      let toggleValue = this.toggleCheckBox(this.state.checkedFirst);
                      this.setState({ checkedFirst: toggleValue })
                    }}
                  >
                    <Text style={styles.agreeButton}>
                      동의
                  </Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.line} />
              <View style={styles.listBox}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>개인정보 제공 동의 (필수)</Text>
                </View>
                <ScrollView style={styles.listFirst}>
                  <Text>1. 제공 받는 자 : 활동으로 연결된 이용자</Text>
                  <Text>2. 이용 목적 : 이용자와 봉사자 간의 소통</Text>
                  <Text>3. 항목 : 이름, 전화번호</Text>
                  <Text>4. 보유 기간 : 활동 종료 시까지 보유</Text>
                </ScrollView>
                {!this.state.checkedSecond ?
                  <TouchableOpacity
                    onPress={() => {
                      let toggleValue = this.toggleCheckBox(this.state.checkedSecond);
                      this.setState({ checkedSecond: toggleValue })
                    }}
                  >
                    <Text style={styles.disAgreeButton}>
                      동의
                  </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => {
                      let toggleValue = this.toggleCheckBox(this.state.checkedSecond);
                      this.setState({ checkedSecond: toggleValue })
                    }}
                  >
                    <Text style={styles.agreeButton}>
                      동의
                  </Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.line} />
              <View style={styles.listBox}>
                <Text style={styles.listFirst}>
                  위의 동의서 내용을 충분히 숙지하였으며, 개인정보 수집, 이용, 제공하는 것에 동의합니다
                </Text>
                {(this.state.checkedFirst && this.state.checkedSecond) ?
                <TouchableOpacity
                  onPress={() => this.setState({ page: 2 })}
                >
                  <Text style={styles.agreeButton}>
                    다음
                  </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity disabled={true}>
                  <Text style={styles.disAgreeButton}>
                    다음
                  </Text>
                </TouchableOpacity>
              }
              </View>
             
            </View>
:
            <View style={styles.box}>
              <View style={styles.line} />
              <View style={styles.listBox}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>전화번호 (필수)</Text>
                </View>
                <View style={styles.phoneList}>
                  <TextInput
                    style={styles.phoneText}
                    placeholder='010'
                    maxLength={3}
                    onChangeText={(text) => this.setState({numberFirst:text})}
                    keyboardType={'numeric'}
                  />
                  <Text style={styles.phoneText}>-</Text>
                  <TextInput
                    style={styles.phoneText}
                    placeholder='0000'
                    maxLength={4}
                    onChangeText={(text) => this.setState({numberSecond:text})}
                    keyboardType={'numeric'}
                  />
                  <Text style={styles.phoneText}>-</Text>
                  <TextInput
                    style={styles.phoneText}
                    placeholder='0000'
                    maxLength={4}
                    onChangeText={(text) => this.setState({numberThird:text})}
                    keyboardType={'numeric'}
                  />
                </View>


              </View>
              <View style={styles.line} />
              <View style={styles.listBox}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>별명</Text>
                </View>
                <View style={styles.phoneList}>
                  <TextInput
                    style={styles.nicknameText}
                    placeholder='별명을 적어주세요'
                    maxLength={3}
                  />
                </View>
              </View>
              <View style={styles.line} />

              {(this.state.numberFirst.length >= 3 && this.state.numberSecond.length >= 3 && this.state.numberThird.length >= 4) ?
                <TouchableOpacity
                  onPress={() => {
                    this.addUser();
                    this.props.navigation.navigate('Main')
                  }}
                >
                  <Text style={styles.agreeButton}>
                    다음
                  </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity disabled={true}>
                  <Text style={styles.disAgreeButton}>
                    다음
                  </Text>
                </TouchableOpacity>
              }
            </View>
  }
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow : 1,
    justifyContent : 'center'
  },
  background: {
    flex: 1,
  },
  box: {
    padding: 18,
    backgroundColor: '#FFF',
    marginTop: 35,
    marginBottom: 35,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    elevation: 5,
    
  },
  title: {
    padding: 3,
    flexDirection: 'row',
    marginBottom: 15,
  },
  titleText: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgb(29,140,121)',
  },
  titleButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    color: 'rgb(140,140,140)'
  },
  listBox: {
    padding: 3,
  },
  listFirst: {
    padding: 5,
  },
  check: {
    flex: 1,
    marginTop: 3,
    flexDirection: 'row',
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
  },
  agreeButton: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: 'rgb(29,140,121)',
    color: '#FFF',
  },
  disAgreeButton: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: '#DDD',
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
  phoneList: {
    flexDirection: 'row',
  },
  phoneText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  nicknameText: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 20,
  },
});
