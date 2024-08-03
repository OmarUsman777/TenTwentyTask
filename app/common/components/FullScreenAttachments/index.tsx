import React, { useEffect, useRef } from "react";
import {
    Dimensions,
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    View,
} from "react-native";

import AttachmentTopBar from "./AttachmentTopBar";
import RenderVideo from "./RenderVideo";
import { defaultColors } from "../../../styles";

interface Props {
    file?: any;
    scrollIndex?: number;
    onClose: () => void;
    fullName?: string;
}
const { width: fullWidth, height: fullHeight } = Dimensions.get("window");

const FullScreenAttachments = (props: Props) => {

    return (
        <Modal onRequestClose={props.onClose} animationType="slide">
            <View style={styles.container} >
                <SafeAreaView />
                <AttachmentTopBar title={props.fullName} onClose={props.onClose} />
                <View style={styles.attachmentContainer}>
                    <RenderVideo
                        url={props.file}
                        onEnd={props.onClose}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    attachmentContainer: {
        backgroundColor: defaultColors.BLACK,
        height: fullHeight - 80,
        paddingTop: "5%",
        width: fullWidth,
    },
    container: {
        backgroundColor: defaultColors.BLACK,
        flex: 1,
    }
})
export default FullScreenAttachments;
