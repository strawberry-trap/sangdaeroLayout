import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';

// You may use below line when exporting, because 'expo-google-app-auth' doesn't work when the app is released.
// import * as Google from 'expo-google-sign-in';

export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    console.log("[ LoginScreen.js ]");
  }

  _isMounted = false;

  state = {
    userName: '', userEmail: '', userId: '',
    loggedIn: false
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

          this.setState({loggedIn: true });
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
        {this.state.loggedIn && this.props.navigation.navigate('Main')}
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
