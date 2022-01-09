import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  cardTitleText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: RFValue(28, 896),
  },
});
