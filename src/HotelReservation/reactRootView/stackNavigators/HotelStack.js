import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/AuthScreens/AuthScreen";
import { ForgetPasswordScreen } from "../screens/AuthScreens/ForgetPasswordScreen";
import { SignInScreen } from "../screens/AuthScreens/SignInScreen";
import { SignUpScreen } from "../screens/AuthScreens/SignUpScreen";
import { VerifyPhoneNumberScreen } from "../screens/AuthScreens/VerifyPhoneNumberScreen";
// import { VerifyChangeEmailScreen } from "../screens/AuthScreens/VerifyChangeEmailScreen";

const Stack = createNativeStackNavigator();

export const HotelStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
                name="SignIn"
                component={SignInScreen}
                options={{ headerVisible: false }}
            />
            <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerVisible: false }}
            />
        </Stack.Navigator>
);
