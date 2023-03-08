import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Dimensions, View, Text } from 'react-native';
import colors from '../config/colors';
import defaultStyles from "../config/defaultStyles";

const width = Dimensions.get('window').width;

export const DualSelector = ({ leftPage, rightPage}) => {
    const [isRight, setIsRight] = useState(false);

    const changePage = () => {
        setIsRight(!isRight);
    }

    return(
        <View style={styles.container}>
            <View style={styles.dualSelectorStyle}>
                <TouchableOpacity 
                    style={{ 
                        ...styles.selectorLeft, 
                        ...isRight ?                         
                        {backgroundColor: colors.primary} : 
                        {backgroundColor: colors.brownish} 
                        }}
                    onPress={() => setIsRight(false)}
                >
                    <Text style={{ ...styles.textStyle, ...defaultStyles.text16White}}>Search room for hotel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ 
                        ...styles.selectorRight, 
                        ...isRight ? 
                        {backgroundColor: colors.brownish} : 
                        {backgroundColor: colors.primary}
                        }}
                    onPress={() => setIsRight(true)}
                    >
                    <Text style={{ ...styles.textStyle, ...defaultStyles.text16White}}>Search room for Date</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                { 
                    isRight 
                    ?
                    rightPage
                    :
                    leftPage
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
    },
    scrollViewContainer: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center"
    },
    dualSelectorStyle: {
        width: width * 0.7,
        alignSelf: 'center',
        flexDirection: 'row',
        height: width * 0.11,      
        marginBottom: width * 0.05,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        shadowColor: colors.black,
        shadowRadius: 2,
        elevation: 10
    },
    changeHotelCard: {
        width: width * 0.75,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    selectorLeft: {
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.white,
        borderRightWidth: 0.25
    },
    selectorRight: {
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,      
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.white,
        borderLeftWidth: 0.25
    },
    textStyle: {
        width: "70%"
    }
});
