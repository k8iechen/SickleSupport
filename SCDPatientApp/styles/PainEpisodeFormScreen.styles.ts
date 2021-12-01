import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 36,
  },

  title: {
    width: 260,
    height: 38,
    marginLeft: 28,
    marginTop: 18,
    marginBottom: 10,
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

  medicineQuestion: {
    marginTop: 10,
    marginBottom: 15,
  },

  questionTopSpacing: {
    marginTop: 15,
  },

  topSpacing: {
    marginTop: 10,
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

  narrowQuestionText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 14,
    color: Colors.cardText,
    marginLeft: 17,
    marginTop: 12,
  },

  selectDropdown: {
    marginLeft: 17,
    marginRight: 17,
  },
});

export default styles;
