import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 18,
    marginBottom: 80,
  },

  signUpButton: {
    width: "80%",
    backgroundColor: "#432C81",
    borderRadius: 8,
    marginBottom: 16,
  },

  loginButton: {
    width: "80%",
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#432C81",
    borderRadius: 8,

    marginBottom: 24,
  },

  buttonText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,

    textAlign: "center",
  },

  guestText: {
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: "#82799D",
  },
});

export default styles;
