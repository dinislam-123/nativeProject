import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {InputField} from './Components/InputField';

console.disableYellowBox=true
export default class DevTools extends Component{
    constructor(props){
        super(props)
        this.state = {date:""}
    }

    render(){

        let fruiteName = [
            {value: 'Banana'},
            {value: 'Mango'},
            {value: 'Pear'},
            {value: 'Orange'},
            {value: 'Apple'}];

        return(
            <SafeAreaView>
                <View style={styles.datepicker}>
                    <DatePicker 
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    format="YYYY-MM-DD"
                    placeholder="Select date"
                    confirmBtnText="OK"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => {this.setState({date: date})}}>
                    </DatePicker>
                </View>
                <View >
                    <Dropdown 
                       
                        // label='Favorite Fruit'
        
                        data={fruiteName} 
                        placeholder="Select Fruite"
                    />
                </View>
                <View>
                    <InputField placeholder="Enter Please" textStyle={styles.inputtext}/>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    datepicker:{
        paddingTop:100,
        alignItems: 'center'
    },
    inputtext:{
        backgroundColor:'green',
        fontSize:40,
        color:'white'


    }
})
