import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 36,
  },

  tagLine: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 26,

    textAlign: "center",
    letterSpacing: -0.5,

    color: "#432C81",
  },

  title: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 32,
    lineHeight: 42,

    textAlign: "center",
    letterSpacing: -1,

    color: "#432C81",
  },

  image: {
    marginTop: 8,
  },

  questionContainer: {
    width: "100%",
    paddingLeft: 23,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  questionText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "left",
    color: "#1D335A",
    marginTop: 14,
    marginBottom: 6,
  },

  buttonRadioTextContainer: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginVertical: 6,
    marginHorizontal: 8,
    borderRadius: 3,
  },

  buttonRadioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 20,
  },

  buttonRadioText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },

  saveButton: {
    width: "80%",
    backgroundColor: "#5DB075",
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
