import { serverTimestamp } from "firebase/firestore";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ScrollView,
  Slider,
  VStack,
  WarningIcon,
} from "native-base";
import * as React from "react";
import { useContext } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import CustomSelect from "../components/CustomSelect";
import ErrorModal from "../components/ErrorModal";
import PictureScale from "../components/PictureScale";
import SaveButton from "../components/SaveButton";
import Scale from "../components/Scale";
import YesNoButton from "../components/YesNoButton";
import Colors from "../constants/Colors";
import { AuthContext } from "../contexts/AuthContext";
import { TDiaryEntry } from "../models/DiaryEntry";
import { RootStackScreenProps } from "../models/navigation";
import DiaryStore from "../stores/dairy.store";
import styles from "../styles/DailyDiaryFormScreen.styles";

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

    const sleepToMins = () => {
      return Math.floor(sleepHours / 2) * 60 + (sleepHours % 2 == 0 ? 0 : 30);
    };

    // TODO: originalFormData should be updated when implementing feature edit-form; now needed for goBack modal
    const [originalFormData, setOriginalFormData] = React.useState({
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
    });

    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [showBackModal, setShowBackModal] = React.useState(false);

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

    const toggleMedicineCompliance = (newvalue) => {
      setMedicationCompliance(newvalue);
      setMedications([]);
    };

    const togglePainExperienced = (newvalue) => {
      setPainExperienced(newvalue);
      setPainType([]);
    };

    const isValidForm = () => {
      if (selectedSleepRating === -1) {
        setErrorMsg("Please rate your sleep.");
        return false;
      }

      if (selectedStressRating === -1) {
        setErrorMsg("Please rate your stress.");
        return false;
      }

      if (selectedMoodRating === -1) {
        setErrorMsg("Please rate your mood.");
        return false;
      }

      const medicineValid = medicationCompliance
        ? medications.length !== 0
        : medications.length === 0;
      if (!medicineValid) {
        setErrorMsg("Please select which medication(s) you have taken today.");
        return false;
      }

      const painValid = painExperienced
        ? painType.length !== 0
        : painType.length === 0;
      if (!painValid) {
        setErrorMsg("Please indicate the type of pain you experienced.");
        return false;
      }

      return true;
    };

    const handleSave = async () => {
      if (!isValidForm()) {
        setShowErrorModal(true);
        return;
      }
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
      const saved = await diaryStore.addEntry(authStore.patient, entry);
      if (!saved) {
        setErrorMsg(
          "Oops, something went wrong on our end! Please click the 'Save' button again."
        );
        setShowErrorModal(true);
      } else {
        navigation.goBack();
      }
    };

    const isFormChanged = () => {
      const entry = {
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

      let { created_at, updated_at, ...cmpOriginalEntry } = originalFormData;
      return JSON.stringify(entry) === JSON.stringify(cmpOriginalEntry);
    };

    const navigateBack = () => {
      // Only pop up modal if form data changed
      if (isFormChanged()) {
        navigation.goBack();
      } else {
        setShowBackModal(true);
      }
    };

    const SleepComponent: React.FC = () => (
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
    );

    const StressComponent: React.FC = () => (
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
    );

    const MoodComponent: React.FC = () => (
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
    );

    const MedicineComponent: React.FC = () => (
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
          <YesNoButton
            value={medicationCompliance}
            onPress={() => toggleMedicineCompliance(!medicationCompliance)}
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
    );

    const PainComponent: React.FC = () => (
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
          <YesNoButton
            value={painExperienced}
            onPress={() => togglePainExperienced(!painExperienced)}
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
    );

    const OtherQuestionsComponent: React.FC = () => (
      <>
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
            <YesNoButton
              value={visionImpaired}
              onPress={() => setVisionImpaired(!visionImpaired)}
            />
          </Center>
          <Text style={[styles.questionText]}>
            Have you had a priapism episode today?
          </Text>
          <Center>
            <YesNoButton
              value={priapism}
              onPress={() => setPriapism(!priapism)}
            />
          </Center>
          <Text style={[styles.questionText]}>Have you had a fever today?</Text>
          <Center style={{ marginBottom: 17 }}>
            <YesNoButton value={fever} onPress={() => setFever(!fever)} />
          </Center>
        </Box>
      </>
    );

    const closeBackModal = () => {
      setShowBackModal(false);
    };

    return (
      <>
        <ErrorModal
          visible={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="Error"
          description={errorMsg}
        />
        <Modal isOpen={showBackModal} onClose={closeBackModal} size="md">
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>
              <HStack>
                <WarningIcon style={{ color: Colors.darkColor }} />
              </HStack>
            </Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={styles.backModalText}>
                    Are you sure you want to discard your unsaved changes?
                  </Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Button
                    style={styles.cancelButton}
                    onPress={() => closeBackModal()}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </Button>
                  <Button
                    style={styles.okButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.modalButtonText}>OK</Text>
                  </Button>
                </HStack>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
          <VStack>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.backButton}
              onPress={() => navigateBack()}
            >
              <Image source={require("../assets/icons/back.png")} />
            </TouchableOpacity>
            <Text style={styles.title}>Daily Diary Entry</Text>
          </VStack>
          <VStack style={styles.form}>
            {SleepComponent({})}
            {StressComponent({})}
            {MoodComponent({})}
            {MedicineComponent({})}
            {PainComponent({})}
            {OtherQuestionsComponent({})}
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
      </>
    );
  }
);

export default DailyDiaryFormScreen;
