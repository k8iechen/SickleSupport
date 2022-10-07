import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  saveButton: {
    width: "80%",
    backgroundColor: Colors.success,
    borderRadius: 8,
    marginVertical: 16,
  },

  saveText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: RFValue(16, 896),
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default styles;
