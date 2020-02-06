import React, { Component } from 'react';
import { SafeAreaView, TextInput ,TouchableHighlight, StyleSheet, Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { firebasedb } from '../Config/firebaseConnection';
import firebase from 'react-native-firebase';
import { ScrollView } from 'react-native-gesture-handler';

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


export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      age: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    };
  }

  _registerHandler() {

    if (this.state.company !== '' || this.state.age !== '' ||
      this.state.email !== '' || this.state.password !== '' || this.state.phone !== '' || this.state.address !== '') {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {

          firebasedb.database().ref('User/').push({

            company: this.state.company,
            age: this.state.age,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            address: this.state.address
            // ID:key
          })
          Alert.alert('Data has been Saved..')
          this.props.navigation.navigate('Home', { passEmail: this.state.email })
        })
        .catch((error) => {
          Alert.alert('Error to Create User...')
        });
    }
    else {
      Alert.alert('Please FillUp All Information..')
    }
  }

  render() {
    // const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.fullarea}>
        <KeyboardAwareScrollView>
        <View style={styles.loginStyle}>

          <Text style={styles.textcolor}>Registration Form</Text>
          <TextInput
            placeholder="Name / Company"
            onChangeText={(text) => { this.setState({ company: text }) }}
            style={styles.input} />

          <TextInput
            onChangeText={(text) => { this.setState({ age: text }) }}
            placeholder="How Old Are You?"
            style={styles.input} />

          <TextInput
            onChangeText={(text) => { this.setState({ email: text }) }}
            placeholder="Email" style={styles.input} />

          <TextInput
            onChangeText={(text) => { this.setState({ password: text }) }}
            placeholder="Password" secureTextEntry={true} style={styles.input} />

          <TextInput
            onChangeText={(text) => { this.setState({ phone: text }) }}
            placeholder="Phone (Optional)" style={styles.input} />

          <TextInput
            onChangeText={(text) => { this.setState({ address: text }) }}
            placeholder="Address (Optional)" style={styles.input} />

          <TouchableHighlight onPress={() => this._registerHandler()}
            style={{ backgroundColor: 'blue', width: '80%', height: 40, marginTop: 20 }} >
            <Text style={styles.text}>Registration</Text>
          </TouchableHighlight>
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

  loginStyle: {

    paddingTop: '15%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'


  },
  textcolor: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    paddingBottom: 20

  },

  emailText: {
    backgroundColor: 'white'

  },
  text: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: "center"
  },

  input: {
    marginTop: '3%',
    padding: 5,
    width: '80%',
    height: 40,
    fontSize: 20,
    borderColor: 'black',
    borderWidth: .5,
    backgroundColor: 'white'
  },

})


