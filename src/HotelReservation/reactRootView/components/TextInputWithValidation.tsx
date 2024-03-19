import React from "react";
import { TextInput, Text, View, StyleSheet,KeyboardType } from "react-native";
import colors from "../config/colors";
import { useState } from "react";
import defaultStyles from "../config/defaultStyles";
import uuid from 'react-native-uuid';

interface IProps{
    secureTextEntry?: Boolean,
    keyboardType?: KeyboardType, 
    errors: string[], 
    handleTextValue: (value: string)  => void
}

export const TextInputWithValidation = ({ secureTextEntry, keyboardType, errors, handleTextValue }) => {
    //, handleTextValue: (value: string) => void }) => {

    const [isAnyError, setIsAnyError] = useState(false);
    
    return(
        <View>
            { 
                errors !== undefined ?
                
                errors.map((error) => { 
                    if(error){                    
                        console.log(isAnyError);
                        console.log(error);
                        //handleErrorBorder();
                    return(
                        <View key={uuid.v4()}>
                            <Text style={defaultStyles.text10Red}>{error}</Text>
                        </View>
                    )
                    }   
            }): <View />}
            <TextInput 
                secureTextEntry={secureTextEntry} 
                keyboardType={keyboardType} 
                style={errors !== undefined  ? 
                    [{...defaultStyles.textInput}, {...styles.errorBorder}] : 
                    defaultStyles.textInput }
                onChangeText={handleTextValue} 
            />
        </View>
    )
}


const styles = StyleSheet.create({
    errorBorder: {
            borderColor: colors.error,
            borderWidth: 2,        
        },
    });