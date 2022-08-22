import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../constants/Colors";

export const styles = StyleSheet.create({
  backButton: {
    width: wp("12.3"),
    height: wp("12.3"),
    marginLeft: 28,
    marginTop: 49,
    backgroundColor: Colors.backButtonBackground,
    borderRadius: wp("2"),
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitleText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: RFValue(28, 896),
  },

  title: {
    width: wp("60"),
    height: hp("4.5"),
    marginLeft: 28,
    marginTop: 18,
    fontFamily: "Poppins-SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: RFValue(30, 896),
    color: Colors.title,
  },
});
