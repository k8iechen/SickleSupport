import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { styles as sharedStyles } from "./Shared.styles";

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginHorizontal: 20,
    backgroundColor: Colors.backButtonBackground,
    borderRadius: 24,
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,
    overflow: "hidden",
    width: 75,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
