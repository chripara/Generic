import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { MainScreen } from "../MainScreen";
import { DualSelector } from "../../components/DualSelector";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { Calendar } from "../../components/Calendar";
import axiosHotelCalls from "../../axiosCalls/axiosHotelCalls";
import { TextInputWithValidation } from "../../components/TextInputWithValidation";
import IHotelFindAvailableRoomsForHotel from "../../interfaces/Hotel/IHotelFindAvailableRoomsForHotel";
import IHotelFindRoomsForDate from "../../interfaces/Hotel/IHotelFindRoomsForDate";
import IPair from "../../interfaces/General/IPair";
import IHotelPair from "../../interfaces/Hotel/IHotelPair";
import { CalendarInput } from "../../components/CalendarInput";

const width = Dimensions.get('window').width;

export const HotelSearchScreen = ({ navigation }) => {

    const [leftPage, setLeftPage] = useState(true);
    const [rightPage, setRightPage] = useState(true);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [state, setState] = useState(0);
    const [date, setDate] = useState(new Date());
    const [pairs, setPairs] = useState([]);
    const [hasCalendarActiveCheckInDate, setHasCalendarActiveCheckInDate] = useState(false);
    const [hasCalendarActiveCheckOutDate, setHasCalendarActiveCheckOutDate] = useState(false);

    const disableAllCalendars = () => {
        setHasCalendarActiveCheckInDate(false);
        setHasCalendarActiveCheckOutDate(false);
    }

    useEffect(() => {
        setFindAvailableRoomsForHotel(
            {
                ...findAvailableRoomsForHotel,
                ["startDate"]: checkInDate,
                ["endDate"]: checkOutDate
            })

    }, [])

    const [findAvailableRoomsForHotel, setFindAvailableRoomsForHotel] = useState<IHotelFindAvailableRoomsForHotel>(
        {
            hotelName: "Hotel1",
            capacity: "3",
            startDate: "01/01/2000",
            endDate: "02/01/2000",
        }   // as IHotelFindAvailableRoomsForHotel
    );

    const [findRoomsForDate, setFindRoomsForDate] = useState<IHotelFindRoomsForDate>(
        {
            city: "City",
            capacity: "Capacity",
            minPricePerDay: 0.1,
            maxPricePerDay: 1.1,
            startDate: "01/01/2000",
            endDate: "02/01/2000",
        }   // as IHotelFindRoomsForDate
    );
    
    const handleFindRoomsForDate = (key: string, val) => {
        console.log("FindRoomsForDate: ", findRoomsForDate);
        
        setFindRoomsForDate({
            ...findRoomsForDate,
            [key]: val
        });
    }

    const handleFindAvailableRoomsForHotel = (key: string, val) => {
        console.log("FindAvailableRoomsForHotel: ", findAvailableRoomsForHotel);

        setFindAvailableRoomsForHotel({
            ...findAvailableRoomsForHotel,
            [key]: val
        });
    }

    const handleFindRoomsForDateCall = () => {
        console.log("FindRoomsForDate: ", findRoomsForDate);
        const result = axiosHotelCalls.postFindRoomsForDate(findRoomsForDate);
             
        result.then((response) => {
            console.log("Data: ", response.data)
        })
        .catch((error) => {
            console.log("Error: ", error)
            console.log("Error Data: ", error.data)
            console.log("Error Message: ", error.message)
        })
    }

    const handleFindAvailableRoomsForHotelCall = () => {
        console.log("FindAvailableRoomsForHotel: ", findAvailableRoomsForHotel);
        const result = axiosHotelCalls.postFindAvailableRoomsForHotel(findAvailableRoomsForHotel);
        
        result.then((response) => {
            console.log("Data: ", response.data)
        })
        .catch((error) => {
            console.log("Error: ", error)
            console.log("Error Data: ", error.data)
            console.log("Error message: ", error.message)
        })
    }

    const handleFindAvailableRooms = (isLeft) => {
        if(isLeft){
            setLeftPage(false);
        }
        if(!isLeft){
            setRightPage(false);
        }            
    }

    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Hotels</Text>
                </View>
                <DualSelector 
                    leftButtonText={"Search room for hotel."}
                    rightButtonText={"Search room for date."}
                    leftPage={
                        leftPage 
                        ?
                        <View style={styles.viewFormStyle}>
                            <Text style={fontStyles.text24White}>Start Date:</Text>
                            <CalendarInput date={checkInDate} setDate={setCheckInDate} 
                                hasCalendarActive={hasCalendarActiveCheckInDate} 
                                setHasCalendarActive={setHasCalendarActiveCheckInDate} 
                                disableAllCalendars={disableAllCalendars}
                            />                            
                            <Text style={fontStyles.text24White}>End Date:</Text>
                            <CalendarInput date={checkOutDate} setDate={setCheckOutDate} 
                                hasCalendarActive={hasCalendarActiveCheckOutDate} 
                                setHasCalendarActive={setHasCalendarActiveCheckOutDate} 
                                disableAllCalendars={disableAllCalendars}
                            />
                            <Text style={fontStyles.text24White}>Hotel Name:</Text>
                            <TextInputWithValidation
                                handleTextValue={(value) => {
                                    handleFindAvailableRoomsForHotel('hotelName', value)
                                    console.log("FindRoomsForDate: ", findRoomsForDate)
                                }} 
                            />
                            <Text style={fontStyles.text24White}>Capacity:</Text>
                            <TextInputWithValidation
                                handleTextValue={(value) => {
                                    handleFindAvailableRoomsForHotel('capacity', value)
                                    console.log("FindRoomsForDate: ", findRoomsForDate)
                                }}  
                            />     
                            <EllipseButtonPrimary 
                                name={"Find Available Rooms"} 
                                marginTop={5} 
                                onClick={() => {
                                    handleFindAvailableRoomsForHotelCall()
                                    handleFindAvailableRooms(true);
                                }}
                            />
                        </View>
                        :
                        <View>
                            <EllipseButtonPrimary 
                                marginTop={width * 0.03} 
                                name={"Select Hotel"} 
                                onClick={() => {
                                    handleFindAvailableRoomsForHotelCall()
                                    setLeftPage(true)
                                }}
                            />
                            <View style={{height: 5}}/>
                        </View>
                    } 
                    rightPage={
                        rightPage 
                        ?
                        <View style={styles.viewFormStyle}>
                            <Text style={fontStyles.text24White}>Start Date:</Text>
                            <CalendarInput date={checkInDate} setDate={setCheckInDate} 
                                hasCalendarActive={hasCalendarActiveCheckInDate} 
                                setHasCalendarActive={setHasCalendarActiveCheckInDate} 
                                disableAllCalendars={disableAllCalendars}
                            />                            
                            <Text style={fontStyles.text24White}>End Date:</Text>
                            <CalendarInput date={checkOutDate} setDate={setCheckOutDate} 
                                hasCalendarActive={hasCalendarActiveCheckOutDate} 
                                setHasCalendarActive={setHasCalendarActiveCheckOutDate} 
                                disableAllCalendars={disableAllCalendars}
                            />
                            <Text style={fontStyles.text24White}>City:</Text>
                            <TextInputWithValidation handleTextValue={(value) => 
                                    handleFindRoomsForDate('city', value)
                                }
                            />
                            <Text style={fontStyles.text24White}>Capacity:</Text>
                            <TextInputWithValidation handleTextValue={(value) => 
                                    handleFindRoomsForDate('capacity', value)
                                }
                            />
                            <Text style={fontStyles.text24White}>Minimum Price Per Day:</Text>
                            <TextInputWithValidation handleTextValue={(value) => 
                                    handleFindRoomsForDate('minPricePerDay', value)
                                }
                            />  
                            <Text style={fontStyles.text24White}>Maximum Price Per Day:</Text>
                            <TextInputWithValidation handleTextValue={(value) => 
                                    handleFindRoomsForDate('maxPricePerDay', value)
                                }
                            />
                            <EllipseButtonPrimary 
                                name={"Find Available Rooms"} 
                                marginTop={5} 
                                onClick={() => {
                                    handleFindRoomsForDateCall()
                                    handleFindAvailableRooms(false);
                                }}
                            />
                        </View>
                        :
                        <View>
                            <View style={styles.viewText}>
                                <Text style={fontStyles.text28Black}>Lake Place Inn</Text>
                            </View>
                            <View style={styles.cardStyle}>                    
                                <View style={styles.horizontalViewStyle}>
                                    <View style={styles.verticalViewStyle}>
                                        <Text style={fontStyles.text20White}>Cost / day</Text>
                                        <Text style={fontStyles.text24Black}>50 €</Text>
                                    </View>
                                    <View style={styles.verticalViewStyle}>
                                        <Text style={fontStyles.text20White}>Room No.</Text>
                                        <Text style={fontStyles.text24Black}>A11</Text>
                                    </View>
                                    <View style={styles.verticalViewStyle}>
                                        <Text style={fontStyles.text20White}>Capacity</Text>
                                        <Text style={fontStyles.text24Black}>4 person</Text>
                                    </View>
                                </View>
                                <View style={{height: 40, justifyContent: 'center'}}>
                                    <Text style={fontStyles.text28White}>Availability</Text>
                                </View>
                                <Calendar date={date} setDate={setDate} hasBookings={true}/>
                                <EllipseButtonPrimary name={"Back"} marginTop={5} onClick={() => {
                                    setRightPage(true);
                                    handleFindRoomsForDateCall();
                                }}/>
                            </View>
                        </View>
                    } 
                />
            </View>
        </MainScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%"
    },
    viewText: {
        position: "relative",
        marginVertical: "2%",
        paddingHorizontal: "5%",
    },
    viewFormStyle: {
        width: width * 0.9,
        height: width * 1.43,
        marginTop: width * 0.05
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
    },
    cardStyle: {
        width: width * 0.80,
        paddingHorizontal: '3%',
        paddingVertical: '4%',
        backgroundColor: "#E75874",
        alignItems: "center",
        borderRadius: 25,
        height: width * 1.05,  
    },
    horizontalViewStyle: {
        flexDirection: 'row',
        width: width * 0.7,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    verticalViewStyle: {
        flexDirection: 'column',
        height: 40,
    }
});