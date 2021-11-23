import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 36,
  },

  title: {
    width: 233,
    height: 38,
    marginLeft: 28,
    marginTop: 18,
    fontFamily: "Poppins-SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 28,
    lineHeight: 38,
    color: Colors.title,
  },

  // backImage: {
  //   color: Colors.backButtonArrow,
  // },

  backButton: {
    width: 48,
    height: 48,
    marginLeft: 28,
    marginTop: 49,
    backgroundColor: Colors.backButtonBackground,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    marginTop: 10,
    backgroundColor: "#EDECF4",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  card: {
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  cardText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 24,
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

  cardHeader: {
    marginTop: 5,
    alignItems: "center",
  },

  sleepText: {
    fontSize: 18,
    marginTop: 5,
    color: Colors.selection
  },

});

export default styles;
