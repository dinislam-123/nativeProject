import React from 'react';
import {Button} from 'react-native'

export const Rbutton =({onPress, title, color})=> {

    return(
            
        <Button title={title} onPress={onPress} color={color} ></Button>
   )
}
