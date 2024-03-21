import { useState } from  'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import fontStyles from "../config/StyleSheets/fontStyles";
import { ArrowButton } from './ArrowButton';
import colors  from '../config/colors';

const width = Dimensions.get('window').width;

export const Calendar = ({ date, setDate, bookings, hasBookings }) => {
    var tempDate = new Date();
    tempDate.setMonth(date.getMonth());
    tempDate.setFullYear(date.getFullYear());
    var dates = new Array(35);
    var firstDayOfMonth = tempDate.getDay();        
    var currentEndOfMonth = 0;
    var dummyTempDate = tempDate;

    dummyTempDate.setDate(1);

    const dummyBookings = [
        {
            StartDate: dummyTempDate.setDate(3),
            EndDate: dummyTempDate.setDate(5),            
        },
        {
            StartDate: dummyTempDate.setDate(7),
            EndDate: dummyTempDate.setDate(10),            
        },
        {
            StartDate: dummyTempDate.setDate(13),
            EndDate: dummyTempDate.setDate(18),            
        },
        {
            StartDate: dummyTempDate.setDate(22),
            EndDate: dummyTempDate.setDate(27),            
        }        
    ]


    const changeYear = (change) => {
        if(change === "-")   
        {
            tempDate.setDate(1);
            tempDate.setMonth(date.getMonth());
            tempDate.setFullYear(tempDate.getFullYear() - 1);
            setDate(tempDate);            
        }
        if(change === "+")
        {
            tempDate.setDate(1);
            tempDate.setMonth(date.getMonth());
            tempDate.setFullYear(tempDate.getFullYear() + 1);
            setDate(tempDate);            
        }            
    }
    
    const changeMonth = (change) => {
        if(change === "-")
        {
            tempDate.setDate(1);
            tempDate.setFullYear(tempDate.getFullYear());
            tempDate.setMonth(date.getMonth() - 1);
            setDate(tempDate);                
        }
        if(change === "+")
        {
            tempDate.setDate(1);
            tempDate.setFullYear(tempDate.getFullYear());
            tempDate.setMonth(date.getMonth() + 1);
            setDate(tempDate);  
        }
    }    

    const calculateDates = () => {
        tempDate.setDate(1);
        firstDayOfMonth = tempDate.getDay();        
        currentEndOfMonth = 0;
        dates[firstDayOfMonth] = 1;                
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

    }

    const isBookedDate = (date) => {
        var isTrue = false;
        dummyBookings.forEach(e => {
            var startDate = new Date(e.StartDate);
            var endDate = new Date(e.EndDate);
            if(startDate.getFullYear === tempDate.getFullYear 
                || endDate.getFullYear === tempDate.getFullYear){
                if(startDate.getMonth === tempDate.getMonth 
                    || endDate.getMonth === tempDate.getMonth)
                {
                    if(startDate.getDate() <= date && endDate.getDate() >= date)
                    {
                        isTrue = true;                        
                    }                
                }
            }            
        });
        return isTrue;
    }

    const handleColor = (date) => {
        if(isBookedDate(date)){
            return({backgroundColor:  'red'})
        }
        return({backgroundColor:  'green'})        
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
                        size={"small"} 
                        onClick={() => {
                            changeMonth("-");                            
                        }}
                    />
                    <Text style={fontStyles.text24White}>{monthNames[date.getMonth()]}</Text>
                    <ArrowButton 
                        attitude={"right"}
                        size={"small"}
                        onClick={() => {
                            changeMonth("+");                            
                        }}
                    />
                </View>
                <View style={styles.arrows}>
                    <ArrowButton 
                        attitude={"left"}
                        size={"small"}
                        onClick={() => {
                            changeYear("-");                            
                        }}
                    />
                    <Text style={fontStyles.text24White}>{date.getFullYear()}</Text>
                    <ArrowButton 
                        attitude={"right"}
                        size={"small"}
                        onClick={() => {
                            changeYear("+");                            
                    }}
                    />
                </View>
            </View>
            <View style={styles.calendarWeekText}>
                <Text style={fontStyles.text24Black}>S</Text>
                <Text style={fontStyles.text24Black}>M</Text>
                <Text style={fontStyles.text24Black}>T</Text>
                <Text style={fontStyles.text24Black}>W</Text>
                <Text style={fontStyles.text24Black}>T</Text>
                <Text style={fontStyles.text24Black}>F</Text>
                <Text style={fontStyles.text24Black}>S</Text>
            </View>
            <View style={styles.calendarSelectionDate}>
                {calculateDates()}
                <View style={{ width: 30*7+1, height: 30*5+1, borderWidth: 0.5  }}>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity disabled={dates[0] > 7} onPress={() => {
                            tempDate.setDate(dates[0]) ;
                            setDate(tempDate);
                            }}>
                                {
                                    hasBookings && 
                                    (dates[0] < 7) && 
                                    <View style={{...styles.viewCircleStyles, ...handleColor(dates[0])}} />
                                }
                            <Text style={{...styles.cubeStyle, ...(dates[0] > 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[1] > 7} onPress={() => {
                            tempDate.setDate(dates[1]) ;
                            setDate(tempDate);
                            }}>
                                {
                                    hasBookings && 
                                    (dates[1] < 7) && 
                                    <View style={{...styles.viewCircleStyles, ...handleColor(dates[1])}} />
                                }
                            <Text style={{...styles.cubeStyle, ...(dates[1] > 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[2] > 7} onPress={() => {
                            tempDate.setDate(dates[2]) ;
                            setDate(tempDate);
                            }}>
                                {
                                    hasBookings && 
                                    (dates[2] < 7) && 
                                    <View style={{...styles.viewCircleStyles, ...handleColor(dates[2])}} />
                                }
                            <Text style={{...styles.cubeStyle, ...(dates[2] > 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[3] > 7} onPress={() => {
                            tempDate.setDate(dates[3]) ;
                            setDate(tempDate);
                            }}>
                                {
                                    hasBookings && 
                                    (dates[3] < 7) && 
                                    <View style={{...styles.viewCircleStyles, ...handleColor(dates[3])}} />
                                }
                            <Text style={{...styles.cubeStyle, ...(dates[3] > 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[3]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[4] > 7} onPress={() => {
                            tempDate.setDate(dates[4]) ;
                            setDate(tempDate);
                            }}>
                                {
                                    hasBookings && 
                                    (dates[4] < 7) && 
                                    <View style={{...styles.viewCircleStyles, ...handleColor(dates[4])}} />
                                }
                            <Text style={{...styles.cubeStyle, ...(dates[4] > 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[4]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[5] > 7} onPress={() => {
                            tempDate.setDate(dates[5]) ;
                            setDate(tempDate);
                            }}>
                                {
                                    hasBookings && 
                                    (dates[5] < 7) && 
                                    <View style={{...styles.viewCircleStyles, ...handleColor(dates[5])}} />
                                }
                            <Text style={{...styles.cubeStyle, ...(dates[5] > 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[5]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[6]) ; 
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[6])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[6]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[7]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[7])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[7]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[8]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[8])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[8]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[9]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[9])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[9]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[10]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[10])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[10]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[11]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[11])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[11]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[12]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[12])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[12]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[13]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[13])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[13]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[14]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[14])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[14]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[15]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[15])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[15]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[16]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[16])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[16]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[17]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[17])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[17]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[18]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[18])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[18]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[19]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[19])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[19]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            tempDate.setDate(dates[20]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[20])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[20]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[21]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[21])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[21]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[22]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[22])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[22]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[23]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[23])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[23]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[24]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[24])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[24]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[25]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[25])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[25]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[26]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[26])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[26]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
                            tempDate.setDate(dates[27]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && <View style={{...styles.viewCircleStyles, ...handleColor(dates[27])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[27]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowStyles}>
                        <TouchableOpacity disabled={dates[28] < 7} onPress={() => {
                            tempDate.setDate(dates[28]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && dates[28] > 7 && <View style={{...styles.viewCircleStyles, ...handleColor(dates[28])}} />}
                            <Text style={{...styles.cubeStyle, ...fontStyles.text20Black}}>{dates[28]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[29] < 7} onPress={() => {
                            tempDate.setDate(dates[29]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && dates[29] > 7 && <View style={{...styles.viewCircleStyles, ...handleColor(dates[29])}} />}
                            <Text style={{...styles.cubeStyle, ...(dates[29] < 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[29]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[30] < 7} onPress={() => {
                            tempDate.setDate(dates[30]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && dates[30] > 7 && <View style={{...styles.viewCircleStyles, ...handleColor(dates[30])}} />}
                            <Text style={{...styles.cubeStyle, ...(dates[30] < 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[30]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[31] < 7} onPress={() => {
                            tempDate.setDate(dates[31]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && dates[31] > 7 && <View style={{...styles.viewCircleStyles, ...handleColor(dates[31])}} />}
                            <Text style={{...styles.cubeStyle, ...(dates[31] < 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[31]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[32] < 7} onPress={() => {
                            tempDate.setDate(dates[32]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && dates[32] > 7 && <View style={{...styles.viewCircleStyles, ...handleColor(dates[32])}} />}
                            <Text style={{...styles.cubeStyle, ...(dates[32] < 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[32]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[33] < 7} onPress={() => {
                            tempDate.setDate(dates[33]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && dates[33] > 7 && <View style={{...styles.viewCircleStyles, ...handleColor(dates[33])}} />}
                            <Text style={{...styles.cubeStyle, ...(dates[33] < 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[33]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={dates[34] < 7} onPress={() => {
                            tempDate.setDate(dates[34]) ;
                            setDate(tempDate);
                            }}>
                                {hasBookings && dates[34] > 7 && <View style={{...styles.viewCircleStyles, ...handleColor(dates[34])}} />}
                            <Text style={{...styles.cubeStyle, ...(dates[34] < 7) ? fontStyles.text20Gray : fontStyles.text20Black}}>{dates[34]}</Text>
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
    },
    viewCircleStyles: {
        position: 'absolute', 
        alignSelf: 'center', 
        width:20, 
        height:20, 
        borderRadius: 10, 
        top: 5, 
        opacity: 0.3,
    }
});