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
      <Text style={[styles.questionText, styles.firstQuestion]}>
        Did you take any medication?
      </Text>
      <Center style={{ marginBottom: medicationTaken ? 0 : 23 }}>
        <YesNoButton value={medicationTaken} onPress={toggleMedicationTaken} />
      </Center>
      {medicationTaken && (
        <>
          <Text style={styles.questionText}>
            How many tylenol did you take?
          </Text>
          <CounterWithButtons
            value={tylenol}
            setValue={(newval) => setTylenol(toNonNegative(newval))}
          />
          <Text style={styles.questionText}>
            How many anti-inflammatories did you take?
          </Text>
          <CounterWithButtons
            value={antiInflamCount}
            setValue={(newval) => setAntiInflamCount(toNonNegative(newval))}
          />
          <Text style={styles.questionText}>
            How many short acting opioids did you take?
          </Text>
          <CounterWithButtons
            value={shortOpiodCount}
            setValue={(newval) => setShortOpiodCount(toNonNegative(newval))}
          />
          <Text style={styles.questionText}>
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
      <Text style={[styles.questionText, styles.firstQuestion]}>
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
      <Text style={styles.questionText}>
        What was the trigger of your pain?
      </Text>
      <Box style={{ marginLeft: 10 }}>
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
      <Text style={styles.questionText}>
        What relief methods have you tried?
      </Text>
      <Box>
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
      <Center flex={1} px="3" style={{ width: "100%" }}>
        <TextArea
          h={20}
          placeholder="Write any additional notes here"
          w={{
            base: "90%",
            md: "25%",
          }}
          style={{
            color: "#9B9B9B",
            backgroundColor: "#F6F6F6",
          }}
        />
      </Center>
    );
  };

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
                Did you go to the hospital?
              </Text>
              <Center>
                <YesNoButton
                  value={hospitalVisit}
                  onPress={() => setHospitalVisit(!hospitalVisit)}
                />
              </Center>
            </HStack>
          </Box>

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
            <HStack space={2} style={styles.cardHeader}>
              <Text style={[styles.cardText, styles.cardTitle]}>
                Additional Notes
              </Text>
            </HStack>
            <Center>{AdditionalNotes({})}</Center>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}
