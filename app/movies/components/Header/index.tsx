import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getHeightPercentage, getWidthPercentage } from '../../../utils/responsiveSize';
import { defaultColors } from '../../../styles';
import { font } from '../../../utils/font';
import SearchInput from '../../../ui/components/input/SearchInput';

//ACCEPTS FIVE PROPS 1) navigation 2) centerText 3) endText (optional) 4) onDone Function (optional) 5) icon bool (true = "Back Icon")

interface HeaderProps {
  children: ReactNode
}
const Header: React.FC<HeaderProps> = ({
  children
}) => {
  return (
    <View style={styles.header}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: getWidthPercentage(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultColors.WHITE,
    height: getHeightPercentage(13.5),
    paddingTop: getHeightPercentage(3.4)
  },
  centerText: {
    ...font(16, 500),
    color: defaultColors.PRIMARY,
  },
  endText: {
    ...font(12, 400),
    color: defaultColors.PRIMARY,
  },
});


export default Header;
