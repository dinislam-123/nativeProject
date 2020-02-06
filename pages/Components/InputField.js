import React from 'react';
import {TextInput} from 'react-native'

export const InputField =({style, onChangeText ,placeholder, autoCapitalize, secureTextEntry})=> {

    return(
            
        <TextInput style={style} onChangeText={onChangeText}  autoCapitalize={autoCapitalize} placeholder={placeholder} secureTextEntry={secureTextEntry} ></TextInput>
   )
}
