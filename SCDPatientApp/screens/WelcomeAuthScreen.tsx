import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { observer } from "mobx-react-lite";

import { auth } from "../firebase";
import { FirestoreError } from "firebase/firestore";
import { RootStackScreenProps } from "../models/navigation";
import styles from "../styles/WelcomeAuthScreen.styles";
import { AuthContext } from "../contexts/AuthContext";

const WelcomeAuthScreen = observer(
  ({ navigation }: RootStackScreenProps<"Welcome">) => {
    const authStore = useContext(AuthContext);

    const handleLoginGuest = async () => {
      try {
        await authStore.signInAnonymously(auth);
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
);

export default WelcomeAuthScreen;
