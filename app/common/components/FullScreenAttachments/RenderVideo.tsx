import React, { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Alert, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import Video from "react-native-video";
import { defaultColors } from "../../../styles";
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  url: string,
  scrollIndex?: number | undefined,
  onEnd: () => void
}
const RenderVideo = (props: Props) => {

  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(true)

  return (
    <View
    >
      {isLoading && (
        <View style={styles.main}>
          <ActivityIndicator size={"large"} color={defaultColors.WHITE} />
        </View>
      )}
      {
        (isPaused || Platform.OS === "android") &&
        <TouchableWithoutFeedback onPress={() => setIsPaused(!isPaused)}>
          <View style={styles.pausedView}>
            {
              isPaused && !isLoading &&
              <Icon2 name="play-box" size={35} color={defaultColors.WHITE} />
            }
          </View>
        </TouchableWithoutFeedback>
      }
      <View />
      {/* TODO:  MAKE IT MORE CLOSE TI IMDB */}
      <Video
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        source={{ uri: props.url }}
        minLoadRetryCount={3}
        controls={true}
        onEnd={props.onEnd}
        // paused={props.index == props.scrollIndex ? false : true}
        paused={isPaused}
        onError={(e: any) => {
          setIsLoading(false);
          Alert.alert(e?.error?.localizedFailureReason
            ? e?.error?.localizedFailureReason : "error loading video")
        }}
        fullscreen={true}
        resizeMode="contain"
        style={styles.videoContainer}
      />
    </View>
  );
};

export default RenderVideo

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  pausedImg: {
    backgroundColor: defaultColors.BLACK,
    borderRadius: 25,
    height: 50,
    tintColor: defaultColors.WHITE,
    width: 50
  },
  pausedView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    height: "95%",
    justifyContent: "center",
    zIndex: 1
  },
  videoContainer: {
    height: "95%",
    width: "100%"
  }
})