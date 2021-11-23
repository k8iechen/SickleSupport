import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { Slider, VStack, ScrollView, Box, HStack, Center } from "native-base";
import { observer } from "mobx-react-lite";

import { RootStackScreenProps } from "../models/navigation";
import styles from "../styles/DailyDiaryFormScreen.styles";
import SaveButton from "../components/SaveButton";
import { serverTimestamp } from "firebase/firestore";
import { TDiaryEntry } from "../models/DiaryEntry";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import DiaryStore from "../stores/dairy.store";
import CustomSelect from "../components/CustomSelect";

const diaryMedicationTypes = [
  {
    id: "Hydroxyurea",
    name: "Hydroxyurea",
  },
  {
    id: "Iron Chelator",
    name: "Iron Chelator",
  },
  {
    id: "Folic Acid",
    name: "Folic Acid",
  },
  {
    id: "Vitamin D",
    name: "Vitamin D",
  },
];

const painTypes = [
  {
    id: "Chronic",
    name: "Chronic",
  },
  {
    id: "Acute",
    name: "Acute",
  },
];

const DailyDiaryFormScreen = observer(
  ({ navigation }: RootStackScreenProps<"DailyDiaryFormScreen">) => {
    const [onChangeValue, setOnChangeValue] = React.useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);
    const authStore = useContext(AuthContext);
    const diaryStore = DiaryStore();

    // will need state per dropdown and slider value to pass into the diary entry later on
    const [medications, setMedications] = React.useState([]);
    const onSelectedMedicationsChanged = (selectedItems: any[]) => {
      // @ts-ignore
      setMedications(selectedItems);
    };

    const [painType, setPainType] = React.useState([]);
    const onPainTypeChanged = (selectedPainTypes: any[]) => {
      // @ts-ignore
      setPainType(selectedPainTypes);
    };

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
          <VStack space={0} style={styles.form}>
            <Box rounded="lg" style={[styles.card, styles.topCard]}>
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
            {/* Medicine compliance */}
            <Box rounded="lg" style={styles.card}>
              <Text style={[styles.cardText, styles.cardTitle]}>Medicine</Text>
              <Box
                style={{
                  margin: 17,
                }}
              >
                <CustomSelect
                  single={false}
                  choices={diaryMedicationTypes}
                  selectText="Select medication(s)"
                  selections={medications}
                  onSelectedItemsChange={onSelectedMedicationsChanged}
                />
              </Box>
            </Box>
            {/* Pain */}
            <Box rounded="lg" style={styles.card}>
              <Text style={[styles.cardText, styles.cardTitle]}>Pain</Text>
              <Text style={[styles.questionText, styles.firstQuestion]}>
                Did you feel pain today?
              </Text>

              <Text style={[styles.questionText]}>
                Which pain are you feeling?
              </Text>
              <Box
                style={{
                  margin: 17,
                }}
              >
                <CustomSelect
                  single={true}
                  selectText="Select pain type"
                  choices={painTypes}
                  selections={painType}
                  onSelectedItemsChange={onPainTypeChanged}
                />
              </Box>
            </Box>
            {/* Other */}
            <Box rounded="lg" style={[styles.card, styles.bottomCard]}>
              <Text style={[styles.cardText, styles.cardTitle]}>Other</Text>
              <Text style={[styles.questionText, styles.firstQuestion]}>
                Have you had trouble with vision today?
              </Text>
              {/* <Toggle selected={} onClick={} /> */}
              <Text style={[styles.questionText]}>
                Have you had a priapism episode today?
              </Text>
              {/* render slider 2 here */}
              <Text style={[styles.questionText]}>
                Have you had a fever today?
              </Text>
              {/* render slider 2 here */}
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
