import {React,useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/defaultStyles';
import { Calendar } from './Calendar';

const width = Dimensions.get('window').width;

export const CalendarInput = ({ date, setDate }) => {

    const [isCalendarActive, setCalendarActive] = useState(false);
        
    return (
        <View>
            <View style={styles.container}>
                <Text 
                    style={defaultStyles.textInput} 
                >
                    {date.getDate()} - {date.getMonth()+1} - {date.getFullYear()}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setCalendarActive(!isCalendarActive)
                        console.log(isCalendarActive)}}>
                    <Image source={require('../../assets/generalIcons/calendar.png')} style={styles.image} />
                </TouchableOpacity>                
            </View>   
            {
                isCalendarActive &&      
                <View style={styles.calendarView}>            
                    <Calendar date={date} setDate={setDate}/>
                </View>
            }   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
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
        zIndex: 1,
        elevation: 1
    }
});