// DEVELOPED BY: OMAR USMAN
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultColors } from "../../../styles";
import HomeScreen from "../../../movies/screens/movie-home-screen";
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Foundation';
import Icon4 from 'react-native-vector-icons/Ionicons';
import { getHeightPercentage, getWidthPercentage } from "../../../utils/responsiveSize";
import { font } from "../../../utils/font";
import NavHeader from "../../../ui/navigation/NavHeader";
import MovieSearchScreen from "../../../movies/screens/movie-search-screen";
import MovieSeatScreen from "../../../movies/screens/movie-seats-screen";

// BOTTOM TAB SETUP, WHERE TAB'S SCREEN ARE DEFINED
const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                header: (props) => <NavHeader {...props} />,
                tabBarActiveBackgroundColor: defaultColors.PRIMARY,
                tabBarItemStyle: {
                    borderTopLeftRadius: 37,
                    borderTopRightRadius: 37,
                    paddingTop: 2,
                    height: getHeightPercentage(11),
                },
                tabBarStyle: [styles.tabContainer, { height: 54 + insets.bottom }],
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.wrapper}>
                            <Icon1 name="apps" size={30} color={focused ? defaultColors.WHITE : defaultColors.GRAY} />
                            <Text style={[styles.textStyle, focused ? { ...font(10, 700) } : {}]}>{"Dashboard"}</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.wrapper}>
                            <Icon2 name="play-box" size={30} color={focused ? defaultColors.WHITE : defaultColors.GRAY} />
                            <Text style={[styles.textStyle, focused ? { ...font(10, 700) } : {}]}>{"Watch"}</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Media"
                component={MovieSearchScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.wrapper}>
                            <Icon4 name="folder-sharp" size={30} color={focused ? defaultColors.WHITE : defaultColors.GRAY} />
                            <Text style={[styles.textStyle, focused ? { ...font(10, 700) } : {}]}>{"Media"}</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="More"
                component={MovieSeatScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.wrapper}>
                            <Icon3 name="list-bullet" size={30} color={focused ? defaultColors.WHITE : defaultColors.GRAY} />
                            <Text style={[styles.textStyle, focused ? { ...font(10, 700) } : {}]}>{"More"}</Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: defaultColors.PRIMARY,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    textStyle: {
        ...font(10, 400),
        color: defaultColors.WHITE,
        marginBottom: 20,
        marginTop: 2,
    },
    wrapper: {
        alignItems: "center",
        marginVertical: getHeightPercentage(3.3),
        width: getWidthPercentage(16),
    },
});

export default DashboardScreen;
