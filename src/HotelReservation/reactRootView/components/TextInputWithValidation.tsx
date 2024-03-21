import React from "react";
import { TextInput, Text, View, StyleSheet,KeyboardTypeOptions } from "react-native";
import colors from "../config/colors";
import { useState } from "react";
import fontStyles from "../config/StyleSheets/fontStyles";
import uuid from 'react-native-uuid';

interface IProps{
    secureTextEntry?: Boolean,
    keyboardType?: KeyboardTypeOptions, 
    errors: string[], 
    handleTextValue: (value: string)  => void
}

export const TextInputWithValidation = ({ secureTextEntry, keyboardType, errors, handleTextValue }: IProps) => {
    //, handleTextValue: (value: string) => void }) => {

    const [isAnyError, setIsAnyError] = useState(false);
    
    //console.log('errors: ', errors)
    
    return(
        <View>            
            {
                errors && errors.length && errors.length > 0 ?
                errors.map((error) => { 
                    if(error){                    
                        //console.log('errors1: ', isAnyError);
                        //console.log('errors2: ', error);
                        //handleErrorBorder();
                    return(
                        <View key={uuid.v4()} >
                            <Text style={fontStyles.text14White}>{error}</Text>
                        </View>
                    )
                    }   
            }): <View />}
            <TextInput 
                secureTextEntry={secureTextEntry} 
                keyboardType={keyboardType} 
                style={(errors && errors.length && errors.length > 0) ?
                    [{...fontStyles.textInput}, {...styles.errorBorder}] : 
                    fontStyles.textInput }
                onChangeText={handleTextValue} 
            />
        </View>
    )
}


const styles = StyleSheet.create({
    errorBorder: {
            borderColor: colors.darkRed,
            borderWidth: 5,        
        },
    });