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
  Modal,
  Button,
} from "native-base";
import { RootTabScreenProps } from "../models/navigation";
import styles from "../styles/PainEpisodeFormScreen.styles";
import PainIntensityComponent from "../components/PainIntensityComponent";
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
        </VStack>
      </ScrollView>
    </>
  );
}
