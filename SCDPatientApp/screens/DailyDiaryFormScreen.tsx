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
import Colors from "../constants/Colors";
import Scale from "../components/Scale";
import PictureScale from "../components/PictureScale";
import ToggleButton from "react-native-toggle-element";

const DailyDiaryFormScreen = observer(
  ({ navigation }: RootStackScreenProps<"DailyDiaryFormScreen">) => {
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
                  <Text style={[styles.cardText, styles.sleepSliderText]}>
                    -
                  </Text>
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
                  <Text style={[styles.cardText, styles.sleepSliderText]}>
                    +
                  </Text>
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
          </VStack>
          <Button success>
            <Text>Save</Text>
          </Button>
        </VStack>
      </ScrollView>
    );
  }
);

export default DailyDiaryFormScreen;
