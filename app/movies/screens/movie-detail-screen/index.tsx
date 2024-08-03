import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useGetSingleMovieQuery } from '../../api/single-movie';
import { useNavigation } from '../../../utils/navigation';
import BackIcon from 'react-native-vector-icons/Ionicons';
import SearchIcon from "react-native-vector-icons/Feather"
import PlayIcon from "react-native-vector-icons/Entypo"
import { getServerError } from '../../../utils/error';
import Screen from '../../../ui/Screen';
import { defaultColors } from '../../../styles';
import { font } from '../../../utils/font';
import { getHeightPercentage, getWidthPercentage } from '../../../utils/responsiveSize';
import FastImage from "react-native-fast-image"
import { MovieDetails } from '../../types/movieDetails';
import SimpleButton from '../../../ui/components/buttons/SimpleButton';
import ButtonOutline from '../../../ui/components/buttons/OutlineButton';
import moment from "moment"
import { Divider } from '../../../ui/components/divider/Divider';
import { getRandomColor } from '../../../utils/getColors';
import FullScreenAttachments from '../../../common/components/FullScreenAttachments';
type Genre = MovieDetails['genres'][number];

const MovieDetailScreen = (props: any) => {
  const navigation = useNavigation();
  const { movieId } = props?.route?.params;
  // API HOOKS
  const { refetch, data, error, isLoading } = useGetSingleMovieQuery(movieId);
  // STATES
  const [movie, setMovie] = useState<MovieDetails>();
  const [genre, setGenre] = useState<Genre | any>();
  const [openVideo, setOpenVideo] = useState(false);

  // HEADER LAYOUT
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text style={{ ...font(16, 500) }}>Watch</Text>
      ),
      headerRight: () => (
        <SearchIcon name='search' color={defaultColors.PRIMARY} size={20} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USEEFFECTS
  useEffect(() => {
    if (data) {
      setMovie(data as MovieDetails);
      if (data?.genres?.length) {
        setGenre(data?.genres);
      }
    }
    if (error) {
      // error handling, Toast should be shown here
      const errorResponse = getServerError(error);
      const message = errorResponse?.message;
      Alert.alert("error: ", message);
    }
  }, [data, error])

  // FUNCTIONS
  const toggleVideoModal = () => {
    setOpenVideo(pre => !pre);
  }

  const renderBackground = useMemo(() => {
    return (
      <FastImage
        resizeMode='cover'
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.posterPath}` }}
        style={[styles.backgroundImage, { justifyContent: "space-between" }]}>
        {/* HEADER SECTION */}
        <View style={styles.overlay} />
        <View style={styles.buttonsWrap}>
          <View style={{ alignItems: 'center', flexDirection: "row" }}>
            <BackIcon name='chevron-back' color={defaultColors.WHITE} size={32} onPress={() => navigation.pop()} />
            <Text style={{ ...font(16, 500), color: defaultColors.WHITE }}>Watch</Text>
          </View>
        </View>
        {/* BUTTONS SECTION */}
        <View style={[{ alignSelf: 'center', alignItems: 'center', marginBottom: getHeightPercentage(10) }]}>
          <Text style={styles.headerText}>In Theaters {moment(movie?.releaseDate).format("LL")}</Text>
          <SimpleButton
            onPress={() => navigation.navigate("More")}
            text="Get Tickets"
            style={styles.button}
          />
          <ButtonOutline
            icon={<PlayIcon name="controller-play" size={20} color="#FFFFFF" />}
            style={styles.button}
            onPress={toggleVideoModal}
            text={'Watch Trailer'} />
        </View>
      </FastImage>
    )
  }, [movie])

  const renderGenre = useMemo(() => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {genre?.map((val: Genre) => (
          <View style={[styles.genre, { backgroundColor: getRandomColor() }]}>
            <Text style={styles.tag}>{val.name}</Text>
          </View>
        ))}
      </View>
    )
  }, [genre])

  return (
    <Screen type="scroll" unsafe statusBar="dark-content" noHorizontalPadding style={styles.container}>
      {renderBackground}
      <View style={styles.form}>
        <Text style={styles.heading}>Genres</Text>
        {renderGenre}
        <Divider style={{ marginVertical: getHeightPercentage(3) }} />
        <Text style={styles.heading}>Overview</Text>
        <View>
          <Text style={styles.desc}>{movie?.overview}</Text>
        </View>
      </View>
      {/* GIVING SAMPLE VIDEO DUE TO TRAILER VID API UNAVAILABILITY */}
      {openVideo ? (
        <FullScreenAttachments
          file={"https://res.cloudinary.com/dxq9ddyd0/video/upload/v1721651377/samples/elephants.mp4"}
          onClose={toggleVideoModal}
          fullName={movie?.originalTitle}
        />
      ) : null}
    </Screen>
  )
}

export default MovieDetailScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: defaultColors.OFFWHITE,
    padding: 0
  },
  form: {
    marginVertical: getHeightPercentage(3.6),
    marginHorizontal: getWidthPercentage(4.5)
  },
  backgroundImage: {
    height: getHeightPercentage(58),
  },
  buttonsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidthPercentage(4.8),
    marginTop: getHeightPercentage(5.7)
  },
  button: {
    width: getWidthPercentage(65),
    marginTop: 7
  },
  headerText: {
    ...font(16, 600),
    color: defaultColors.WHITE,
    marginBottom: 2
  },
  heading: {
    ...font(16, 500),
    color: defaultColors.BLACK,
    marginBottom: 8
  },
  tag: {
    ...font(12, 600),
    color: defaultColors.WHITE,
  },
  desc: {
    ...font(14, 400),
    color: defaultColors.TEXT_GRAY
  },
  genre: {
    padding: 7,
    marginRight: 6,
    borderRadius: 15
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
  },
})