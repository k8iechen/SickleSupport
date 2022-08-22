import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { styles as sharedStyles } from "./Shared.styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 36,
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

  backButton: sharedStyles.backButton,

  form: {
    marginTop: 10,
    backgroundColor: "#EDECF4",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  card: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },

  cardText: {
    ...sharedStyles.cardTitleText,
  },

  questionText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: RFValue(16, 896),
    color: Colors.cardText,
    marginLeft: 17,
    marginBottom: 15,
    marginTop: 26,
  },

  errorModalText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: RFValue(16, 896),
    marginBottom: 30,
  },

  backModalText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: RFValue(16, 896),
    marginBottom: 10,
  },

  firstQuestion: {
    marginTop: 17,
  },

  cardTitle: {
    marginLeft: 17,
    marginTop: 5,
  },

  sleepSlider: {
    width: "100%",
    justifyContent: "center",
    marginTop: 5,
  },

  sleepSliderText: {
    color: Colors.cardText,
  },

  saveButton: {
    marginLeft: 28,
    marginRight: 28,
    marginTop: 13,
    marginBottom: 13,
    height: 56,
    color: Colors.success,
  },

  cancelButton: {
    width: wp("20.5"),
    borderRadius: 8,
    backgroundColor: Colors.backButton,
  },

  okButton: {
    width: wp("20.5"),
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },

  modalButtonText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: RFValue(16, 896),
    width: "100%",
    textAlign: "center",
    color: Colors.white,
  },

  cardHeader: {
    marginTop: 5,
    alignItems: "center",
  },

  sleepText: {
    fontSize: RFValue(20, 896),
    marginTop: 5,
    color: Colors.selection,
  },

  selectDropdown: {
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 18,
  },
});

export default styles;
