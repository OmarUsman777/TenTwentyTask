
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NavHeader from "../ui/navigation/NavHeader";
import DashboardScreen from "../common/screens/dashboard/DashboardScreen";
import MovieDetailScreen from "../movies/screens/movie-detail-screen";
const NavigationSetup = () => {
    const navigation = useNavigationContainerRef();
    const Stack = createNativeStackNavigator();
    const defaultNavigationOptions: NativeStackNavigationOptions = {
        header: NavHeader,
    };
    const initialRouteName = "DashboardScreen"
    return (
        <>
            <NavigationContainer ref={navigation}>
                <Stack.Navigator
                    screenOptions={defaultNavigationOptions}
                    initialRouteName={initialRouteName}>
                    <Stack.Screen
                        key={0}
                        name={'DashboardScreen'}
                        component={DashboardScreen}
                        options={{
                            headerShown: false,
                            headerTitleAlign: "left",
                        }}
                    />
                    <Stack.Screen
                        key={0}
                        name={'MovieDetailScreen'}
                        component={MovieDetailScreen}
                        options={{
                            headerShown: false,
                            headerTitleAlign: "left",
                            // title,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>

    );
};

export default NavigationSetup;