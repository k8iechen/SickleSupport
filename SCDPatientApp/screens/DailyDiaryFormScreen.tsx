import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { Slider, VStack, ScrollView, Box, HStack } from "native-base";
import { observer } from "mobx-react-lite";

import { RootStackScreenProps } from "../models/navigation";
import styles from "../styles/DailyDiaryFormScreen.styles";
import Colors from "../constants/Colors";
import Scale from "../components/Scale";
import PictureScale from "../components/PictureScale";

const DailyDiaryFormScreen = observer(
  ({ navigation }: RootStackScreenProps<"DailyDiaryFormScreen">) => {
    const [selectedSleepRating, setSelectedSleepRating] = React.useState(-1);
    const [selectedStressRating, setSelectedStressRating] = React.useState(-1);
    const [selectedMoodRating, setSelectedMoodRating] = React.useState("");

    const [onChangeValue, setOnChangeValue] = React.useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);

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
                <Text style={[styles.cardText, styles.sleepText]}>8h 30</Text>
              </HStack>
              <HStack space={3} style={styles.sleepSlider}>
                <Text style={[styles.cardText, styles.sleepSliderText]}>-</Text>
                <Slider
                  style={{
                    width: "75%",
                    zIndex: 1,
                  }}
                  defaultValue={70}
                  onChange={(v) => {
                    setOnChangeValue(Math.floor(v));
                  }}
                  onChangeEnd={(v) => {
                    v && setOnChangeEndValue(Math.floor(v));
                  }}
                  size="lg"
                >
                  <Slider.Track bg={"#c1d9f7"}>
                    <Slider.FilledTrack bg={Colors.selection} />
                  </Slider.Track>
                  <Slider.Thumb bg={Colors.selection} />
                </Slider>
                <Text style={[styles.cardText, styles.sleepSliderText]}>+</Text>
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
          </VStack>
        </VStack>
      </ScrollView>
    );
  }
);

export default DailyDiaryFormScreen;
