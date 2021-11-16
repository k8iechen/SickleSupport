import React, { useState, useContext } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Button, Input, Stack, Center, ScrollView } from "native-base";
import { doc, setDoc } from "firebase/firestore";

import { RootStackScreenProps } from "../models/types";
import { TUser, Age, Gender, Notification } from "../models/User";
import { db } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";
import ButtonRadio from "../components/ButtonRadio";

export default function OnboardingScreen({
  navigation,
}: RootStackScreenProps<"Onboarding">) {
  const user = useContext<TUser | null | undefined>(AuthContext);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<Age | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "users", user!.uid!), {
        name,
        age,
        gender,
        notification,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <Center style={styles.container}>
        <Text style={styles.tagLine}>Welcome</Text>
        <Text style={styles.title}>Onboarding</Text>

        <Image
          style={styles.image}
          source={require("../assets/images/lifesaver-standing.png")}
        />

        <Stack style={styles.questionContainer}>
          <Text style={styles.questionText}>What is your name?</Text>
          <Input
            value={name}
            placeholder="Full name"
            w="90%"
            onChangeText={(text) => setName(text)}
          />
          <Text style={styles.questionText}>What is your age?</Text>
          <ButtonRadio.Group>
            <ButtonRadio onPress={() => setAge(Age.Child)}>0-9</ButtonRadio>
            <ButtonRadio onPress={() => setAge(Age.Preteen)}>10-15</ButtonRadio>
            <ButtonRadio onPress={() => setAge(Age.Teen)}>15-24</ButtonRadio>
            <ButtonRadio onPress={() => setAge(Age.Adult)}>25-64</ButtonRadio>
            <ButtonRadio onPress={() => setAge(Age.Senior)}>65+</ButtonRadio>
            <ButtonRadio onPress={() => setAge(null)}>
              Rather Not Say
            </ButtonRadio>
          </ButtonRadio.Group>
          <Text style={styles.questionText}>What is your gender?</Text>
          <ButtonRadio.Group>
            <ButtonRadio onPress={() => setGender(Gender.Male)}>
              Male
            </ButtonRadio>
            <ButtonRadio onPress={() => setGender(Gender.Female)}>
              Female
            </ButtonRadio>
            <ButtonRadio onPress={() => setGender(Gender.Other)}>
              Other
            </ButtonRadio>
            <ButtonRadio onPress={() => setGender(null)}>
              Rather Not Say
            </ButtonRadio>
          </ButtonRadio.Group>
          <Text style={styles.questionText}>
            When do you want daily notification reminders?
          </Text>
          <ButtonRadio.Group>
            <ButtonRadio onPress={() => setNotification(Notification.Morning)}>
              10:00 am
            </ButtonRadio>
            <ButtonRadio onPress={() => setNotification(Notification.Noon)}>
              12:20 pm
            </ButtonRadio>
            <ButtonRadio onPress={() => setNotification(Notification.Evening)}>
              08:00 pm
            </ButtonRadio>
            <ButtonRadio onPress={() => setNotification(Notification.Other)}>
              Other
            </ButtonRadio>
            <ButtonRadio onPress={() => setNotification(null)}>
              Never
            </ButtonRadio>
          </ButtonRadio.Group>
        </Stack>

        <Button style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </Button>
      </Center>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 36,
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
    marginTop: 8,
  },

  questionContainer: {
    width: "100%",
    paddingLeft: 23,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  questionText: {
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,

    textAlign: "center",

    color: "#FFFFFF",
  },
});
