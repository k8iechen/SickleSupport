import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { VStack, ScrollView, Box, HStack, Center, TextArea } from "native-base";
import { RootTabScreenProps } from "../models/navigation";
import styles from "../styles/PainEpisodeFormScreen.styles";
import PainIntensityComponent from "../components/PainIntensityComponent";
import YesNoButton from "../components/YesNoButton";
import CounterWithButtons from "../components/CounterWithButtons";
import CustomSelect from "../components/CustomSelect";
import ButtonRadio from "../components/ButtonRadio";
import Colors from "../constants/Colors";
import SaveButton from "../components/SaveButton";

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

const SLEEP = "Sleep";
const LACK_OF_SLEEP = "Lack of sleep";
const INFECTION = "Infection";
const COLD_EXPOSURE = "Cold exposure";
const DEHYDRATION = "Dehydration";
const INJURY = "Injury";
const ANXIETY = "Anxiety";
const EXERCISE = "Exercise";
const MENSTRUAL_CYCLE = "Menstrual cycle";
const OTHER = "Other";
const DID_NOT_HAVE_ACCESS_TO_MEDICATION =
  "Did not have access to my medication";
const CANNABIS = "Cannabis";
const HOT_SHOWER = "Hot shower";
const MEDITATION = "Meditation";
const STAYING_INDOORS = "Staying indoors";
const DRINK_WATER = "Drink water";
const HEAT_PAD = "Heat pad";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const [selectedPainIntesntity, setSelectedPainIntesntity] =
    React.useState(-1);
  const navigateBack = () => {
    // TODO: Only pop up modal if form data changed
    navigation.goBack();
  };
  const [medicationTaken, setMedicationTaken] = React.useState(false);
  const [hospitalVisit, setHospitalVisit] = React.useState(false);
  const [tylenol, setTylenol] = React.useState(0);
  const [antiInflamCount, setAntiInflamCount] = React.useState<number>(0);
  const [shortOpiodCount, setShortOpiodCount] = React.useState<number>(0);
  const [longOpiodCount, setLongOpiodCount] = React.useState<number>(0);

  const [painLocation, setPainLocation] = React.useState([]);

  const [painTriggers, setPainTriggers] = React.useState<string[]>([]);
  const [reliefMethods, setReliefMethods] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState<string>("");

  const toNonNegative = (val: number) => {
    return Math.max(0, val);
  };

  const toggleMedicationTaken = () => {
    setTylenol(0);
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

  const handleSave = async () => {
    console.log("saving to firebase");
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
            value={tylenol}
            setValue={(newval) => setTylenol(toNonNegative(newval))}
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
          selections={painLocation}
          onSelectedItemsChange={(selectedLocation) =>
            setPainLocation([...selectedLocation])
          }
        />
      </Box>
      <Text style={styles.narrowQuestionText}>
        What was the trigger of your pain?
      </Text>
      <Box style={{ marginLeft: 10, marginTop: 5 }}>
        <ButtonRadio.MultiGroup>
          <ButtonRadio onPress={() => handlePainTriggerPress(SLEEP)}>
            {SLEEP}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(LACK_OF_SLEEP)}>
            {LACK_OF_SLEEP}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(INFECTION)}>
            {INFECTION}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(COLD_EXPOSURE)}>
            {COLD_EXPOSURE}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(DEHYDRATION)}>
            {DEHYDRATION}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(INJURY)}>
            {INJURY}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(ANXIETY)}>
            {ANXIETY}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(EXERCISE)}>
            {EXERCISE}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(MENSTRUAL_CYCLE)}>
            {MENSTRUAL_CYCLE}
          </ButtonRadio>
          <ButtonRadio onPress={() => handlePainTriggerPress(OTHER)}>
            {OTHER}
          </ButtonRadio>
          <ButtonRadio
            onPress={() =>
              handlePainTriggerPress(DID_NOT_HAVE_ACCESS_TO_MEDICATION)
            }
          >
            {DID_NOT_HAVE_ACCESS_TO_MEDICATION}
          </ButtonRadio>
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
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(CANNABIS);
            }}
          >
            {CANNABIS}
          </ButtonRadio>
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(SLEEP);
            }}
          >
            {SLEEP}
          </ButtonRadio>
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(HOT_SHOWER);
            }}
          >
            {HOT_SHOWER}
          </ButtonRadio>
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(MEDITATION);
            }}
          >
            {MEDITATION}
          </ButtonRadio>
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(STAYING_INDOORS);
            }}
          >
            {STAYING_INDOORS}
          </ButtonRadio>
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(DRINK_WATER);
            }}
          >
            {DRINK_WATER}
          </ButtonRadio>
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(HEAT_PAD);
            }}
          >
            {HEAT_PAD}
          </ButtonRadio>
          <ButtonRadio
            onPress={() => {
              handleReliefMethodPress(OTHER);
            }}
          >
            {OTHER}
          </ButtonRadio>
        </ButtonRadio.MultiGroup>
      </Box>
    </Box>
  );

  const AdditionalNotes: React.FC = () => {
    return (
      <Center flex={1} px="3" style={{ width: "100%", marginBottom: 21 }}>
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
    );
  };

  const OtherQuestionsComponent: React.FC = () => (
    <>
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
    </>
  );

  return (
    <>
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
              selectedButton={selectedPainIntesntity}
              setSelectedButton={setSelectedPainIntesntity}
            />
          </Box>
          {MedicineComponent({})}
          {TriggerComponent({})}

          {/* Hospital component */}
          {OtherQuestionsComponent({})}

          {/* Additional Notes */}
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
              style={{
                marginTop: 5,
              }}
            >
              {AdditionalNotes({})}
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
    </>
  );
}
