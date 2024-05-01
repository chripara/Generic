import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/AuthScreens/AuthScreen";
import { ProfileScreen } from "../screens/ProfileScreens/ProfileScreen";
import { ManageAccountScreen } from "../screens/ProfileScreens/ManageAccountScreen";
import { ChangePasswordScreen } from "../screens/ProfileScreens/ChangePasswordScreen";
import { ChangeEmailScreen } from "../screens/ProfileScreens/ChangeEmailScreen";
import { EditProfileScreen } from "../screens/ProfileScreens/EditProfileScreen";
import { ForgetPasswordScreen } from "../screens/AuthScreens/ForgetPasswordScreen";
import { SignInScreen } from "../screens/AuthScreens/SignInScreen";
import { SignUpScreen } from "../screens/AuthScreens/SignUpScreen";
import { VerifyPhoneNumberScreen } from "../screens/AuthScreens/VerifyPhoneNumberScreen";
import { ResetPasswordScreen } from "../screens/AuthScreens/ResetPasswordScreen";
import { BookingListHotelScreen } from "../screens/BookingScreens/BookingListHotelScreen";


const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName="Profile"
        >            
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerVisible: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerVisible: false }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ headerVisible: false }}
            />  
            <Stack.Screen
                name="ChangeEmail"
                component={ChangeEmailScreen}
                options={{ headerVisible: false }}
            />            
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
                name="EditProfile"
                component={EditProfileScreen}
                options={{ headerVisible: false }}
            />
            <Stack.Screen
                name="ManageAccount"
                component={ManageAccountScreen}
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
                name="Auth"
                component={AuthScreen}
                options={{ headerVisible: false }}                
            />
        </Stack.Navigator>
);
