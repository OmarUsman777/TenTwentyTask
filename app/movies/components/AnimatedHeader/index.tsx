import React, { useState } from "react";
import { StyleSheet, TextStyle, View, ViewStyle, Animated, Text, TouchableOpacity } from "react-native";
import { IconProps } from "react-native-vector-icons/Icon";
import { getHeightPercentage, getWidthPercentage } from "../../../utils/responsiveSize";
import { font } from "../../../utils/font";
import { defaultColors } from "../../../styles";


interface AnimatedHeaderProps {
    headerHeight?: any,
    opacity?: any,
    textCenter?: string,
    textLeft?: string,
    icon?: React.ReactElement<IconProps>,
    onSearch: () => void
}

const AnimatedHeader = ({
    textCenter,
    textLeft,
    icon,
    onSearch

}: AnimatedHeaderProps) => {

    return (
        <View style={styles.header}>
            {textLeft ? (
                <Text style={styles.headerText}>{textLeft}</Text>
            ) : null}
            {textCenter ? (
                <Text style={styles.headerText}>{textLeft}</Text>
            ) : <></>}
            {icon ? (
                <TouchableOpacity onPress={onSearch}>{icon}</TouchableOpacity>
            ) : <></>}

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: defaultColors.WHITE,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getWidthPercentage(4.5),
        paddingTop: getHeightPercentage(4.4),
        height: getHeightPercentage(12)
    },
    headingStyle: {
        ...font(20, 500),
        color: defaultColors.BLACK
    },
    headerText: {
        color: defaultColors.BLACK,
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
    },
});

export default AnimatedHeader;
