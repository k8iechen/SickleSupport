import * as React from "react";
import { serverTimestamp } from "firebase/firestore";
import { Box, Center, HStack, ScrollView, TextArea, VStack } from "native-base";
import { Image, Text, TouchableOpacity } from "react-native";
import ButtonRadio from "../components/ButtonRadio";
import CounterWithButtons from "../components/CounterWithButtons";
import CustomSelect from "../components/CustomSelect";
import PainIntensityComponent from "../components/PainIntensityComponent";
import SaveButton from "../components/SaveButton";
import YesNoButton from "../components/YesNoButton";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../models/navigation";
import { TPainEntry } from "../models/PainEntry";
import styles from "../styles/PainEpisodeFormScreen.styles";
import PainEntryStore from "../stores/painEntry.store";
import { AuthContext } from "../contexts/AuthContext";
import ErrorModal from "../components/ErrorModal";
import PainAreaComponent from "../components/PainAreaComponent";

const locationTypes = [
  {
    id: "Home",
    name: "Home",
  },
  {
    id: "Work",
    name: "Work",
  },
  {
    id: "School",
    name: "School",
  },
  {
    id: "In transit/commuting",
    name: "In transit/commuting",
  },
  {
    id: "Bed (at home)",
    name: "Bed (at home)",
  },
  {
    id: "Outside",
    name: "Outside",
  },
  {
    id: "Other",
    name: "Other",
  },
];

const painTriggerTypes = [
  "Sleep",
  "Lack of sleep",
  "Infection",
  "Cold exposure",
  "Dehydration",
  "Injury",
  "Anxiety",
  "Exercise",
  "Menstrual cycle",
  "Other",
  "Did not have access to my medication",
];

