// eslint-disable-next-line no-restricted-imports
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useNavigation = () => useReactNavigation<NativeStackNavigationProp<any>>();
