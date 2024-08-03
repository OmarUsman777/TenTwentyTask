import React from "react";
import { View, ViewStyle } from "react-native";
import { defaultColors } from "../../../styles";


interface DividerProps {
    marginVertical?: number;
    height?: number;
    style?: ViewStyle;
}

export const Divider = ({ height = 1, marginVertical = 12, style }: DividerProps) => (
    <View style={[{ backgroundColor: defaultColors.LIGHT_GRAY, height, marginVertical }, style]} />
);
