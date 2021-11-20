import { StyleSheet } from "react-native";
import color from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 36,
  },

  title: {
    position: "absolute",
    width: 233,
    height: 38,
    left: 28,
    top: 115,
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 28,
    lineHeight: 38,
    color: color.title,
  },

  backImage: {
    position: "absolute",
    left: "16.67%",
    right: "16.67%",
    top: "17.59%",
    bottom: "17.59%",
    color: color.backButtonArrow,
  },

  backButton: {
    position: "absolute",
    width: 48,
    height: 48,
    left: 28,
    top: 49,
    backgroundColor: color.backButtonBackground,
    borderRadius: 14,
  },
});

export default styles;
