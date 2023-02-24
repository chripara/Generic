import { useState } from  'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import defaultStyles from "../config/defaultStyles";
import { ArrowButton } from './ArrowButton';
import colors  from '../config/colors';

const width = Dimensions.get('window').width;

export const Calendar = ({ date, setDate }) => {
    var tempDate = new Date();
    tempDate.setMonth(date.getMonth());
    tempDate.setFullYear(date.getFullYear());

    const changeYear = (change) => {
        if(change === "-")   
        {
            tempDate.setDate(1);
            tempDate.setMonth(date.getMonth());
            tempDate.setFullYear(tempDate.getFullYear() - 1);
            setDate(tempDate);
            console.log("Date ff:" + tempDate);
        }
        if(change === "+")
        {
            tempDate.setDate(1);
            tempDate.setMonth(date.getMonth());
            tempDate.setFullYear(tempDate.getFullYear() + 1);
            setDate(tempDate);
            console.log("Date ff:" + tempDate);
        }            
    }
    
    const changeMonth = (change) => {
        if(change === "-")
        {
            tempDate.setDate(1);
            tempDate.setFullYear(tempDate.getFullYear());
            tempDate.setMonth(date.getMonth() - 1);
            setDate(tempDate);    
            console.log("Date ff:" + tempDate);
        }
        if(change === "+")
        {
            tempDate.setDate(1);
            tempDate.setFullYear(tempDate.getFullYear());
            tempDate.setMonth(date.getMonth() + 1);
            setDate(tempDate); 
            console.log("Date ff:" + tempDate);
        }
    }    

    const renderDateGrid = () => {
        tempDate.setDate(1);
        const firstDayOfMonth = tempDate.getDay();        
        var dates = new Array(35);
        var currentEndOfMonth = 0;
        dates[firstDayOfMonth] = 1;
        console.log(tempDate);
        console.log(tempDate.getMonth());
        if(tempDate.getMonth() - 1 === 1 ){

            for(var i = firstDayOfMonth-1 ; i >= 0 ; i--)
            {
                dates[i] = 28 - firstDayOfMonth + 1 + i ;
            }
        }
        else if(
            (tempDate.getMonth() - 1)  === 0 ||
            (tempDate.getMonth() - 1)  === 2 ||
            (tempDate.getMonth() - 1)  === 4 ||
            (tempDate.getMonth() - 1)  === 6 ||
            (tempDate.getMonth() - 1)  === 7 ||
            (tempDate.getMonth() - 1)  === 9 ||
            (tempDate.getMonth() - 1)  === 11 
        ) {
            for(var i = firstDayOfMonth-1 ; i >= 0 ; i--)
            {
                dates[i] = 31 - firstDayOfMonth + 1 + i ;
            }
        }
        else {
            for(var i = firstDayOfMonth-1 ; i >= 0 ; i--)
            {
                dates[i] = 30 - firstDayOfMonth + 1 + i ;
            }
        }

        if(tempDate.getMonth() === 1){

            for(var i = 2 ; i <= 28 ; i++)
            {
                dates[firstDayOfMonth + i - 1] = i;
            }
            currentEndOfMonth = 28;
        }
        else if(
            (tempDate.getMonth())  === 0 ||
            (tempDate.getMonth())  === 2 ||
            (tempDate.getMonth())  === 4 ||
            (tempDate.getMonth())  === 6 ||
            (tempDate.getMonth())  === 7 ||
            (tempDate.getMonth())  === 9 ||
            (tempDate.getMonth())  === 11 
        ) {

            for(var i = 2 ; i <= 31 ; i++)
            {
                dates[firstDayOfMonth + i - 1] = i;
            }
            currentEndOfMonth = 31;
        }
        else {

            for(var i = 2 ; i <= 30 ; i++)
            {
                dates[firstDayOfMonth + i - 1] = i;
            }
            currentEndOfMonth = 30;
        }

        for(var i = (firstDayOfMonth + currentEndOfMonth) ; i < 35 ; i++)
        {
            dates[i] = i - firstDayOfMonth - currentEndOfMonth + 1; 
        }

        console.log(dates);

        return(
            <View>

            </View>
        );
    }

    const monthNames = ["Jan", "Febr", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    return (
        <View style={styles.container}>
            <View style={styles.calendarArrowContainer}>
                <View style={styles.arrows}>
                    <ArrowButton 
                        attitude={"left"}
                        size={"medium"} 
                        onClick={() => {
                            changeMonth("-");
                            // console.log(tempDate);
                            console.log("Date f:" + date);
                        }}
                    />
                    <Text style={defaultStyles.text20White}>{monthNames[date.getMonth()]}</Text>
                    <ArrowButton 
                        attitude={"right"}
                        size={"medium"}
                        onClick={() => {
                            changeMonth("+");
                            // console.log(tempDate);
                            console.log("Date f:" + date);
                        }}
                    />
                </View>
                <View style={styles.arrows}>
                    <ArrowButton 
                        attitude={"left"}
                        size={"medium"}
                        onClick={() => {
                            changeYear("-");
                            // console.log(tempDate);
                            console.log("Date f:" + date);
                        }}
                    />
                    <Text style={defaultStyles.text20White}>{date.getFullYear()}</Text>
                    <ArrowButton 
                        attitude={"right"}
                        size={"medium"}
                        onClick={() => {
                            changeYear("+");
                            // console.log(tempDate);
                            console.log("Date f:" + date);
                    }}
                    />
                </View>
            </View>
            <View style={styles.calendarWeekText}>
                <Text style={defaultStyles.text16Black}>M</Text>
                <Text style={defaultStyles.text16Black}>T</Text>
                <Text style={defaultStyles.text16Black}>W</Text>
                <Text style={defaultStyles.text16Black}>T</Text>
                <Text style={defaultStyles.text16Black}>F</Text>
                <Text style={defaultStyles.text16Black}>S</Text>
                <Text style={defaultStyles.text16Black}>S</Text>
            </View>
            <View style={styles.calendarSelectionDate}>
                 {renderDateGrid()}                
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        width: width * 0.62,
        height: width * 0.62,
        backgroundColor: colors.light,
        borderRadius: 15,
        flexDirection: 'column'
    },
    calendarArrowContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: "5%",
        flexDirection: 'row'
    },
    calendarWeekText: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: "5%"
    }, 
    calendarSelectionDate: {
        padding: "5%"
    },
    arrows: {   
        width: width * 0.25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
        flexDirection: 'row',
        alignSelf: 'center'
    }
});