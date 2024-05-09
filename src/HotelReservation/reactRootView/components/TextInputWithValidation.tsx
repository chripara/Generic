import React, { ForwardedRef } from "react";
import { TextInput, Text, View, StyleSheet, 
    KeyboardTypeOptions, 
    ReturnKeyTypeOptions } from "react-native";
import colors from "../config/colors";
import { useState } from "react";
import fontStyles from "../config/StyleSheets/fontStyles";
import uuid from 'react-native-uuid';

interface IProps{
    secureTextEntry?: Boolean,
    keyboardType?: KeyboardTypeOptions, 
    errors?: string[], 
    returnKeyType: ReturnKeyTypeOptions;
    textInputRef?: React.Ref<HTMLDivElement>,
    onSubmitEditing: (text: React.Ref<HTMLDivElement>) => void,
    handleTextValue: (value: string)  => void
}

export const TextInputWithValidation = ({ 
    secureTextEntry, 
    keyboardType, 
    errors, 
    textInputRef, 
    returnKeyType, 
    onSubmitEditing, 
    handleTextValue }: IProps) => {

    const [isAnyError, setIsAnyError] = useState(false);
    
    //console.log('errors: ', errors)
    
    return(
        <View>            
            {
                errors && errors.length && errors.length > 0 ?
                errors.map((error) => { 
                    if(error){
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
                ref={textInputRef}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                style={(errors && errors.length && errors.length > 0) ?
                    [{...fontStyles.textInput}, {...styles.errorBorder}] : 
                    fontStyles.textInput}
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