import { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
import { List } from "../../components/List";
import axiosHotelCalls from "../../axiosCalls/axiosHotelCalls";
import IHotelPair from "../../interfaces/Hotel/IHotelPair";
import IPair from "../../interfaces/General/IPair";

const width = Dimensions.get('window').width;
 
export const HotelListScreen = ({ navigation }) => {

    var listOfHotelVar = [];
    const [listOfHotel, setListOfHotels] = useState<IHotelPair[]>([]);

    const handleHotelLists = () => {
        listOfHotelVar = [];
        const result = axiosHotelCalls.getAllHotelsCall();

        result.then((response) => {
            response.data.map((content, index) => {
                const cont = JSON.stringify(content);
                const jsonCont = JSON.parse(cont);
                console.log(jsonCont["address"]);
                listOfHotelVar.push(
                    {
                        numberOfPairs: 8,
                        pairs: [
                            {
                                title: "Name:",
                                text: jsonCont["name"],            
                            } as IPair,
                            {
                                title: "City:",
                                text: jsonCont["city"],            
                            } as IPair,
                            {
                                title: "Address:",
                                text: jsonCont["address"],            
                            } as IPair,
                            {
                                title: "PostCode:",
                                text: jsonCont["postCode"],            
                            } as IPair,
                            {
                                title: "PhoneNumber:",
                                text: jsonCont["phoneNumber"],            
                            } as IPair,
                            {
                                title: "Rate:",
                                text: jsonCont["rate"],            
                            } as IPair,
                            {
                                title: "Type:",
                                text: jsonCont["type"],            
                            } as IPair,
                            {
                                title: "Description:",
                                text: jsonCont["description"],            
                            } as IPair
                        ]
                    } as IHotelPair
                );
            }) 
            // console.log("listOfHotelVar ", listOfHotelVar);
            setListOfHotels(listOfHotelVar);
        })
        
    }

    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Hotels</Text>
                </View>
                {
                    listOfHotel &&
                    listOfHotel.length > 0 &&
                    <List 
                        contentPair={listOfHotel} 
                        numberOfPairs={8} 
                        hasDelete={false} 
                        deleteFunc={() => 
                            console.log("delete")
                        } 
                        hasDescription={true}
                    />
                }
                <View style={{ marginBottom: 20 }}>
                    <EllipseButtonPrimary name={"Select Hotel"} onClick={() => {handleHotelLists()}} marginTop={width * 0.03}/> 
                </View>
            </View>
        </MainScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewText: {
        position: "relative",
        paddingHorizontal: "5%",
    },
});