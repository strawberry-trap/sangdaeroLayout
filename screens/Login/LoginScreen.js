import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';

// reference) https://reactnative.dev/docs/asyncstorage.html
import { AsyncStorage } from '@react-native-community/async-storage';
import { Base64 } from 'js-base64';

// ** You may use below line when exporting, because 'expo-google-app-auth' doesn't work when the app is released.
// import * as Google from 'expo-google-sign-in';

export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    console.log("[ LoginScreen.js ]");
  }

  _isMounted = false;

  state = {
    userName: '', userEmail: '', userId: '',
    loggedIn: false,
    isExistingUser: false,
  }

  base64Encoding(string){
    return Base64.encode(string);
  }

  async setSession(email, name){

    let encryptedEmail = this.base64Encoding(email);
    let encryptedName = this.base64Encoding(name);

    try {
      await AsyncStorage.multiSet([
        ["email", encryptedEmail],
        ["name", encryptedName],
      ]);
    } catch (e){ console.log(e) }
  }

  async getSession(){

    AsyncStorage.multiGet(['email', 'name']).then((data) => {

      let email = data[0][1];
      let name = data[1][1];
      let session = {"email":email, "name":name};
  
      return session;
  });
  }

  deleteSession(){
    
    let keys = ['email', 'name'];

    AsyncStorage.multiRemove(keys, (err) => {
      console.log('Local storage session is removed.');
  });
  }


  // checks if currently logged in user is existing or not
  checkIfExistingUser(userName, userEmail){

    const url = 'http://saevom06.cafe24.com/'; // *** Restcontroller URL is needed
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // send this data to server to authenticate user
        "userName" : userName,
        "userEmail" : userEmail,
      }),
    }).then((response) => {  // restcontroller should return "true" or "false". Also, you must check if the response data is boolean or string.
      response === true ? this.setState({isExistingUser:true}) : this.setState({isExistingUser:true})
    });

  }

  componentDidMount() {
    this._isMounted = true;
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // behavior: 'web',
        androidClientId: '700723661373-ckna2mf0s53q9bv2q2eelpcneh0jdhg3.apps.googleusercontent.com',
        iosClientId: '700723661373-oomfpjnkd2hifvo77qjj129k7vqhnb4h.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        if (this._isMounted) {
          global.googleUserName = result.user.name;
          global.googleUserEmail = result.user.email;
          this.setState({loggedIn: true }); // now user is logged in.

          // check if existing user or not
          this.checkIfExistingUser(result.user.name, result.user.email);
        }
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } // end of try
    catch (e) {
      return { error: true };
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.loggedIn &&
        <ImageBackground source={require('../../assets/images/login.png')} style={styles.imageBackground}>
          <TouchableOpacity style={styles.button} onPress={() => this.signInWithGoogleAsync()}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/google_logo.png')}
            />
            <Text style={styles.text}>
              Google 아이디로 로그인
            </Text>
            <View style={styles.space}/>
          </TouchableOpacity>
        </ImageBackground>
        }
        {(this.state.loggedIn == true && this.state.isExistingUser == true) && this.props.navigation.navigate('Main')}
        {(this.state.loggedIn == true && this.state.isExistingUser == false) && this.props.navigation.navigate('Agreement')}
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
  imageBackground: {
    flex:1,
    flexDirection:'column-reverse',
    resizeMode:'cover',
  },
  button: {
    margin: 10,
    marginBottom: 95,
    height: 50,
    borderRadius:50,
    borderColor:'#FFF',
    borderWidth:1,
    backgroundColor:'rgba(255,255,255,0.25)',
    flexDirection:'row',
  },
  logo: {
    width:28,
    height:28,
    marginTop:11,
    marginLeft:35,
    marginRight:10,
  },
  space: {
    width:28,
    height:28,
    marginTop:11,
    marginRight:35,
    marginLeft:10,
  },
  text: {
    flex:1,
    fontSize:16,
    paddingLeft:15,
    textAlign:'center',
    textAlignVertical: 'center',
    color:'#FFF',
  }
});
