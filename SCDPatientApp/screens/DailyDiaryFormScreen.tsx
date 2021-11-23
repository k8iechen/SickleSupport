import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import {
  Slider,
  VStack,
  ScrollView,
  Box,
  HStack,
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
import { Moods } from "../constants/Moods";

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
    const [selectedSleepRating, setSelectedSleepRating] = React.useState(-1);
    const [selectedStressRating, setSelectedStressRating] = React.useState(-1);
    const [selectedMoodRating, setSelectedMoodRating] = React.useState(-1);
    const [sleepHours, setSleepHours] = React.useState(0);
    const [scrollEnabled, setScrollEnabled] = React.useState(true);
    const [medicationCompliance, setMedicationCompliance] =
      React.useState(false);
    const [medications, setMedications] = React.useState([]);
    const [painExperienced, setPainExperienced] = React.useState(false);
    const [painType, setPainType] = React.useState([]);

    const [visionImpaired, setVisionImpaired] = React.useState(false);
    const [priapism, setPriapism] = React.useState(false);
    const [fever, setFever] = React.useState(false);

    const authStore = useContext(AuthContext);
    const diaryStore = DiaryStore();

    function getTimeText() {
      if (sleepHours == 0) {
        return sleepHours + "h";
      }
      var timeText = Math.floor(sleepHours / 2) + "h";
      if (sleepHours % 2 != 0) {
        timeText += " 30";
      }
      return timeText;
    }

    const sleepToMins = () => {
      return Math.floor(sleepHours / 2) * 60 + (sleepHours % 2 == 0 ? 0 : 30);
    };

    const toggleMedicineTaken = (newvalue) => {
      setMedicationCompliance(newvalue);
      setMedications([]);
    };

    const togglePainExperienced = (newvalue) => {
      setPainExperienced(newvalue);
      setPainType([]);
    };

    const isValidForm = () => {
      const medicineValid = medicationCompliance
        ? medications.length !== 0
        : medications.length === 0;
      const painValid = painExperienced
        ? painType.length !== 0
        : painType.length === 0;
      return (
        selectedSleepRating !== -1 &&
        selectedStressRating !== -1 &&
        selectedMoodRating !== -1 &&
        medicineValid &&
        painValid
      );
    };

    const handleSave = async () => {
      const entry: TDiaryEntry = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        sleep_rating: selectedSleepRating,
        sleep_time: sleepToMins(),
        mood: selectedMoodRating,
        stress: selectedStressRating,
        medication_compliance: medicationCompliance,
        medications: medications,
        pain: painExperienced,
        pain_type: painExperienced ? painType[0] : "",
        vision_impaired: visionImpaired,
        priapism_episode: priapism,
        fever: fever,
      };
      if (!isValidForm()) {
        console.log("invalid form!");
        return;
      }
      console.log("valid form");
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
                  if (sleepHours > 0) {
                    setSleepHours(sleepHours - 1);
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
                value={sleepHours}
                onChange={(v) => {
                  setScrollEnabled(false);
                  setSleepHours(Math.floor(v));
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
                  if (sleepHours < 48) {
                    setSleepHours(sleepHours + 1);
                  }
                }}
              >
                <Text style={[styles.cardText, styles.sleepSliderText]}>+</Text>
              </TouchableOpacity>
            </HStack>
            <Scale
              data={["Awful", "Poor", "OK", "Good", "Great"]}
              selectedButton={selectedSleepRating}
              setSelectedButton={setSelectedSleepRating}
            />
          </Box>
          <Box
            rounded="lg"
            style={[
              styles.card,
              {
                marginTop: 10,
              },
            ]}
          >
            <HStack style={styles.cardHeader}>
              <Text style={[styles.cardText, styles.cardTitle]}>Stress</Text>
            </HStack>
            <Scale
              data={["Lowest", "Low", "Medium", "High", "Highest"]}
              reverse={true}
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
              },
            ]}
          >
            <HStack space={2} style={styles.cardHeader}>
              <Text style={[styles.cardText, styles.cardTitle]}>Mood</Text>
            </HStack>
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
          <Box
            rounded="lg"
            style={[
              styles.card,
              {
                marginTop: 10,
              },
            ]}
          >
            <Text style={[styles.cardText, styles.cardTitle]}>Medicine</Text>
            <Text style={[styles.questionText, styles.firstQuestion]}>
              Have you taken your medicine for today?
            </Text>
            <Center
              style={{
                marginBottom: medicationCompliance ? 0 : 23,
              }}
            >
              <ToggleButton
                value={medicationCompliance}
                onPress={toggleMedicineTaken}
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
                        color: medicationCompliance
                          ? "#BDBDBD"
                          : Colors.selection,
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
                        color: medicationCompliance
                          ? Colors.success
                          : "#BDBDBD",
                      }}
                    >
                      Yes
                    </Text>
                  </View>
                }
              />
            </Center>
            {medicationCompliance && (
              <>
                <Text style={styles.questionText}>Which medication?</Text>
                <Box style={styles.selectDropdown}>
                  <CustomSelect
                    single={false}
                    choices={diaryMedicationTypes}
                    selectText="Select medication(s)"
                    selections={medications}
                    onSelectedItemsChange={(selectedMedications) =>
                      setMedications(selectedMedications)
                    }
                  />
                </Box>
              </>
            )}
          </Box>
          <Box
            rounded="lg"
            style={[
              styles.card,
              {
                marginTop: 10,
              },
            ]}
          >
            <Text style={[styles.cardText, styles.cardTitle]}>Pain</Text>
            <Text style={[styles.questionText, styles.firstQuestion]}>
              Did you feel pain today?
            </Text>
            <Center
              style={{
                marginBottom: painExperienced ? 0 : 23,
              }}
            >
              <ToggleButton
                value={painExperienced}
                onPress={togglePainExperienced}
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
                        color: painExperienced ? "#BDBDBD" : Colors.selection,
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
                        color: painExperienced ? Colors.success : "#BDBDBD",
                      }}
                    >
                      Yes
                    </Text>
                  </View>
                }
              />
            </Center>
            {painExperienced && (
              <>
                <Text style={[styles.questionText]}>
                  Which pain are you feeling?
                </Text>
                <Box style={styles.selectDropdown}>
                  <CustomSelect
                    single={true}
                    selectText="Select pain type"
                    choices={painTypes}
                    selections={painType}
                    onSelectedItemsChange={(newvalue) => setPainType(newvalue)}
                  />
                </Box>
              </>
            )}
          </Box>
          <Box
            rounded="lg"
            style={[
              styles.card,
              {
                marginTop: 10,
                marginBottom: 6,
              },
            ]}
          >
            <Text style={[styles.cardText, styles.cardTitle]}>Other</Text>
            <Text style={[styles.questionText, styles.firstQuestion]}>
              Have you had trouble with vision today?
            </Text>
            <Center>
              <ToggleButton
                value={visionImpaired}
                onPress={setVisionImpaired}
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
                        color: visionImpaired ? "#BDBDBD" : Colors.selection,
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
                        color: visionImpaired ? Colors.success : "#BDBDBD",
                      }}
                    >
                      Yes
                    </Text>
                  </View>
                }
              />
            </Center>
            <Center>
              <Text style={[styles.questionText]}>
                Have you had a priapism episode today?
              </Text>
              <ToggleButton
                value={priapism}
                onPress={setPriapism}
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
                        color: priapism ? "#BDBDBD" : Colors.selection,
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
                        color: priapism ? Colors.success : "#BDBDBD",
                      }}
                    >
                      Yes
                    </Text>
                  </View>
                }
              />
            </Center>
            <Text style={[styles.questionText]}>
              Have you had a fever today?
            </Text>
            <Center style={{ marginBottom: 17 }}>
              <ToggleButton
                value={fever}
                onPress={setFever}
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
                        color: fever ? "#BDBDBD" : Colors.selection,
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
                        color: fever ? Colors.success : "#BDBDBD",
                      }}
                    >
                      Yes
                    </Text>
                  </View>
                }
              />
            </Center>
          </Box>
          <Box
            style={{
              height: 100,
              marginTop: 13,
              backgroundColor: Colors.white,
            }}
          >
            <Center>
              <SaveButton onPress={handleSave} />
            </Center>
          </Box>
        </VStack>
      </ScrollView>
    );
  }
);

export default DailyDiaryFormScreen;
