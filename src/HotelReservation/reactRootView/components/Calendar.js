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
            </View>
            <View style={styles.calendarSelectionDate}>
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
        justifyContent: 'space-between'
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

// import { useRef, useState, useEffect } from  'react';
// import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
// import defaultStyles from "../config/defaultStyles";
// import { ArrowButton } from './ArrowButton';
// import { Card } from './Card';
// import colors  from '../config/colors';

// const width = Dimensions.get('window').width;

// var tempDate = new Date();
// tempDate.setDate(1);

// export const Calendar = ({ date, setDate }) => {
    
//     const changeYear = (change) => {
//         if(change === "-")   
//         {
//             tempDate.setFullYear(date.getFullYear() - 1);
//             setDate(tempDate);
//             console.log(tempDate);
//         }
//         if(change === "+")
//         {
//             tempDate.setFullYear(date.getFullYear() + 1);
//             setDate(tempDate);
//             console.log(tempDate);
//         }            
//     }
    
//     const changeMonth = (change) => {
//         if(change === "-")
//         {
//             tempDate.setMonth(date.getMonth() - 1);
//             setDate(tempDate);    
//             console.log(tempDate);
//         }
//         if(change === "+")
//         {
//             tempDate.setMonth(date.getMonth() + 1);
//             setDate(tempDate); 
//             console.log(tempDate);
//         }
//     }

//     const monthNames = ["Jan", "Febr", "March", "April", "May", "June",
//         "July", "Aug", "Sept", "Oct", "Nov", "Dec"
//     ];

//     return (
//         <View style={styles.container}>
//             <View style={styles.calendarArrowContainer}>
//                 <View style={styles.arrows}>
//                     <ArrowButton 
//                         attitude={"left"}
//                         size={"medium"} 
//                         onClick={() => {
//                             changeMonth("-");                            
//                         }}
//                     />
//                     <Text style={defaultStyles.text20White}>{monthNames[date.getMonth()]}</Text>
//                     <ArrowButton 
//                         attitude={"right"}
//                         size={"medium"}
//                         onClick={() => {
//                             changeMonth("+");
//                         }}
//                     />
//                 </View>
//                 <View style={styles.arrows}>
//                     <ArrowButton 

//                         attitude={"left"}
//                         size={"medium"}
//                         onClick={() => {
//                             changeYear("-");
//                         }}
//                     />
//                     <Text style={defaultStyles.text20White}>{date.getFullYear()}</Text>
//                     <ArrowButton 
//                         attitude={"right"}
//                         size={"medium"}
//                         onClick={() => {
//                             changeYear("+");
//                         }}
//                     />
//                 </View>
//             </View>
//             <View style={styles.calendarWeekText}>
//             </View>
//             <View style={styles.calendarSelectionDate}>
//             </View>
//         </View>
//     );
// }



// const styles = StyleSheet.create({
//     container: {
//         width: width * 0.62,
//         height: width * 0.62,
//         backgroundColor: colors.light,
//         borderRadius: 15,
//         flexDirection: 'column'
//     },
//     calendarArrowContainer: {
//         justifyContent: 'space-between',
//         paddingHorizontal: "5%",
//         flexDirection: 'row'
//     },
//     calendarWeekText: {
//         justifyContent: 'space-between'
//     }, 
//     calendarSelectionDate: {
//         padding: "5%"
//     },
//     arrows: {   
//         width: width * 0.25,
//         alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginTop: 6,
//         flexDirection: 'row',
//         alignSelf: 'center'
//     }
// });