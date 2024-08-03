import React, { useState } from "react";
import { StyleSheet, TextStyle, View, ViewStyle, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using Material Icons for search and clear icons
import { defaultColors } from "../../../styles";

interface SearchInputProps {
    value: string;
    onChange: (input: string) => void;
    style?: TextStyle;
    onSubmitSearch: () => void;
    containerStyles?: ViewStyle;
    toggleSearch: () => void;
    placeholder?: string
}

const SearchInput = ({
    style,
    containerStyles,
    value,
    onChange,
    onSubmitSearch,
    toggleSearch,
    placeholder
}: SearchInputProps) => {
    const [focused, setFocused] = useState(false);

    const onClearPress = () => {
        toggleSearch();
    };

    return (
        <View style={[styles.container, containerStyles]}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color={defaultColors.GRAY} style={styles.searchIcon} />
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    returnKeyType="search"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={[styles.textInput, style]}
                    onSubmitEditing={onSubmitSearch}
                    placeholder={placeholder}
                />
                {value ? (
                    <TouchableOpacity onPress={onClearPress} style={styles.clearIconContainer}>
                        <Icon name="clear" size={24} color={defaultColors.GRAY} style={styles.clearIcon} />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 200,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EFEFEF",
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 5,
        width: '100%',
    },
    searchIcon: {
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        height: 40,
        color: defaultColors.BLACK,
    },
    clearIconContainer: {
        marginLeft: 8,
    },
    clearIcon: {},
});

export default SearchInput;
