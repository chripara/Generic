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
    var dates = new Array(35);
    var firstDayOfMonth = tempDate.getDay();        
    var currentEndOfMonth = 0;

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

    const calculateDates = () => {
        tempDate.setDate(1);
        firstDayOfMonth = tempDate.getDay();        
        currentEndOfMonth = 0;
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
                            console.log("Date f:" + date);
                        }}
                    />
                    <Text style={defaultStyles.text20White}>{monthNames[date.getMonth()]}</Text>
                    <ArrowButton 
                        attitude={"right"}
                        size={"medium"}
                        onClick={() => {
                            changeMonth("+");
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
                            console.log("Date f:" + date);
                        }}
                    />
                    <Text style={defaultStyles.text20White}>{date.getFullYear()}</Text>
                    <ArrowButton 
                        attitude={"right"}
                        size={"medium"}
                        onClick={() => {
                            changeYear("+");
                            console.log("Date f:" + date);
                    }}
                    />
                </View>
            </View>
            <View style={styles.calendarWeekText}>
                <Text style={defaultStyles.text20Black}>S</Text>
                <Text style={defaultStyles.text20Black}>M</Text>
                <Text style={defaultStyles.text20Black}>T</Text>
                <Text style={defaultStyles.text20Black}>W</Text>
                <Text style={defaultStyles.text20Black}>T</Text>
                <Text style={defaultStyles.text20Black}>F</Text>
                <Text style={defaultStyles.text20Black}>S</Text>
            </View>
            <View style={styles.calendarSelectionDate}>
                {calculateDates()}
                <View style={{ width: 30*7+1, height: 30*5+1, borderWidth: 0.5  }}>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity disabled={dates[0] > 7} onPress={() => {
                            tempDate.setDate(dates[0]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[0] > 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[1] > 7} onPress={() => {
                            tempDate.setDate(dates[1]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[1] > 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[2] > 7} onPress={() => {
                            tempDate.setDate(dates[2]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[2] > 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[3] > 7} onPress={() => {
                            tempDate.setDate(dates[3]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[3] > 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[3]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[4] > 7} onPress={() => {
                            tempDate.setDate(dates[4]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[4] > 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[4]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[5] > 7} onPress={() => {
                            tempDate.setDate(dates[5]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[5] > 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[5]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[6]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[6]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[7]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[7]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[8]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[8]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[9]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[9]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[10]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[10]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[11]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[11]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[12]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[12]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[13]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[13]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[14]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[14]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[15]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[15]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[16]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[16]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[17]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[17]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[18]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[18]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[19]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[19]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[20]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[20]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[21]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[21]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[22]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[22]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[23]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[23]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[24]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[24]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[25]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[25]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[26]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[26]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[27]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[27]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity disabled={dates[28] < 7} onPress={() => {
                            tempDate.setDate(dates[28]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...defaultStyles.text16Black}}>{dates[28]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[29] < 7} onPress={() => {
                            tempDate.setDate(dates[29]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[29] < 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[29]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[30] < 7} onPress={() => {
                            tempDate.setDate(dates[30]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[30] < 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[30]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[31] < 7} onPress={() => {
                            tempDate.setDate(dates[31]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[31] < 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[31]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[32] < 7} onPress={() => {
                            tempDate.setDate(dates[32]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[32] < 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[32]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[33] < 7} onPress={() => {
                            tempDate.setDate(dates[33]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[33] < 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[33]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[34] < 7} onPress={() => {
                            tempDate.setDate(dates[34]) ;
                            setDate(tempDate);
                            }}>
                            <Text style={{...styles.cubeStyle, ...(dates[34] < 7) ? defaultStyles.text16Gray : defaultStyles.text16Black}}>{dates[34]}</Text>
                        </TouchableOpacity>
                    </View>     
               </View>
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
        flexDirection: 'row',
        marginTop: '3%'
    },
    calendarWeekText: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        paddingTop: "5%",
        paddingHorizontal: "5%"
    }, 
    calendarSelectionDate: {
        padding: "5%",
        justifyContent: 'center',
        alignItems: 'center'        
    },
    arrows: {   
        width: width * 0.25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    rowStyles: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cubeStyle: {
        borderWidth: 0.5,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 30,
        height: 30
    }
});