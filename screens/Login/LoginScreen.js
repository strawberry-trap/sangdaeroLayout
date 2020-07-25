import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in'; // *** Current version only works for android.

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    console.log("[ LoginScreen.js ]");
    global.loggedIn = false;
  }

  state = {
    user: null,
    userName: '',
    userEmail: '',
    isExistingUser: true,
    isProcedureCompleted: false,
  }

  componentDidMount() {
    this.initAsync();
  }

  // google sign in for standalone apps
  initAsync = async () => {

    // for android
    const clientId = '700723661373-oomfpjnkd2hifvo77qjj129k7vqhnb4h.apps.googleusercontent.com';
    /*
    in app.json, 
    Note that if you've enabled Google Play's app signing service, you will need to grab their app signing certificate in production rather than the upload certificate returned by expo fetch:android:hashes. You can do this by grabbing the signature from Play Console -> Your App -> Release management -> App signing, and then going to the API Dashboard -> Credentials and adding the signature to your existing credential.
    */
    
    try {
      await GoogleSignIn.initAsync({
        behavior:"web",
        androidStandaloneAppClientId: clientId,
        scopes: ['profile', 'email'],
      });
      this._syncUserWithStateAsync();
    } catch (e) {
      alert('GoogleSignIn.initAsync(): ' + e);
    }
  };

  _syncUserWithStateAsync = async () => {

    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });

    var fullName = user.lastName + user.firstName;

    global.googleUserName = fullName;
    global.googleUserEmail = user.email;
    global.loggedIn = true; // now user is logged in.

    this.checkIfExistingUser(fullName, user.email);
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {

    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  // checks if currently logged in user is existing or not
  checkIfExistingUser(userName, userEmail) {

    // ser?name=" + global.googleUserName + "&email=
    const url = 'http://saevom06.cafe24.com/userdata/checkNewUser?name=' + userName + "&email=" + userEmail;

    return fetch(url, {
      method: 'GET',
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false,
      },
    })
      .then((response) => response.json())
      .then((responseInJson) => {
        console.log(responseInJson); // if server returns false, it means the user is already saved in Database.
        responseInJson == false || responseInJson == "false" ? this.setState({ isExistingUser: true }) : this.setState({ isExistingUser: false })

        this.setState({ isProcedureCompleted: true });
      })
      .catch((e) => console.log(e))
  }

  componentDidUpdate() {
    if (this.state.isProcedureCompleted && global.loggedIn == true && this.state.isExistingUser == false) {
      this.props.navigation.navigate('Agreement');
    }
    if (this.state.isProcedureCompleted && global.loggedIn == true && this.state.isExistingUser == true) {
      this.props.navigation.navigate('Main');
    }
  }

  render() {

    // for debugging, move to homeScreen right away
    global.googleUserName = "권현우";
    global.googleUserEmail = "21400045@handong.edu";
    global.loggedIn = true;

    this.props.navigation.navigate('Main');

    return (
      <View style={styles.container}>
        {!global.loggedIn &&
          <ImageBackground source={require('../../assets/images/login.png')} style={styles.imageBackground}>
            <TouchableOpacity style={styles.button} onPress={this.signInAsync}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/google_logo.png')}
              />
              <Text style={styles.text}>
                Google 아이디로 로그인
            </Text>
              <View style={styles.space} />
            </TouchableOpacity>
          </ImageBackground>
        }
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
    flex: 1,
    flexDirection: 'column-reverse',
    resizeMode: 'cover',
  },
  button: {
    margin: 10,
    marginBottom: 95,
    height: 50,
    borderRadius: 50,
    borderColor: '#FFF',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    flexDirection: 'row',
  },
  logo: {
    width: 28,
    height: 28,
    marginTop: 11,
    marginLeft: 35,
    marginRight: 10,
  },
  space: {
    width: 28,
    height: 28,
    marginTop: 11,
    marginRight: 35,
    marginLeft: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFF',
  }
});