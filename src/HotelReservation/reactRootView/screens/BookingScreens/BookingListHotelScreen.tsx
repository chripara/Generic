import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import fontStyles from "../../config/StyleSheets/fontStyles";
import { List } from "../../components/List";
import axiosBookingCalls from "../../axiosCalls/axiosBookingCalls";
import IPair from "../../interfaces/General/IPair";
import IBookingPair from "../../interfaces/Booking/IBookingPair";

export const BookingListHotelScreen = ({ navigation }) => {    

    const handleAxios = async () => {
        var tempListOfMyBookings = []
        var result = axiosBookingCalls.getMyBookingsCall();
        result.then((response) => {            
            setNumberOfBookings(response.data.length); 
            response.data.map((content) => {   
                const cont = JSON.stringify(content);
                const jsonCont = JSON.parse(cont);
                tempListOfMyBookings.push(
                    {
                        numberOfPairs: 7,
                        pairs: [
                        {
                            title: "Hotel",
                            text: jsonCont["hotel"]
                        } as IPair, 
                        {
                            title: "HotelAddress",
                            text: jsonCont["hotelAddress"]
                        } as IPair,
                        {
                            title: "RoomNumber",
                            text: jsonCont["roomNumber"]
                        } as IPair,
                        {
                            title: "Cost",
                            text: jsonCont["cost"]
                        } as IPair,
                        {
                            title: "StartDate",
                            text: jsonCont["startDate"]
                        } as IPair,
                        {
                            title: "EndDate",
                            text: jsonCont["endDate"]
                        } as IPair,
                        {
                            title: "Description",
                            text: jsonCont["description"]
                        } as IPair
                    ]} as IBookingPair                     
                );
            });
            setListOfMyBookings(tempListOfMyBookings);
        });
    }

    const [listOfMyBookings, setListOfMyBookings] = useState<IBookingPair[]>([]);    
    const [numberOfBookings, setNumberOfBookings] = useState(0);    

    return(
    <MainScreen backgroundColor={colors.secondary}> 
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Bookings</Text>
            </View>
            {
                listOfMyBookings &&
                listOfMyBookings.length >0 &&
                <List 
                    contentPair={listOfMyBookings}
                    numberOfPairs={7}
                    hasDescription={true}
                    hasDelete={true} 
                    deleteFunc={()=>{console.log("Delete.")}}
                />  
            }           
            <EllipseButtonPrimary name="Load Booking" onClick={() => handleAxios()}/> 
        </View>
    </MainScreen>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewText: {
        position: "relative",
        marginVertical: "3%", // why 3% instead of 2% 
        paddingHorizontal: "5%",
    },
});
