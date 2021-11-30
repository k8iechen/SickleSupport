import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

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
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default styles;
