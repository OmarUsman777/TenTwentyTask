import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { defaultColors } from '../../styles';
import { getHeightPercentage, getWidthPercentage } from '../../utils/responsiveSize';
import { font } from '../../utils/font';
import { Movie } from '../../movies/types/movie';
import { Genre } from '../../movies/types/movieDetails';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from "react-native-fast-image"

interface MoviesPrimaryCardProps {
    item: Movie;
    onMoviePress: (item: Movie) => void;
}

interface GenreCardProps {
    item: Genre
    onGenrePress: (item: any) => void;
}


export const MoviesPrimaryCard = ({ item, onMoviePress }: MoviesPrimaryCardProps) => {
    return (
        <TouchableOpacity onPress={() => onMoviePress(item)}>
            <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                style={styles.coverImageContainer}
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            >
                <Text style={styles.movieName}>
                    {item.original_title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export const MoviesSecondaryCard = ({ item, onMoviePress }: MoviesPrimaryCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onMoviePress(item)}>
            <FastImage
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{item.original_title}</Text>
                <Text style={styles.genre}>{item.vote_average}</Text>
            </View>
            <TouchableOpacity onPress={() => onMoviePress(item)}>
                <Icon name="more-vert" size={24} color={defaultColors.BLUE} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export const GenreCard = ({ item, onGenrePress }: GenreCardProps) => {
    return (
        <TouchableOpacity style={{ marginHorizontal: 6 }} onPress={() => onGenrePress(item)}>
            <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                style={styles.genreImage}
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.image}` }}
            >
                <View style={styles.overlay} />
                <Text style={styles.movieName}>
                    {item.name}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
        ...font(16, 500),
        marginLeft: getWidthPercentage(4),
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
    },
    genreImage: {
        backgroundColor: defaultColors.LIGHT_GRAY,
        borderColor: defaultColors.PRIMARY,
        height: getHeightPercentage(14),
        justifyContent: "flex-end",
        marginTop: 10,
        paddingVertical: getHeightPercentage(2),
        width: getWidthPercentage(43),
        borderRadius: 10,
    },

    //
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: getWidthPercentage(90),
    },
    image: {
        width: getWidthPercentage(35),
        height: getWidthPercentage(25),
        borderRadius: 10,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 4
    },
    name: {
        color: defaultColors.BLACK,
        ...font(16, 600),
    },
    genre: {
        color: defaultColors.GRAY,
        ...font(14, 400),
    },
});
