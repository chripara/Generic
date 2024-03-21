import {React,useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from 'react-native';
import colors from '../config/colors';
import fontStyles from '../config/StyleSheets/fontStyles';
import { Calendar } from './Calendar';

const width = Dimensions.get('window').width;

export const CalendarInput = ({ date, setDate, hasCalendarActive, setHasCalendarActive, disableAllCalendars }) => {

    // const [isCalendarActive, setCalendarActive] = useState(false);
        
    return (
        <View>
            {console.log(hasCalendarActive)}
            <View style={styles.container}>
                <Text 
                    style={fontStyles.textInput} 
                >
                    {date.getDate()} - {date.getMonth()+1} - {date.getFullYear()}
                </Text>
                <TouchableOpacity
                    onPress={() => {                       
                        disableAllCalendars();
                        if(!hasCalendarActive)
                            setHasCalendarActive(true);
                        console.log(hasCalendarActive);}}>
                    <Image source={require('../../assets/generalIcons/calendar.png')} style={styles.image} />
                </TouchableOpacity>                
            </View>   
            {
                hasCalendarActive &&      
                <View style={styles.calendarView}>            
                    <Calendar date={date} setDate={setDate}/>
                </View>
            }   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        flexDirection: 'row',
        justifyContent: "center"        
    },
    image: {
        position: 'absolute',
        top: "25%",
        right: 5,
        width: 25,
        height: 25
    },
    calendarView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: width * 0.12,
        zIndex: 10,
        elevation: 1
    }
});