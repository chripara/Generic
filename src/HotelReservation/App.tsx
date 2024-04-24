import { Button, Text, View } from "react-native";
import { useState, useEffect } from 'react';
import axiosAuthCalls from './reactRootView/axiosCalls/axiosAuthCalls';
import axios from 'axios';
import axiosCalls from './reactRootView/axiosCalls/axiosCalls';
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
import ISignUpInterface from "./reactRootView/interfaces/Auth/ISignUp";
import { TextInputWithValidation } from "./reactRootView/components/TextInputWithValidation";
import { WelcomeScreen } from "./reactRootView/screens/AuthScreens/WelcomeScreen.tsx";

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

    // const [rawBody, setRawBody] = useState<ISignUpInterface>(
    //     {
    //         userName: 'string',
    //         password: 'string',
    //         confirmPassword: 'string',
    //         email: 'string',
    //         phoneNumber: 'string', 
    //         firstName: 'string',
    //         lastName: 'string',
    //         location: 'string'
    //     } as ISignUpInterface);

    //     const random = 
    //     {
    //         "userName": "sasdasdd22", 
    //         "password": "stringQ!1",
    //         "confirmPassword": "stringQ!1",
    //         "email": "string22@sa.s",
    //         "phoneNumber": "4216794611", 
    //         "firstName": "string",
    //         "lastName": "string",
    //         "location": "string"
    //     } as ISignUpInterface
        
    // const handleContent = (obj: ISignUpInterface) => {
    //     setRawBody(obj);
    //     //setRawBody(random);
    //     console.log("handleContent: ", rawBody);
    // }

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
    
    //   useEffect(() => {
    // fetch("https://127.0.0.1:7142/api/Auth/Test", {
    //     method: "GET",  
    //     // acceptLanguage: "en",
    //     // APIVersion: "v2",
    //     // authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2Nzg5NjU0ODksImV4cCI6MTY3ODk2OTA4OSwiaXNzIjoiaHR0cHM6Ly9pY2RhY2Nlc3NtYW5hZ2VtZW50Lndoby5pbnQiLCJhdWQiOlsiaHR0cHM6Ly9pY2RhY2Nlc3NtYW5hZ2VtZW50Lndoby5pbnQvcmVzb3VyY2VzIiwiaWNkYXBpIl0sImNsaWVudF9pZCI6ImQyNDc1YjgxLTBmNjgtNDE2NS05ODQzLWU3MWRlYjBkYWUyNl82NmU5OTA2Ni1hNDEzLTRhNjYtYWY4NC1iYzE3ZjI1MzFlODkiLCJzY29wZSI6WyJpY2RhcGlfYWNjZXNzIl19.Ouj9zMLSKBw2oAL-XoHEXRlguz1sOH5XcKRqDz-EkcJeBE7vSPlgUuHGxI3SZCzv0DxJKeykzArhct0YL0YIHO3Z9e1-ou5p0J5lxvIaluQ5CvlBwPHSc5c6iyS29i6pT0xKbnp8fHeDZY7yNaRTivkbPiFyR2wwYqsYakOGBpYycv_xXCpKAtia_HVF2pw82i91dzLOjSkcPtuJEPFc4bRRSoUfZEHhD5mnE-t7K2xOQ1qhhaD42cucGdhIkmmyZ7micB3E7RyHzjM94MfFfFpvY3QqVB55lzw2lx-szYEujpvTl4WbJPsZE7CIbw_8Nksf5OU2Y9O3jRmke4t6mg'
    // })
    //   .then(response => 
    //     {
    //         console.log("useEffect211");        
    //         console.log(response);
    //         console.log("useEffect222");        
    //     })
    //   .then(
    //     (json) => {
    //         console.log("useEffect111")
    //         console.log(json);
    //         console.log("useEffect111")
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //         console.log(JSON.stringify(error));          
    //         console.log("useEffect3s")
    //     }
    //   )
    //   console.log("useEffect")
    //   }, [])
    
    // const [errors, setErrors] = useState<string[]>();
    const [stack, setStack] = useState<boolean>(true);
        
    // const [exmp, setExmpl] = useState<IExample>();

    const [fontsLoaded] = useFonts({
        "Italiana-Regular": require("./assets/fonts/Italiana-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return <Text style={{marginTop: "10%"}}> Fonts are not loaded Successfully!!</Text>;
    } else {
        
        return (           
            
            // <View style={{ alignItems: 'center', marginTop: 10 }}>
            //     <EllipseButtonSecondary name={"asdf"} onClick={() => 
            //    axiosAuthCalls.postSignUpCall(rawBody)
            //     } marginTop={0}/>           
            //     <DualSelector rightPage={
            //         <View> 
            //             <EllipseButtonSecondary name={"asdf"} onClick={axiosCalls.getTestData} marginTop={0}/>
            //             <Text>asdfsadfaasadfasdf</Text>
            //         </View>
            //         }  
            //     leftPage={ 
            //      <Text>asd1112341sadfasdf</Text>              
            //         <TextInputWithValidation errors={errors}
            //             handleTextValue={(value) => {console.log(value);
            //                 console.log(errors);
            //             if(value.length>20 && errors.length === 1)
            //             {
            //                 setErrors( errors => [...errors, "Error 2"])
            //             }
            //             else if(value.length>10 && errors === undefined)
            //             {
            //                 setErrors( errors => ["Error 1"])
            //             }
            //         }}
            //             // setExmpl(errors, (value) => {console.log(value))}}
            //             />
            // </View> 
            // <View>
                <WelcomeScreen />
            // </View>
            // <NavigationContainer>            
            //     <MainTabNavigator />          
            // </NavigationContainer>
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