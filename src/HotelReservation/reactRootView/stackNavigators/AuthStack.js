import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/AuthScreens/AuthScreen";
import { ForgetPasswordScreen } from "../screens/AuthScreens/ForgetPasswordScreen";
import { SignInScreen } from "../screens/AuthScreens/SignInScreen";
import { SignUpScreen } from "../screens/AuthScreens/SignUpScreen";
import { VerifyPhoneNumberScreen } from "../screens/AuthScreens/VerifyPhoneNumberScreen";
import { ResetPasswordScreen } from "../screens/AuthScreens/ResetPasswordScreen";
import { BookingListHotelScreen } from "../screens/BookingScreens/BookingListHotelScreen";

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>  
    { console.log("allaksa")}
        <Stack.Screen
            name="VerifyPhoneNumber"
            component={VerifyPhoneNumberScreen}
            options={{ headerVisible: false }}
        />         
        <Stack.Screen
            name="ForgotPassword"
            component={ForgetPasswordScreen}
            options={{ headerVisible: false }}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerVisible: false }}
        />
        <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerVisible: false }}
        />
        <Stack.Screen
            name="BookingListHotel"
            component={BookingListHotelScreen}
            options={{ headerVisible: false }}
        />            
        <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerVisible: false }}
        />
        <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerVisible: false }}
            initialParams={{ previousRoute: "Auth"}}
        />
    </Stack.Navigator>
);
