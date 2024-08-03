import { ViewStyle } from "react-native";
import { defaultColors } from "../../styles";


/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    inner: {
      height: "100%",
      justifyContent: "flex-start",
      padding: 24,
      width: "100%",
    } as ViewStyle,
    outer: {
      backgroundColor: defaultColors.WHITE,
      flex: 1,
      height: "100%",
    } as ViewStyle,
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   */
  scroll: {
    inner: {
      alignItems: "stretch",
      justifyContent: "flex-start",
      padding: 24,
    } as ViewStyle,
    outer: {
      backgroundColor: defaultColors.WHITE,
      flex: 1,
      height: "100%",
    } as ViewStyle,
  },
};
