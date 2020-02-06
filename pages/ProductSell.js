import React, { Component } from 'react';
import { TouchableHighlight, AsyncStorage, Image, TextInput, Button, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { firebasedb } from '../Config/firebaseConnection';

import firebase from 'react-native-firebase'

import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4';
import { Dropdown } from 'react-native-material-dropdown';


var downloadImageUri = '';
const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
const ImageRow = ({ image, windowWidth, popImage }) => (
    <View>
        <Image
            source={{ uri: image }}
            style={[styles.img, { width: windowWidth / 2 - 15 }]}
            onError={popImage}
        />
    </View>
);

var gImageUrl = "";
export default class ProductSell extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ProductName: '',
            Description: '',
            Price: '',
            BoughtFrom: '',
            Quantity: '',
            DateTime: '',
            imgSource: require("../Image/logo.jpg"),
            uploading: false,
            progress: 0,
            images: []
        };
    }

    _saveProduct() {

        // console.log('savegImageUrl====>', gImageUrl);

        const { navigate } = this.props.navigation;
        var sellerName = "";
        var passEmail = this.props.navigation.state.params.passEmail;
        var productName = this.state.ProductName;
        var description = this.state.Description;
        var price = this.state.Price;
        var boughtFrom = this.state.BoughtFrom;
        var quantity = this.state.Quantity;
        var imageurl = gImageUrl;

        firebase.database().ref('User/').orderByChild('email').equalTo(passEmail).on('value', function (snapshot) {
            const data = snapshot.val();
            var listData = [];

            snapshot.forEach((data) => {
                sellerName = data.val().company.trim();

                firebase.database().ref('ProductSell/').push({
                    'SellerName': sellerName,
                    'SellerEmail': passEmail,
                    'ProductName': productName,
                    'Description': description,
                    'Price': price,
                    'BoughtFrom': boughtFrom,
                    'DateTime': Date.now(),
                    'RemainingQty': quantity,
                    'TotalQty': quantity,
                    'IsDeleted': false,
                    "ImageUrl": imageurl
                }).then((data) => {
                    Alert.alert("Saved the Product Successfully.")
                    navigate('Home')
                }).catch((error) => {
                    console.log("Error===>", error);
                    // Alert.alert('Cannot write data')
                })
            });
        });
    }
    _cameraHandler() {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('You cancelled image picker 😟');
            } else if (response.error) {
                alert('And error occured: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    imgSource: source,
                    imageUri: response.uri
                });
                //upload image to firebase storage..
                this.uploadImage();
            }
        });
    }

    uploadImage = () => {

        const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });

        firebase
            .storage()
            .ref(`images/${filename}`)
            .putFile(this.state.imageUri)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    let state = {};
                    state = {
                        ...state,
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                    };
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        const allImages = this.state.images;
                        allImages.push(snapshot.downloadURL);
                        // console.log('download= url===>',snapshot.downloadURL)
                        state = {
                            ...state,
                            uploading: false,
                            imgSource: '',
                            imageUri: '',
                            progress: 0,
                            images: allImages
                        };
                        gImageUrl = allImages;
                    }
                    this.setState(state);
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
    }
    render() {

        console.disableYellowBox=true

        //     // const { navigate } = this.props.navigation;

        return (
            <SafeAreaView style={styles.fullarea}>
                <KeyboardAwareScrollView>
                    <Text style={styles.title}>Product Sell Information</Text>

                    <View style={styles.SellStyle}>

                        <View style={styles.logoContainer}>

                            {/* <Image style={styles.logoContainer} source={require('../Image/logo.jpg')} /> */}
                            <Image style={styles.logoContainer} source={this.state.imgSource} />
                        </View>

                        <TouchableHighlight onPress={() => this._cameraHandler()}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%', marginTop: 15 }} >
                            <Text style={styles.text}>Photo</Text>
                        </TouchableHighlight>

                        <TextInput placeholder="Product Name"
                            onChangeText={(text) => { this.setState({ ProductName: text }) }}
                            style={styles.input} />

                        <TextInput placeholder="Description"
                            onChangeText={(text) => { this.setState({ Description: text }) }}
                            style={styles.input} />

                        <TextInput placeholder="Price $"
                            onChangeText={(text) => { this.setState({ Price: text }) }}
                            style={styles.input} />

                        <TextInput placeholder="Bought From(Optional)"
                            onChangeText={(text) => { this.setState({ BoughtFrom: text }) }}
                            style={styles.input} />

                        <TextInput placeholder="Quantity"
                            onChangeText={(text) => { this.setState({ Quantity: text }) }}
                            style={styles.input} />

                        <TouchableHighlight onPress={() => this._saveProduct()}
                            style={{ backgroundColor: 'blue', height: 40, width: '80%', marginTop: 15 }} >
                            <Text style={styles.text}>Product Post</Text>
                        </TouchableHighlight>

                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
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


    SellStyle: {
        paddingTop: '1%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        paddingTop: 5,
        textAlign: 'center',
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20
    },

    logoContainer: {
        marginTop: 10,
        width: '90%',
        height: 200,
        alignItems: 'center',
        paddingBottom: 5,
        resizeMode:'contain'
    },

    input: {
        marginTop: '2%',
        padding: 5,
        width: '80%',
        height: 40,
        fontSize: 20,
        borderColor: 'black',
        borderWidth: .5,
        backgroundColor: 'white'
    },


    text: {
        paddingTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: "center"
    },
});