const reliefMethodTypes = [
  "Cannabis",
  "Hot shower",
  "Meditation",
  "Staying indoors",
  "Drink water",
  "Heat pad",
];

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const authStore = React.useContext(AuthContext);
  const painEntryStore = PainEntryStore();

  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const [selectedPainIntensity, setSelectedPainIntensity] = React.useState(-1);
  const [painArea, setPainArea] = React.useState([]);
  const navigateBack = () => {
    // TODO: Only pop up modal if form data changed
    navigation.goBack();
  };
  const [medicationTaken, setMedicationTaken] = React.useState(false);
  const [hospitalVisit, setHospitalVisit] = React.useState(false);
  const [tylenolCount, setTylenolCount] = React.useState(0);
  const [antiInflamCount, setAntiInflamCount] = React.useState<number>(0);
  const [shortOpiodCount, setShortOpiodCount] = React.useState<number>(0);
  const [longOpiodCount, setLongOpiodCount] = React.useState<number>(0);
  const [location, setLocation] = React.useState([]);
  const [painTriggers, setPainTriggers] = React.useState<string[]>([]);
  const [reliefMethods, setReliefMethods] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [showErrorModal, setShowErrorModal] = React.useState<boolean>(false);

  const toNonNegative = (val: number) => {
    return Math.max(0, val);
  };

  const toggleMedicationTaken = () => {
    setTylenolCount(0);
    setAntiInflamCount(0);
    setShortOpiodCount(0);
    setLongOpiodCount(0);
    setMedicationTaken(!medicationTaken);
  };

  const handlePainTriggerPress = (trigger: string) => {
    const idxOf = painTriggers.indexOf(trigger);
    if (idxOf === -1) {
      setPainTriggers([...painTriggers, trigger]);
    } else {
      setPainTriggers(painTriggers.filter((t) => t !== trigger));
    }
  };

  const handleReliefMethodPress = (method: string) => {
    const idxOf = reliefMethods.indexOf(method);
    if (idxOf === -1) {
      setReliefMethods([...reliefMethods, method]);
    } else {
      setPainTriggers(reliefMethods.filter((t) => t !== method));
    }
  };

  const isValidForm = () => {
    if (selectedPainIntensity === -1) {
      setErrorMsg("Please rate the intensity of your pain.");
      return false;
    }

    if (!location) {
      setErrorMsg(
        "Please select the location you were at when the pain started."
      );
      return false;
    }

    if (painTriggers.length === 0) {
      setErrorMsg("Please select the trigger(s) of the pain episode.");
      return false;
    }

    if (reliefMethods.length === 0) {
      setErrorMsg("Please select the relief methods attempted.");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!isValidForm()) {
      setShowErrorModal(true);
      return;
    }
    const entry: TPainEntry = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      medication_taken: medicationTaken,
      pain_intensity: selectedPainIntensity,
      tylenols_taken: tylenolCount,
      anti_inflammatories_taken: antiInflamCount,
      short_acting_opiods_taken: shortOpiodCount,
      long_acting_opiods_taken: longOpiodCount,
      location: location[0],
      pain_triggers: painTriggers,
      relief_methods: reliefMethods,
      hospital_visit: hospitalVisit,
      notes: notes,
    };

    const result = await painEntryStore.addEntry(authStore.patient, entry);
    if (result) {
      setErrorMsg("");
      setShowErrorModal(false);
      navigation.goBack();
    } else {
      setErrorMsg(
        "Oops, something went wrong on our end! Please click the 'Save' button again."
      );
      setShowErrorModal(true);
    }
  };

  // component definitions
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
      <HStack space={2} style={styles.cardHeader}>
        <Text style={[styles.cardText, styles.cardTitle]}>Medicine</Text>
      </HStack>
      <Text
        style={{
          ...styles.questionText,
          marginTop: 10,
        }}
      >
        Did you take any medication?
      </Text>
      <Center
        style={[
          styles.questionTopSpacing,
          { marginBottom: medicationTaken ? 10 : 23 },
        ]}
      >
        <YesNoButton value={medicationTaken} onPress={toggleMedicationTaken} />
      </Center>
      {medicationTaken && (
        <>
          <Text style={[styles.questionText, styles.medicineQuestion]}>
            How many tylenol did you take?
          </Text>
          <CounterWithButtons
            value={tylenolCount}
            setValue={(newval) => setTylenolCount(toNonNegative(newval))}
          />
          <Text style={[styles.questionText, styles.medicineQuestion]}>
            How many anti-inflammatories did you take?
          </Text>
          <CounterWithButtons
            value={antiInflamCount}
            setValue={(newval) => setAntiInflamCount(toNonNegative(newval))}
          />
          <Text style={[styles.questionText, styles.medicineQuestion]}>
            How many short acting opioids did you take?
          </Text>
          <CounterWithButtons
            value={shortOpiodCount}
            setValue={(newval) => setShortOpiodCount(toNonNegative(newval))}
          />
          <Text style={[styles.questionText, styles.medicineQuestion]}>
            How many long acting opioids did you take?
          </Text>
          <Box style={{ marginBottom: 23 }}>
            <CounterWithButtons
              value={longOpiodCount}
              setValue={(newval) => setLongOpiodCount(toNonNegative(newval))}
            />
          </Box>
        </>
      )}
    </Box>
  );

  const TriggerComponent: React.FC = () => (
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
        <Text style={[styles.cardText, styles.cardTitle]}>Trigger</Text>
      </HStack>
      <Text
        style={{
          ...styles.questionText,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Where were you when the pain started?
      </Text>
      <Box style={styles.selectDropdown}>
        <CustomSelect
          single={true}
          choices={locationTypes}
          selectText="Select location"
          selections={location}
          onSelectedItemsChange={(selectedLocation) =>
            setLocation([...selectedLocation])
          }
        />
      </Box>
      <Text style={styles.narrowQuestionText}>
        What was the trigger of your pain?
      </Text>
      <Box style={{ marginLeft: 10, marginTop: 5 }}>
        <ButtonRadio.MultiGroup>
          {painTriggerTypes.map((val) => (
            <ButtonRadio onPress={() => handlePainTriggerPress(val)}>
              {val}
            </ButtonRadio>
          ))}
        </ButtonRadio.MultiGroup>
      </Box>
      <Text
        style={{
          ...styles.questionText,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        What relief methods have you tried?
      </Text>
      <Box style={{ marginLeft: 10, marginBottom: 15 }}>
        <ButtonRadio.MultiGroup>
          {reliefMethodTypes.map((val) => (
            <ButtonRadio
              onPress={() => {
                handleReliefMethodPress(val);
              }}
            >
              {val}
            </ButtonRadio>
          ))}
        </ButtonRadio.MultiGroup>
      </Box>
    </Box>
  );

  const AdditionalNotes: React.FC = () => {
    return (
      <Box
        rounded="lg"
        style={[
          styles.card,
          {
            marginTop: 10,
          },
        ]}
      >
        <Text style={[styles.cardText, styles.cardTitle]}>
          Additional Notes
        </Text>
        <Center
          flex={1}
          px="3"
          style={{ width: "100%", marginTop: 5, marginBottom: 21 }}
        >
          <TextArea
            h={"175px"}
            placeholder="Write any additional notes here"
            w={{
              base: "100%",
              md: "25%",
            }}
            style={{
              color: "#000000",
              backgroundColor: "#F6F6F6",
              fontFamily: "Poppins-Medium",
              fontSize: 15,
              borderRadius: 14,
              borderWidth: 0,
            }}
            value={notes}
            onChangeText={(newtext) => setNotes(newtext)}
          />
        </Center>
      </Box>
    );
  };

  const OtherQuestionsComponent: React.FC = () => (
    <Box
      rounded="lg"
      style={[
        styles.card,
        {
          marginTop: 10,
        },
      ]}
    >
      <Text style={[styles.cardText, styles.cardTitle]}>Other</Text>
      <Text
        style={{
          ...styles.questionText,
          marginTop: 10,
        }}
      >
        Did you go to the hospital?
      </Text>
      <Center
        style={{
          marginTop: 15,
          marginBottom: 20,
        }}
      >
        <YesNoButton
          value={hospitalVisit}
          onPress={() => setHospitalVisit(!hospitalVisit)}
        />
      </Center>
    </Box>
  );

  return (
    <>
      <ErrorModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        description={errorMsg}
      />
      <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
        <VStack>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.backButton}
            onPress={() => navigateBack()}
          >
            <Image source={require("../assets/icons/back.png")} />
          </TouchableOpacity>
          <Text style={styles.title}>Pain Episode Entry</Text>
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
              <Text style={[styles.cardText, styles.cardTitle]}>
                How intense was your pain?
              </Text>
            </HStack>
            <PainIntensityComponent
              selectedButton={selectedPainIntensity}
              setSelectedButton={setSelectedPainIntensity}
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
              <Text style={[styles.cardText, styles.cardTitle]}>
                Where did you feel the pain?
              </Text>
            </HStack>
            <PainAreaComponent muscles={painArea} updateMuscles={setPainArea} />
          </Box>
          {MedicineComponent({})}
          {TriggerComponent({})}
          {OtherQuestionsComponent({})}
          {AdditionalNotes({})}
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
