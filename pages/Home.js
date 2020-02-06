import React, { Component } from 'react';
import { Image, SafeAreaView,TouchableHighlight, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import firebase from 'react-native-firebase';
import firebasedb from '../Config/firebaseConnection';


export default class Home extends Component {

        _logout = () => {
            firebasedb.auth().signOut();
            this.props.navigation.navigate('Login');
    
        }

    render() {

        console.disableYellowBox=true

        const { navigate } = this.props.navigation;

        return (
            <SafeAreaView style={styles.fullarea}>
                <KeyboardAwareScrollView>

                    <View style={styles.loginStyle}>
                        <Text style={styles.userDisplay}>{this.props.navigation.state.params.passEmail}</Text>

                        <View style={styles.logoContainer}>
                            <Image style={styles.logoContainer} source={require('../Image/logo.jpg')} />
                        </View>

                        {/* <View style={{ backgroundColor: 'blue', width: '80%', borderRadius: 10, marginTop: 20 }}> */}

                        <TouchableHighlight onPress={() => navigate('BuyProductList', { passEmail: this.props.navigation.state.params.passEmail })}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%' }} >
                            <Text style={styles.text}>Product Buy</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => navigate('ProductSell', { passEmail: this.props.navigation.state.params.passEmail })}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%', marginTop: 15 }} >
                            <Text style={styles.text}>Product Sell</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => navigate('MyPurchaseList', { passEmail: this.props.navigation.state.params.passEmail })}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%', marginTop: 15 }} >
                            <Text style={styles.text}>Purchase List</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => navigate('Wallpaper')}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%', marginTop: 15 }} >
                            <Text style={styles.text}>Wallpaper</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => navigate('CameraApp')}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%', marginTop: 15 }} >
                            <Text style={styles.text}>Camera</Text>
                        </TouchableHighlight>


                        <TouchableHighlight onPress={() => this._logout()}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%', marginTop: 15 }} >
                            <Text style={styles.text}>Logout</Text>
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
            // backgroundColor: '#669999',
            // backgroundColor:'#c6cfc9',
            backgroundColor:'#52b355',
            height: '95%',
            borderColor:'black',
            borderWidth:1
    },

    loginStyle: {

        paddingTop: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
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

    userDisplay: {
        textAlign: 'center',
        marginTop: '5%',
        padding: 5,
        width: '80%',
        height: 30,
        fontSize: 20,
        color: 'white',
    },
})


