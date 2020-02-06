import React, { Component } from 'react'
import { SafeAreaView, ScrollView,TouchableHighlight, Button, StyleSheet, View, Text, TextInput, Alert, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import { firebasedb } from '../Config/firebaseConnection';
import firebase from 'react-native-firebase';

export default class DetailProduct extends Component {
    constructor(props) {
        super(props)
        this.state = { buyQuantity: '' }
    }
    _buyProduct() {

        if (this.state.buyQuantity !== '') {
            if (parseInt(this.props.navigation.state.params.selectedItemDetail.Quantity) < parseInt(this.state.buyQuantity)) {
                Alert.alert('We have No Enough....Quantity')

            }
            else {
                Alert.alert('Alert', 'Are You sure ?',
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel', },
                        { text: 'OK', onPress: () => this._buyPost() },
                    ],
                    { cancelable: false }
                );
            }
        }
        else {
            Alert.alert('Enter Buy Quantity')

        }
    }

    _buyPost = () => {

        var updateVal = parseInt(this.props.navigation.state.params.selectedItemDetail.Quantity) - parseInt(this.state.buyQuantity)
        var key = this.props.navigation.state.params.selectedItemDetail.Key

        // console.log('Update Value====>',updateVal)


        firebase.database().ref('ProductSell/' + key).update({ "RemainingQty": updateVal })
        // console.log('Seller Name====>',this.props.navigation.state.params.selectedItemDetail)
        firebase.database().ref('Purchase/').push({
            productName: this.props.navigation.state.params.selectedItemDetail.ProductName,
            buyerName: this.props.navigation.state.params.selectedItemDetail.SellerName,
            buyerEmail: this.props.navigation.state.params.selectedItemDetail.BuyerEmail,
            purchaseQty: this.state.buyQuantity,
            purchaseDateTime: Date.now(),
            productId: this.props.navigation.state.params.selectedItemDetail.Key
        }).then((data) => {
            Alert.alert('Data Saved....')
            this.props.navigation.navigate('Home');
        }).catch((error) => {
            Alert.alert('Data Cannot Save.')
        })
    }

    render() {
        console.disableYellowBox = true
        return (
            <SafeAreaView style={styles.fullarea}>
                <KeyboardAwareScrollView>
                <View>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logoContainer} source={this.props.navigation.state.params.selectedItemDetail.url} />
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.txt}>Product Name:
                        {" " + this.props.navigation.state.params.selectedItemDetail.ProductName}
                        </Text>
                        <Text style={styles.txt}>Description:
                        {" " + this.props.navigation.state.params.selectedItemDetail.Description}
                        </Text >
                        <Text style={styles.txt}>Price:
                        {" " + this.props.navigation.state.params.selectedItemDetail.Price}
                        </Text>
                        <Text style={styles.txt}>Available Qty:
                        {" " + this.props.navigation.state.params.selectedItemDetail.Quantity}
                        </Text>
                        <Text style={styles.txt}>Bought From:
                        {" " + this.props.navigation.state.params.selectedItemDetail.BoughtFrom}
                        </Text>
                        <TextInput
                            placeholder="Enter Quantity"
                            // autoCapitalize='none'
                            onChangeText={(text) => this.setState({ buyQuantity: text })}
                            style={styles.input}
                        />
                    </View>
                    <View style={{ alignSelf: 'center', width: '90%' }}>
                        <TouchableHighlight onPress={event => { this._buyProduct() }}
                            style={{ backgroundColor: 'blue', height: 40, marginTop: 15 }} >
                            <Text style={styles.btncolor}>Order To Buy</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({

    fullarea: {
        margin: 5,
        // backgroundColor: '#669999',
        backgroundColor:'#52b355',
        height: '95%',
        borderColor: 'black',
        borderWidth: 1
    },

    detail: {
        padding: 30,
        width: '100%',
        height: 300,
        fontSize: 15
    },
    logoContainer: {
        // marginTop: 10,
        width: 200,
        height: 100,
        padding: '5%',
        alignSelf: 'center',
        resizeMode:'contain'
        // paddingBottom: 5
    },
    txt: {
        color: 'blue',
        fontSize: 25
    },
    input: {
        marginTop: 20,
        height: 45,
        borderColor: 'red',
        borderWidth: 2,
        width: '80%',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue',
        paddingLeft: 5,
        backgroundColor: 'white'
    },
    btncolor: {
        paddingTop: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: "center"

    }
})