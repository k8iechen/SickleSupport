import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { auth } from "../firebase";
import { signInAnonymously } from "firebase/auth";
import { FirestoreError } from "firebase/firestore";
import { RootStackScreenProps } from "../models/types";

export default function WelcomeAuthScreen({
  navigation,
}: RootStackScreenProps<"Welcome">) {
  const handleLoginGuest = async () => {
    try {
      const cred = await signInAnonymously(auth);
      console.log(cred);
      navigation.navigate("Onboarding");
    } catch (error: unknown) {
      if (error instanceof FirestoreError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tagLine}>Welcome to</Text>
      <Text style={styles.title}>SCD Patient App</Text>

      <Image
        style={styles.image}
        source={require("../assets/images/lifesaver-using-computer.png")}
      />

      <Button
        style={styles.signUpButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>Sign Up</Text>
      </Button>
      <Button
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={[styles.buttonText, { color: "#432C81" }]}>Login</Text>
      </Button>

      <TouchableOpacity onPress={handleLoginGuest}>
        <Text style={styles.guestText}>Login as guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  tagLine: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 26,

    textAlign: "center",
    letterSpacing: -0.5,

    color: "#432C81",
  },

  title: {
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,

    textAlign: "center",
  },

  guestText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: "#82799D",
  },
});
