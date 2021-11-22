import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import {
  Slider,
  VStack,
  ScrollView,
  Box,
  HStack,
  Button,
  View,
  Center,
} from "native-base";
import { observer } from "mobx-react-lite";

import { RootStackScreenProps } from "../models/navigation";
import styles from "../styles/DailyDiaryFormScreen.styles";
import SaveButton from "../components/SaveButton";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { TDiaryEntry } from "../models/DiaryEntry";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import DiaryStore from "../stores/dairy.store";

const DailyDiaryFormScreen = observer(
  ({ navigation }: RootStackScreenProps<"DailyDiaryFormScreen">) => {
    const [onChangeValue, setOnChangeValue] = React.useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);
    const authStore = useContext(AuthContext);
    const diaryStore = DiaryStore();

    const handleSave = async () => {
      const entry: TDiaryEntry = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      await diaryStore.addDiaryEntry(authStore.patient, entry);
    };

    return (
      <ScrollView style={styles.container}>
        <VStack>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={require("../assets/icons/back.png")} />
          </TouchableOpacity>
          <Text style={styles.title}>Daily Diary Entry</Text>
          <VStack space={10} style={styles.form}>
            <Box rounded="lg" style={styles.card}>
              <Text style={[styles.cardText, styles.cardTitle]}>Sleep</Text>
              <HStack space={3} alignItems="center" style={styles.sleepSlider}>
                <Text style={[styles.cardText, styles.sleepSliderText]}>-</Text>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  defaultValue={70}
                  colorScheme="cyan"
                  onChange={(v) => {
                    setOnChangeValue(Math.floor(v));
                  }}
                  onChangeEnd={(v) => {
                    v && setOnChangeEndValue(Math.floor(v));
                  }}
                  size="md"
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
                <Text style={styles.cardText}>+</Text>
              </HStack>
            </Box>
          </VStack>
        </VStack>
        <Center>
          <SaveButton onPress={handleSave} />
        </Center>
      </ScrollView>
    );
  }
);

export default DailyDiaryFormScreen;
