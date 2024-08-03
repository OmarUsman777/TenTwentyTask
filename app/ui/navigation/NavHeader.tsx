import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { font } from "../../utils/font";
import { defaultColors } from "../../styles";


/** Custom navigation header */
const NavHeader = ({ navigation, route, options, ...props }: NativeStackHeaderProps | BottomTabHeaderProps) => {
    const title = getHeaderTitle(options, route.name);

    const back = "back" in props ? props.back : undefined;

    return (
        <SafeAreaView edges={["top"]} style={styles.base}>
            <View style={styles.content}>
                {options.headerLeft ? options.headerLeft({ canGoBack: false }) :
                    <View />
                }
                <Text style={styles.headingStyle}>{title}</Text>
                {options.headerRight ? options.headerRight({ canGoBack: false }) : <View />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    base: {
        backgroundColor: defaultColors.WHITE
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    headingStyle: {
        ...font(20, 500),
        color: defaultColors.WHITE
    },
    leftBtn: { marginRight: 2 },
    // leftSide: {
    //     flexDirection: "row",
    //     justifyContent: "space-between"
    // },
});

export default NavHeader;
