import * as React from  'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import defaultStyles from "../config/defaultStyles";

export const Card = ({ contentPair, numberOfPairs }) => (
    <View style={{  ...styles.container, height: numberOfPairs*60+20}}>
        {contentPair.map((content) => {
            return (
                <View>
                    <Text style={{ ...styles.textBorder, ...defaultStyles.text16White}}>{content.title}</Text>
                    <Text style={{ ...styles.textBorder, ...defaultStyles.text16Black}}>{content.text}</Text>
                </View>                
            )
        })}
    </View>   
);


const styles = StyleSheet.create({
    container: {
        width: "75%",
        //height: 45,
        backgroundColor: "#E75874",
        zIndex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 25,
        shadowColor: colors.black,
        shadowRadius: 10,
        elevation: 8,
    },
    textBorder: {
        marginVertical: 5
    }
});
