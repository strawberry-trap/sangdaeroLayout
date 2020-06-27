import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class AgreementScreen extends Component {

  constructor(props){
    super(props);
    console.log("[ AgreementScreen.js ]");
  }

  state = {
    didAgree : false,
    checkedFirst : false,
    checkedSecond: false,
    checkedThird: false,
  }

  toggleCheckBox(state){
    if (state == true) return false;
    else return true;
  }

  checkIfAgreed(){
      if ((this.state.checkedFirst == false || this.state.checkedSecond == false)) return 0; // mandatory checkboxes are not clicked.
      if ((this.state.checkedFirst == true && this.state.checkedSecond == true) && this.state.checkedThird == false) return 1; // only mandatory checkboxes are clicked
      if ((this.state.checkedFirst == true && this.state.checkedSecond == true) && this.state.checkedThird == true) return 2; // all checkboxes are clicked
      else return -1;
  }

  render() {

    // checkbox) https://react-native-elements.github.io/react-native-elements/docs/checkbox.html#icontype
    return (
      <View style={styles.container}>

        <View>
            <Text>첫 번째 약관 내용</Text>
            <CheckBox
                title='위 약관에 동의합니다.    (필수)'
                checkedIcon='check-square'
                uncheckedIcon='square-o'
                onPress={()=>{
                    let toggleValue = this.toggleCheckBox(this.state.checkedFirst);
                    this.setState({checkedFirst:toggleValue})
                }}
                checked={this.state.checkedFirst}>
            </CheckBox>
        </View>

        <View>
            <Text>두 번째 약관 내용</Text>
            <CheckBox
                title='위 약관에 동의합니다.    (필수)'
                checkedIcon='check-square'
                uncheckedIcon='square-o'
                onPress={()=>{
                    let toggleValue = this.toggleCheckBox(this.state.checkedSecond);
                    this.setState({checkedSecond:toggleValue})
                }}
                checked={this.state.checkedSecond}>
            </CheckBox>
        </View>

        <View>
            <Text>세 번째 약관 내용</Text>
            <CheckBox
                title='위 약관에 동의합니다.    (선택)'
                checkedIcon='check-square'
                uncheckedIcon='square-o'
                onPress={()=>{
                    let toggleValue = this.toggleCheckBox(this.state.checkedThird);
                    this.setState({checkedThird:toggleValue})
                }}
                checked={this.state.checkedThird}>
            </CheckBox>
        </View>

            <Button 
                title="위 내용들을 확인하였으며, 동의합니다." 
                onPress={()=>{
                    const result = this.checkIfAgreed();
                    if (result > 0){ // user agreed, proceed to HomeScreen
                        Alert.alert("회원 가입 되었습니다!\n [추가 멘트 넣기]");
                        this.props.navigation.navigate('Main')
                    } else if (result == 0) { // user did not agree mandatory terms
                        Alert.alert("필수 약관에 동의해 주세요.");
                    } else {}  // should never reach else statement
                }}
            ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
