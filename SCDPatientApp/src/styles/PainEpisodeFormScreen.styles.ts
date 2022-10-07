import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { styles as sharedStyles } from "./Shared.styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 36,
  },

  backButton: sharedStyles.backButton,
  title: {
    ...sharedStyles.title,
    marginBottom: 10,
    lineHeight: 38,
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

  cancelButton: {
    width: 80,
    borderRadius: 8,
    backgroundColor: Colors.backButton,
  },

  okButton: {
    width: 80,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },

  modalButtonText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    color: Colors.white,
  },

  backModalText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default styles;
