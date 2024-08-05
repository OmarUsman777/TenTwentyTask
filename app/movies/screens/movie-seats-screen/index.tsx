import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Screen from '../../../ui/Screen'
import { useNavigation } from '../../../utils/navigation'
import BackIcon from 'react-native-vector-icons/Ionicons';
import { defaultColors } from '../../../styles'

const MovieSeatScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <BackIcon name='chevron-back' color={defaultColors.BLACK} size={32} onPress={() => navigation.pop()} />
            ),
            headerRight: () => (
                <Text></Text>
            ),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Screen style={styles.container} >
            <Text>MovieSeatScreen</Text>
            <Text>To be Completed...</Text>
        </Screen>
    )
}

export default MovieSeatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultColors.OFFWHITE
    }
})