import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Image ,TextInput ,TouchableHighlight, StyleSheet, Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { InputField } from './Components/InputField';
import firebasedb from '../Config/firebaseConnection';

// import firebase from 'react-native-firebase';

// let firebaseConfig = {
//   apiKey: "AIzaSyAQk0a1tg1D1_BUHikaepJGCtkYisjb4jo",
//   authDomain: "reactbuysell.firebaseapp.com",
//   databaseURL: "https://reactbuysell.firebaseio.com",
//   projectId: "reactbuysell",
//   storageBucket: "reactbuysell.appspot.com",
//   messagingSenderId: "597664386430",
//   appId: "1:597664386430:web:848f4ec10cd956f0f4372f"
// };
// firebase.initializeApp(firebaseConfig);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      alterEmail: ''

    };
  }

  _loginHandler() {

    this.setState({ alterEmail: this.state.email })
    if ((this.state.email === "") || (this.state.password === "")) 
      { Alert.alert('Enter Email... And Password.') }
    else {
      firebasedb.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {

          this.setState({ email: '' })
          this.props.navigation.navigate('Home', { passEmail: this.state.alterEmail })
          // Alert.alert(this.state.alterEmail)

        })
        .catch((error) => {
          Alert.alert('Failed...to Login')

        });
    }
  }

  _registerHandler() {
    { this.props.navigation.navigate('Registration') }
  }
  render() {
    console.disableYellowBox=true
    // const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.fullarea}>
        <KeyboardAwareScrollView>
        <View style={styles.loginStyle}>
          <View style={styles.logoContainer}>
              <Image style={styles.logoContainer} source={require('../Image/logo.jpg')} />
          </View>

          <Text style={styles.textcolor}>Login Form</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize='none'
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />


          <TextInput placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={true}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => this._loginHandler()}
              style={{ backgroundColor: 'blue', height: 40, width: '40%' }} >
              <Text style={styles.text}>Login</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{ backgroundColor: 'blue', borderColor:'black',height: 40, width: '40%' }}
              onPress={() => this._registerHandler()}>
              <Text style={styles.text}>Signup</Text>
            </TouchableHighlight>
          </View>
        </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({

  fullarea: {
    margin:10,
    backgroundColor:'#52b355',
    height: '95%',
    borderColor:'black',
    borderWidth:1
  },
  logoContainer: {
    // marginTop: 20,
    marginBottom: 20,
    width: 100,
    height: 100,
    // backgroundColor:'red'
},

  text: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: "center"
  },

  loginStyle: {
    paddingTop: '10%',

    justifyContent: 'space-between',
    alignItems: 'center'

  },

  textcolor: {
    fontSize: 30,
    color: 'blue',
    fontWeight: 'bold',
    paddingBottom: 30

  },

  input: {
    marginTop: '5%',
    padding: 10,
    width: '80%',
    height: 40,
    fontSize: 20,
    borderColor: 'blue',
    borderWidth: .5,
    backgroundColor: 'white',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    width: '80%',
  },
})


