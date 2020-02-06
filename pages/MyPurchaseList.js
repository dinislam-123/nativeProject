
import React, { Component } from 'react'
import { Image, ScrollView, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
// import { firebasedb } from '../Config/firebaseConnection';
import firebase from 'react-native-firebase'

export default class MyPurchaseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            dataObject: {}
        };
    }
    componentDidMount() {
        firebase.database().ref('Purchase/').orderByChild('buyerEmail').equalTo(this.props.navigation.state.params.passEmail).on('value', (snapshot) => {
            const data = snapshot.val();
            var listData = [];
            snapshot.forEach((data) => {
                var productName = data.val().productName;
                var quantity = data.val().purchaseQty;
                const dataObject = {
                    'ProductName': productName,
                    'Quantity': quantity
                }

                listData.push(dataObject)
                this.setState({ dataList: listData });
            });

        });
    }

    render() {
        console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.fullarea}>
                <ScrollView>
                    <Text style={styles.username}>{this.props.navigation.state.params.passEmail}</Text>
                    <View style={styles.container} >{
                        
                        this.state.dataList.map((item, index) => (
                        <View style={styles.dataContainer}>
                            <Text style={{ fontSize: 20, color: 'white' }}>{item.ProductName}</Text>
                            <Text style={{ fontSize: 20, color: 'white' }}>Price:{item.Quantity}</Text>
                        </View>
                        ))
                    }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    fullarea:{
        margin:10,
            backgroundColor: '#669999',
            height: '95%',
            borderColor:'black',
            borderWidth:1
    },
    container: {
        marginTop: 5,
        alignItems: 'center'
    },
    username:{
        alignSelf:'center',
        color:'red',
        fontSize:15
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',

        justifyContent: 'space-between',
        marginTop: '2%',
        width: '90%',
        padding: 10,
        backgroundColor: 'green',
    },
})