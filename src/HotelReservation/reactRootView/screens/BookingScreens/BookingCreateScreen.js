import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { CalendarInput } from "../../components/CalendarInput";
import fontStyles from "../../config/StyleSheets/fontStyles";

const width = Dimensions.get('window').width;

export const BookingCreateScreen = ({ navigation }) => {
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [hasCalendarActiveCheckInDate, setHasCalendarActiveCheckInDate] = useState(false);
    const [hasCalendarActiveCheckOutDate, setHasCalendarActiveCheckOutDate] = useState(false);

    const disableAllCalendars = () => {
        setHasCalendarActiveCheckInDate(false);
        setHasCalendarActiveCheckOutDate(false);
    }

    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Bookings</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text24White}>Hotel Name:</Text>
                    <TextInput style={fontStyles.textInput} />
                    <Text style={fontStyles.text24White}>Room:</Text>
                    <TextInput style={fontStyles.textInput} />
                    <Text style={fontStyles.text24White}>Cost:</Text>
                    <TextInput style={fontStyles.textInput} />
                    <Text style={fontStyles.text24White}>Check In:</Text>
                    <CalendarInput date={checkInDate} setDate={setCheckInDate} 
                        hasCalendarActive={hasCalendarActiveCheckInDate} 
                        setHasCalendarActive={setHasCalendarActiveCheckInDate} 
                        disableAllCalendars={disableAllCalendars}
                    />
                    <Text style={fontStyles.text24White}>Check Out:</Text>
                    <CalendarInput date={checkOutDate} setDate={setCheckOutDate} 
                        hasCalendarActive={hasCalendarActiveCheckOutDate} 
                        setHasCalendarActive={setHasCalendarActiveCheckOutDate} 
                        disableAllCalendars={disableAllCalendars}
                    />
                    <Text style={fontStyles.text24White}>Description:</Text>
                    <TextInput style={styles.textInput} multiline={true}/>
                </View>
                <EllipseButtonPrimary
                    name={"Create Booking"}
                    onClick={() => console.log('Create Booking')}//navigation.navigate("ChangeEmail")}
                    marginTop={"1.5%"}
                />
            </View>
        </MainScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
        height: width * 1.8
    },
    viewText: {
        position: "relative",
        marginVertical: "2%",
        paddingHorizontal: "5%",
    },
    textInput: {
        height: 120,
        textAlign: "left",
        textAlignVertical: 'top',
        fontFamily: "Italiana-Regular",
        fontSize: 12,
        backgroundColor: colors.light,
        paddingLeft: "4%",
        borderRadius: 5,
        paddingVertical: 10
    }
});
