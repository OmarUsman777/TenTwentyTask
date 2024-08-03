import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../../utils/navigation';
import { defaultColors } from '../../../styles';
import Screen from '../../../ui/Screen';
import Header from '../../components/Header';
import { getHeightPercentage, getWidthPercentage } from '../../../utils/responsiveSize';
import SearchInput from '../../../ui/components/input/SearchInput';
import { GenreCard, MoviesPrimaryCard, MoviesSecondaryCard } from '../../../common/components/Cards';
import { getServerError } from '../../../utils/error';
import { Genre } from '../../types/movieDetails';
import { useGetGenreQuery, useSearchMoviesQuery } from '../../api/movie-search';
import { font } from '../../../utils/font';
import { useDebounce } from '../../../utils/useDebounce';
import { Divider } from '../../../ui/components/divider/Divider';
import { Movie } from '../../types/movie';

const images = [
    "/iAlsYg6dlv1fvOBypM7SldIS1Wl.jpg",
    "/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    "/8UOAYjhwSF3aPZhm6wgLuyHRyrR.jpg",
    "/kZbTOcTrEGyroQMWQSGIRlNSkwP.jpg",
    "/3QYkCbGbWdbGuBRBsociAl7J24.jpg",
    "/bVigVS3LVotEK4GsBlGOagkjPEc.jpg",
    "/nv6F6tz7r61DUhE7zgHwLJFcTYp.jpg",
    "/eSGBbCOX7KM3Rf8HHwK8tglklyS.jpg"
];

const MovieSearchScreen = () => {
    const navigation = useNavigation();
    // STATES
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [genre, setGenre] = useState<Genre[]>([]);
    const [searchValue, setSearchValue] = useState("");

    // DEBOUNCE
    // use debounce to wait for proper word, and delay the api call
    const debouncedSearchValue = useDebounce(searchValue, 500);

    // API HOOKS
    const { data, isLoading, error } = useGetGenreQuery("");
    const { refetch, data: searchData, error: searchError, isLoading: searchLoading } = useSearchMoviesQuery(debouncedSearchValue);
    const [searchList, setSearchList] = useState([]);
    const [empty, setEmpty] = useState(false);

    // USEEFFECTS
    useEffect(() => {
        if (data) {
            const genresWithImages = data.genres.map((genre: Genre) => ({
                ...genre,
                image: images[Math.floor(Math.random() * images.length)]
            }));
            setGenre(genresWithImages);
        }
        if (error) {
            // error handling, Toast should be shown here
            const errorResponse = getServerError(error);
            const message = errorResponse?.message;
            Alert.alert("err: ", message)
        }
    }, [data, error]);

    useEffect(() => {
        if (debouncedSearchValue.length >= 3) {
            refetch();
        }
    }, [debouncedSearchValue]);

    useEffect(() => {
        if (searchData && searchData?.results?.length) {
            setSearchList(searchData.results);
        } else if (searchValue.length) {
            setSearchList([]);
            setEmpty(true);
        }
        else {
            setSearchList([]);
            setEmpty(false);
        }
        if (searchError) {
            // error handling, Toast should be shown here
            const errorResponse = getServerError(searchError);
            const message = errorResponse?.message;
            Alert.alert("err: ", message)
        }
    }, [searchData, searchError]);

    // FUNCTIONS
    const onChangeSearch = (input: string) => {
        setSearchValue(input);
    };

    const toggleSearch = () => {
        setShowSearchBar(false);
        setSearchValue("");
    };

    const onMoviePress = (item: Movie) => {
        navigation.navigate("MovieDetailScreen", { movieId: item?.id });
    }

    const keyExtractor = (_item: any, index: number) => index.toString();

    const renderItem = ({ item }: { item: Genre }) => (
        <GenreCard item={item} onGenrePress={() => undefined} />
    );

    const renderSearchItem = ({ item }: { item: any }) => (
        <MoviesSecondaryCard item={item} onMoviePress={onMoviePress} />
    );

    const renderEmptyList = () => (
        <View style={styles.statsTextWrap}>
            <Text style={styles.description}>{`No Suggestions Found....`}</Text>
        </View>
    );

    const renderHeader = () => {
        return (
            <View>
                <Text style={styles.header}>Top Results</Text>
                <Divider />
            </View>
        )
    }

    // COULD BE IN SINGLE FLATLIST
    const renderFlatList = (data: Genre[], numColumns: number) => (
        <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listStyles}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderEmptyList}
            numColumns={numColumns}
            key={numColumns} // Add key to force re-render when numColumns changes
        />
    );

    const renderSearchFlatList = (data: any[]) => (
        <FlatList
            data={data}
            renderItem={renderSearchItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listStyles}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderEmptyList}
            ListHeaderComponent={data.length ? renderHeader : null}
            key={1} // Fixed key for single-column list
        />
    );

    return (
        <Screen noHorizontalPadding unsafe style={styles.container} statusBar='dark-content'>
            <Header>
                <SearchInput
                    value={searchValue}
                    onChange={onChangeSearch}
                    onSubmitSearch={() => null}
                    containerStyles={{ width: showSearchBar ? getWidthPercentage(90) : getWidthPercentage(53) }}
                    toggleSearch={toggleSearch}
                    placeholder="TV shows, movies and more"
                />
            </Header>
            <View style={[styles.form]}>
                {isLoading || searchLoading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        {searchList.length || empty ? renderSearchFlatList(searchList) : renderFlatList(genre, 2)}
                    </>
                )}
            </View>
        </Screen>
    );
};

export default MovieSearchScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: defaultColors.OFFWHITE,
    },
    form: {
        alignItems: 'center',
        marginBottom: getHeightPercentage(9),
    },
    listStyles: {
        marginTop: 15,
        paddingBottom: 50,
    },
    description: {
        ...font(14, 400),
        color: defaultColors.PRIMARY,
    },
    statsTextWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        ...font(14, 500),
        color: defaultColors.PRIMARY
    }
});
