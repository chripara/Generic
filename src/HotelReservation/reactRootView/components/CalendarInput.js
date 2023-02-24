import {React,useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/defaultStyles';
import CalendarPicker from 'react-native-calendar-picker';

export const CalendarInput = ({ date, setDate }) => {

    //const [isCalendarActive, setCalendarActive] = useState(false);

    const openCalendar = () => {
        <CalendarPicker onDateChange={setDate}/>
    }

    const handleSetDate = (value) => {
        return(
            setDate(value)
        );
    }

    return (
        <View>
            <View style={styles.container}>
                <TextInput 
                    style={defaultStyles.textInput} 
                    value={date}
                    onChangeText={date => setDate(date)}
                />
                <TouchableOpacity >
                {/* onClick={setCalendarActive(!isCalendarActive)} */}
                    <Image source={require('../../assets/generalIcons/calendar.png')} style={styles.image} />
                </TouchableOpacity>                
            </View>
            {/* { isCalendarActive &&  */}
            <CalendarPicker onDateChange={setDate(date.toString())}/> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 45,
        flexDirection: 'row',
        // backgroundColor: colors.light,
        // zIndex: 1,
        justifyContent: "center",
        //alignSelf: "center",
        // alignItems: "center"
        // borderRadius: 21,
        // shadowColor: colors.black,
        // shadowRadius: 10,
        // elevation: 8
    },
    image: {
        position: 'absolute',
        top: "25%",
        right: 5,
        width: 25,
        height: 25
    }
});