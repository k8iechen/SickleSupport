import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 36,
  },

  title: {
    width: 260,
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
    marginLeft: 10,
    marginRight: 10,
  },

  cardText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 24,
  },

  cardHeader: {
    marginTop: 5,
    alignItems: "center",
  },

  cardTitle: {
    marginLeft: 17,
    marginTop: 5,
  },

  firstQuestion: {
    marginTop: 17,
  },

  subTitleText: {
    fontSize: 18,
    marginTop: 5,
    color: Colors.selection,
  },

  questionText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 14,
    color: Colors.cardText,
    marginLeft: 17,
    marginBottom: 15,
    marginTop: 26,
  },
});

export default styles;
