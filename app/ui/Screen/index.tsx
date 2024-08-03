import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TestProps } from "../../types";
import { presets } from "./utils";

// SCREEN COMPONENT FRO THE LAYOUT FOR EACH SCREEN.

const isIos = Platform.OS === "ios";

export interface ScreenProps extends TestProps {
  /** Children components. */
  children?: React.ReactNode;

  /** An optional style override useful for padding & margin. */
  style?: StyleProp<ViewStyle>;

  /** One of the different types of presets. */
  type?: "fixed" | "scroll" | "flatList";

  /** An optional background color */
  backgroundColor?: string;

  /** An optional status bar setting. Defaults to light-content. */
  statusBar?: "light-content" | "dark-content";

  /** Removes the safearea functionality. */
  unsafe?: boolean;

  /** Should keyboard persist on screen tap. Defaults to handled. Only applies to scroll preset. */
  keyboardShouldPersistTaps?: "handled" | "always" | "never";

  /** In many screens we need to add the horizontal padding separately.
   * Especially when we have section dividers
   * Make sure to add it back in your screen - paddingHorizontal:24*/
  noHorizontalPadding?: boolean;
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View
        style={[
          preset.inner,
          insetStyle,
          { paddingHorizontal: props.noHorizontalPadding ? 0 : undefined },
          style,
        ]}
      >
        {props.children}
      </View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      testID={props.testID}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[
            preset.inner,
            { paddingHorizontal: props.noHorizontalPadding ? 0 : undefined },
            style,
          ]}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || "handled"
          }
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const Screen = (props: ScreenProps) => {
  if (props.type === "scroll") {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
};

export default Screen;
