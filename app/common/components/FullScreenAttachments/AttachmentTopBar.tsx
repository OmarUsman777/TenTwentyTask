import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultColors } from "../../../styles";
import { getHeightPercentage } from "../../../utils/responsiveSize";
import { font } from "../../../utils/font";

interface Props {
  title?: string;
  onClose: () => void;
}
const AttachmentTopBar = (props: Props) => {
  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity onPress={props.onClose}>
        <View
          style={styles.closeIcon}
        >
          <Icon2 name="close" size={24} color={defaultColors.WHITE} />
        </View>
      </TouchableOpacity>
      <Text
        style={styles.title}
      >
        {props.title ? props.title : "File"}
      </Text>
      <View />
    </View>
  );
};
const styles = StyleSheet.create({
  closeIcon: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 70,
  },
  container: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: defaultColors.BLACK,
    borderTopWidth: 0.5,
    flexDirection: "row",
    height: getHeightPercentage(6),
    justifyContent: "space-between",
  },
  title: {
    ...font(18, 400),
    color: defaultColors.WHITE
  }
})
export default AttachmentTopBar;
