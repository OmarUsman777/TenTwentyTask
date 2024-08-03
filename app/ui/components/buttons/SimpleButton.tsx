import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import { defaultColors } from '../../../styles';
import { font } from '../../../utils/font';

interface CustomButtonProps {
    onPress: () => void;
    text: string;
    textStyle?: TextStyle;
    style?: ViewStyle;
    icon?: React.ReactElement<IconProps>;
}

const SimpleButton = ({ onPress, text, textStyle, style, icon }: CustomButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <View style={styles.content}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        backgroundColor: defaultColors.BLUE,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: defaultColors.WHITE,
        ...font(14, 600)
    },
    iconContainer: {
        marginRight: 8,
    },
});

export default SimpleButton;
