
import React, { Component } from 'react'
import { Image, ScrollView, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
// import { firebasedb } from '../Config/firebaseConnection';
import firebase from 'react-native-firebase';

export default class BuyProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            dataObject: {},
        };
    }
    componentDidMount() {
        firebase.database().ref('ProductSell/').on('value', (snapshot) => {
            const data = snapshot.val();

            var listData = [];
            snapshot.forEach((data) => {

                var productName = data.val().ProductName;
                var price = data.val().Price;
                var sellerName = data.val().SellerName;
                var buyerEmail = this.props.navigation.state.params.passEmail;
                var boughtFrom = data.val().BoughtFrom;
                var description = data.val().Description;

                var imageurl = data.val().ImageUrl;
                var quantity = data.val().RemainingQty;
                var key = data.key;

                if (parseInt(quantity) > 0) {
                    // console.log(parseInt(quantity))
                    const dataObject = {
                        'ProductName': productName,
                        'Price': price,
                        'SellerName': sellerName,
                        'BuyerEmail': buyerEmail,
                        'Description': description,
                        'BoughtFrom': boughtFrom,
                        'url': imageurl,
                        'Quantity': quantity,
                        'Key': key
                    }
                    // console.log('Data==key==>',data.key)
                    listData.push(dataObject)
                    this.setState({ dataList: listData });
                    // console.log('DataList===>',this.state.dataList)
                }
            });

        });
    }

    _navDetailProduct = (selectedItemDetail) => {
        this.props.navigation.navigate('DetailProduct', { selectedItemDetail: selectedItemDetail });
        // Alert.alert(itemProduct)
    }

    render() {

        console.disableYellowBox = true;
        // console.log('List Data Render===>',listData)
        return (
            <SafeAreaView>
                <ScrollView >
                    <View style={{width:'95%', alignSelf:'center'}} >
                        {
                            this.state.dataList.map((item, index) => {
                                return (

                                    <View >
                                        <TouchableOpacity style={styles.dataContainer}
                                            key={index}
                                            onPress={event => {
                                                // alert(`${index}: ${item}`);
                                                this._navDetailProduct(item);
                                            }}>

                                            <View style={styles.imageStyle}>
                                                <Image style={styles.imageStyle} source={item.url} />
                                                {/* "https://firebasestorage.googleapis.com/v0/b/reactbuysell.appspot.com/o/images%2Feb47ede6-edca-470e-a831-de31410aeca9.jpg?alt=media&token=06d24e3c-a172-4e5c-a28a-3aa71de81794" */}
                                                {/* <Image onPress={()=>this.props.alertItemName(item)} style={styles.logoContainer} source={require('../Image/logo.jpg')} /> */}
                                            </View>
                                            <View style={{paddingLeft:5}}>
                                                <Text style={{ fontSize: 20, color: 'white' }}>{item.ProductName}</Text>
                                                <Text style={{ fontSize: 20, color: 'white' }}>Price:{item.Price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    imageStyle: {
        // paddingRight:5,
        width: 100,
        height: 100,
        resizeMode:'contain',
        paddingBottom:5
    },

    dataContainer: {
        flex: 1,
        flexDirection: "row",
        marginTop: 5,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'green',
    },
})