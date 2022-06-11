import { StyleSheet } from "react-native";
import { styles as sharedStyles } from "./Shared.styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  title: {
    ...sharedStyles.cardTitleText,
    marginLeft: 10,
    lineHeight: 0,
  },

  description: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: RFValue(16, 896),
    marginBottom: 30,
  },
});
