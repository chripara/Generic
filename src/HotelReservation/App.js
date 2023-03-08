import { Button, Text, View } from "react-native";
import { useState } from 'react';
import { useFonts } from "expo-font";
import { AuthStack } from "./reactRootView/stackNavigators/AuthStack";
import { Card } from "./reactRootView/components/Card";
import { EllipseButtonSecondary } from "./reactRootView/components/EllipseButtonSecondary";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabNavigator } from "./reactRootView/tabNavigators/MainTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Calendar } from "./reactRootView/components/Calendar";
import { DualSelector } from "./reactRootView/components/DualSelector";

// function HomeScreen() {
//     return (
//         <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//             <Text>Home!</Text>
//         </View>
//     );
// }

// function SettingsScreen() {
//     return (
//         <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//             <Text>Settings!</Text>
//         </View>
//     );
// }

// function SettingsScreen2() {
//     return (
//         <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//             <Text>Settings!</Text>
//         </View>
//     );
// }

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const MainTabNavigator2 = () => (
//     <NavigationContainer>
//         <Stack.Navigator>
//             <Stack.Screen name="Auth" component={AuthStack} />
//             <Stack.Screen name="MainTab" component={MainTabNavigator} />
//         </Stack.Navigator>
//     </NavigationContainer>
// );

const content = [
    {
        title: "Hotel:",
        text: "Lake Place Inn 3",            
    },
    {
        title: "Hotel Address:",
        text: "36 Parker StreetOxnard, CA 93035",   
    },
    {
        title: "Room Number:",
        text: "506",   
    },
    {
        title: "Dates:",
        text: "30-03-2023 - 05-04-2024",   
    },
    {
        title: "Cost:",
        text: "300 €",   
    }];

export default function App() {

    // const [contents, setContent] = useState(content);
    // const counter22 = 0;
    // var tempDate = new Date();
    // // console.log(content);
    // const deleteFunc = (index) => {
    //     content.splice(index, 1);
    //     // console.log('asdfasdasdfasdfasasddfasdfasdfadfasdff');
    //     // console.log('length: ', length);
    //     // setState(content);
    //     setContent([...contents]);
    //     setContent(content);
    //     console.log('index: ', index);
    //     console.log('contents: ', contents);
    // }
    
    const [fontsLoaded] = useFonts({
        "Italiana-Regular": require("./assets/fonts/Italiana-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return <Text> Fonts are not loaded Successfully!!</Text>;
    } else {

        return (
            // <View style={{ alignItems: 'center', marginTop: 100 }}>
            //     <DualSelector rightPage={
            //         <View> 
            //             <EllipseButtonSecondary name={"asdf"}/>
            //             <Text>asdfsadfaasadfasdf</Text>
            //         </View>
            //         } 
            //     leftPage={
            //     <Text>asd11123412344413fqewrgqereg4adfaasadfasdf</Text>}/>
            // </View>
            <NavigationContainer>
                <MainTabNavigator />
            </NavigationContainer>
        )
    }
}


// const [date, setDate] = useState(new Date());
// const tempDate = date;
// tempDate.setDate(1);
// setDate(tempDate);
//     return (
//         <View style={{ alignItems: 'center', marginTop: 100 }}>
//             <Text>{tempDate}</Text>
//             <Button onPress={() => {
//                 //stempDate.setFullYear(date.getFullYear()+1); 
//                 setDate(tempDate)
//                 }} 
//                 title={"asdfsasdf"}/>
//         </View>
//         // <NavigationContainer>
//         //     <MainTabNavigator />                         
//         // </NavigationContainer>
//     )
