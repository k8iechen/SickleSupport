import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import {
  Slider,
  VStack,
  ScrollView,
  Box,
  HStack,
  Button,
  Center,
  View,
} from "native-base";
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
import Colors from "../constants/Colors";
import Scale from "../components/Scale";
import PictureScale from "../components/PictureScale";
import ToggleButton from "react-native-toggle-element";

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

    const [selectedSleepRating, setSelectedSleepRating] = React.useState(-1);
    const [selectedStressRating, setSelectedStressRating] = React.useState(-1);
    const [selectedMoodRating, setSelectedMoodRating] = React.useState("");
    const [sleepTime, setSleepTime] = React.useState(0);
    const [scrollEnabled, setScrollEnabled] = React.useState(true);
    const [toggleValue, setToggleValue] = React.useState(false);

    function getTimeText() {
      if (sleepTime == 0) {
        return sleepTime + "h";
      }
      var timeText = Math.floor(sleepTime / 2) + "h";
      if (sleepTime % 2 != 0) {
        timeText += " 30";
      }
      return timeText;
    }

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
      <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
        <VStack>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={require("../assets/icons/back.png")} />
          </TouchableOpacity>
          <Text style={styles.title}>Daily Diary Entry</Text>
        </VStack>
        <VStack style={styles.form}>
          <Box
            rounded="lg"
            style={[
              styles.card,
              {
                marginTop: 16,
              },
            ]}
          >
            <HStack space={2} style={styles.cardHeader}>
              <Text style={[styles.cardText, styles.cardTitle]}>Sleep</Text>
              <Text style={[styles.cardText, styles.sleepText]}>
                {getTimeText()}
              </Text>
            </HStack>
            <HStack space={3} style={styles.sleepSlider}>
              <TouchableOpacity
                onPress={() => {
                  if (sleepTime > 0) {
                    setSleepTime(sleepTime - 1);
                  }
                }}
              >
                <Text style={[styles.cardText, styles.sleepSliderText]}>-</Text>
              </TouchableOpacity>
              <Slider
                style={{
                  width: "75%",
                  zIndex: 1,
                }}
                value={sleepTime}
                onChange={(v) => {
                  setScrollEnabled(false);
                  setSleepTime(Math.floor(v));
                }}
                onChangeEnd={(v) => {
                  setScrollEnabled(true);
                }}
                minValue={0}
                maxValue={48}
                size="lg"
              >
                <Slider.Track bg={"#c1d9f7"}>
                  <Slider.FilledTrack bg={Colors.selection} />
                </Slider.Track>
                <Slider.Thumb bg={Colors.selection} />
              </Slider>
              <TouchableOpacity
                onPress={() => {
                  if (sleepTime < 48) {
                    setSleepTime(sleepTime + 1);
                  }
                }}
              >
                <Text style={[styles.cardText, styles.sleepSliderText]}>+</Text>
              </TouchableOpacity>
            </HStack>
            <Scale
              data={["Awful", "Poor", "OK", "Good", "Great"]}
              selectedButton={selectedStressRating}
              setSelectedButton={setSelectedStressRating}
            />
          </Box>
          <Box
            rounded="lg"
            style={[
              styles.card,
              {
                marginTop: 10,
                marginBottom: 10,
              },
            ]}
          >
            <HStack space={2} style={styles.cardHeader}>
              <Text style={[styles.cardText, styles.cardTitle]}>Stress</Text>
            </HStack>
            <Scale
              data={["Lowest", "Low", "Medium", "High", "Highest"]}
              reverse={true}
              selectedButton={selectedSleepRating}
              setSelectedButton={setSelectedSleepRating}
            />
          </Box>
          <Box
            rounded="lg"
            style={[
              styles.card,
              {
                marginBottom: 19,
              },
            ]}
          >
            <HStack space={2} style={styles.cardHeader}>
              <Text style={[styles.cardText, styles.cardTitle]}>Mood</Text>
            </HStack>
            <Center>
              <ToggleButton
                value={toggleValue}
                onPress={(newState) => setToggleValue(newState)}
                trackBar={{
                  activeBackgroundColor: "#F6F6F6",
                  inActiveBackgroundColor: "#F6F6F6",
                  borderActiveColor: "#E8E8E8",
                  borderInActiveColor: "#E8E8E8",
                  borderWidth: 1,
                  width: 250,
                }}
                thumbButton={{
                  width: 125,
                  activeBackgroundColor: "#ffffff",
                  inActiveBackgroundColor: "#ffffff",
                }}
                leftComponent={
                  <View
                    style={{
                      width: 125,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: 16,
                        color: toggleValue ? "#BDBDBD" : Colors.selection,
                      }}
                    >
                      No
                    </Text>
                  </View>
                }
                rightComponent={
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: 16,
                        color: toggleValue ? Colors.success : "#BDBDBD",
                      }}
                    >
                      Yes
                    </Text>
                  </View>
                }
              />
            </Center>
            <PictureScale
              data={["Stressed", "Sad", "Calm", "Happy", "Excited"]}
              pictureData={[
                require("../assets/images/stress_face.png"),
                require("../assets/images/sad_face.png"),
                require("../assets/images/calm_face.png"),
                require("../assets/images/happy_face.png"),
                require("../assets/images/excited_face.png"),
              ]}
              selectedButton={selectedMoodRating}
              setSelectedButton={setSelectedMoodRating}
            />
          </Box>
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
          <Center>
            <SaveButton onPress={handleSave} />
          </Center>
        </VStack>
      </ScrollView>
    );
  }
);

export default DailyDiaryFormScreen;
