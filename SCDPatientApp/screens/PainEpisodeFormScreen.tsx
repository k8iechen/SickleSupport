import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { VStack, ScrollView, Box, HStack, Center } from "native-base";
import { RootTabScreenProps } from "../models/navigation";
import styles from "../styles/PainEpisodeFormScreen.styles";
import PainIntensityComponent from "../components/PainIntensityComponent";
import YesNoButton from "../components/YesNoButton";
import CounterWithButtons from "../components/CounterWithButtons";

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
          <CounterWithButtons
            style={{ marginBottom: 23 }}
            value={longOpiodCount}
            setValue={(newval) => setLongOpiodCount(toNonNegative(newval))}
          />
        </>
      )}
    </Box>
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

          {/* Trigger component */}
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

            <Text style={styles.questionText}>
              What was the trigger of your pain?
            </Text>
          </Box>

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
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}
