import { ActivityIndicator, Alert, Animated, FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGetUpcomingMoviesQuery } from '../../api/upcoming-movies';
import { getServerError } from '../../../utils/error';
import Screen from '../../../ui/Screen';
import { defaultColors } from '../../../styles';
import SearchIcon from "react-native-vector-icons/Feather"
import { font } from '../../../utils/font';
import { getHeightPercentage, getWidthPercentage } from '../../../utils/responsiveSize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MoviesPrimaryCard } from '../../../common/components/Cards';
import { useNavigation } from '../../../utils/navigation';
import { Movie } from '../../types/movie';
import AnimatedHeader from '../../components/AnimatedHeader';

const HomeScreen = () => {
    const navigation = useNavigation();

    // STATE
    const [dVal, setdVal] = useState(85)
    // REFS
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, dVal);
    // API HOOKS
    const { data, isLoading, error } = useGetUpcomingMoviesQuery("");

    // STATES
    const [movies, setMovies] = useState<Movie | any>([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Text style={{ ...font(16, 500) }}>Watch</Text>
            ),
            headerRight: () => (
                <SearchIcon onPress={() => navigation.navigate("Media")} name='search' color={defaultColors.PRIMARY} size={20} />
            ),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // USEEFFECTS
    useEffect(() => {
        if (data) {
            setMovies(data?.results);
        }
        if (error) {
            // error handling, Toast should be shown here
            const errorResponse = getServerError(error);
            const message = errorResponse?.message;
            Alert.alert("error: ", message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error]);

    // FUNCTIONS
    const onMoviePress = (item: Movie) => {
        navigation.navigate("MovieDetailScreen", { movieId: item?.id });
    }


    const translateY = diffClamp.interpolate({
        inputRange: [0, 45],
        outputRange: [0, -45],
    });


    const keyExtractor = (_item: any, index: number) => index.toString();

    const renderItem = (items: Movie | any) => {
        const { item } = items;
        return (
            <MoviesPrimaryCard item={item} onMoviePress={onMoviePress} />
        );
    };

    const renderEmptyList = () => {
        return (
            <View style={styles.statsTextWrap}>
                <Icon name='sentiment-very-dissatisfied' size={24} />
                <Text style={styles.description}>{`No Movies Found....`}</Text>
            </View>
        )
    }

    const renderFlatList = (data: any) => {
        return (
            <FlatList
                data={data}
                renderItem={itemData => renderItem(itemData)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listStyles}
                keyExtractor={keyExtractor}
                ListEmptyComponent={renderEmptyList}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                onScrollEndDrag={({ nativeEvent }) => {
                    if (nativeEvent.contentOffset.y <= 0) {
                        setdVal(0);
                    }
                    else {
                        setdVal(85)
                    }
                }}
            />
        );
    };

    return (
        <Screen unsafe style={styles.container} noHorizontalPadding statusBar='dark-content'>
            <Animated.View
                style={[
                    styles.header,
                    {
                        transform: [{ translateY: translateY }],
                        elevation: 4,
                        zIndex: 100,
                    },
                ]}
            >
                <AnimatedHeader
                    textLeft={"Watch"}
                    icon={<SearchIcon name="search" size={20} color={defaultColors.BLACK} />}
                    onSearch={() => navigation.navigate("Media")}
                />
            </Animated.View>
            <View style={styles.form}>
                {isLoading ? <ActivityIndicator size={40} color={defaultColors.PRIMARY} /> :
                    renderFlatList(movies)
                }
            </View>
        </Screen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultColors.OFFWHITE,
        padding: 0,
    },
    form: {
        alignItems: "center",
        // marginTop: getHeightPercentage(2)
    },
    coverImageContainer: {
        backgroundColor: defaultColors.LIGHT_GRAY,
        borderColor: defaultColors.PRIMARY,
        height: getHeightPercentage(22),
        justifyContent: "flex-end",
        marginTop: 16,
        paddingVertical: getHeightPercentage(2.5),
        resizeMode: "cover",
        width: getWidthPercentage(90),
        borderRadius: 10,
    },
    movieName: {
        alignSelf: "flex-start",
        color: defaultColors.WHITE,
        ...font(18, 500),
        marginLeft: getWidthPercentage(4)
    },
    listStyles: {
        marginTop: 15,
        paddingBottom: 50,
        paddingTop: getHeightPercentage(9)
    },

    description: {
        ...font(14, 400),
        color: defaultColors.PRIMARY
    },
    statsTextWrap: {
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'tomato',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
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

})