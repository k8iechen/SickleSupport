import React, { useState, useContext } from "react";
import { Text, Image } from "react-native";
import { Button, Input, Stack, Center, ScrollView } from "native-base";
import { observer } from "mobx-react-lite";

import { RootStackScreenProps } from "../models/types";
import { TPatient, Age, Gender } from "../models/Patient";
import { AuthContext } from "../contexts/AuthContext";
import ButtonRadio from "../components/ButtonRadio";
import styles from "../styles/OnboardingScreen.styles";

const OnboardingScreen = observer(
  ({ navigation }: RootStackScreenProps<"Onboarding">) => {
    const authStore = useContext(AuthContext);

    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<Age | null>(null);
    const [gender, setGender] = useState<Gender | null>(null);
    const [notification, setNotification] = useState<number | null>(null);

    const handleSave = async () => {
      try {
        authStore.setPatient({
          uid: authStore.patient!.uid!,
          name,
          age,
          gender,
          notification,
        } as TPatient);
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
              <ButtonRadio onPress={() => setAge(Age.Preteen)}>
                10-15
              </ButtonRadio>
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
              <ButtonRadio onPress={() => setNotification(10 * 3600)}>
                10:00 am
              </ButtonRadio>
              <ButtonRadio onPress={() => setNotification(12 * 3600 + 20 * 60)}>
                12:20 pm
              </ButtonRadio>
              <ButtonRadio onPress={() => setNotification((12 + 8) * 3600)}>
                08:00 pm
              </ButtonRadio>
              {/* <ButtonRadio onPress={() => setNotification()}>
              Other
            </ButtonRadio> */}
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
);

export default OnboardingScreen;
