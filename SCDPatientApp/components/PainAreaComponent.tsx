import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { VStack, HStack, Center, Box } from "native-base";
import Colors from "../constants/Colors";
import Body from "./Body";
import ToggleButton from "react-native-toggle-element";

interface Muscle {
  intensity?: number;
  color: string;
  slug: string;
  pointsArray?: string[];
}

interface TPainIntensityProps {
  muscles: Muscle[];
  updateMuscles: any;
}

const PainAreaComponent: React.FC<TPainIntensityProps> = ({
  muscles,
  updateMuscles,
}) => {
  const [bodySide, setbodySide] = useState(false); // true for front; false for back
  const toggleBodySide = (newvalue: any) => {
    setbodySide(newvalue);
  };

  const handleMusclePress = (muscle: Muscle) => {
    const id = muscles.findIndex((m) => m.slug === muscle.slug);
    if (id !== -1) {
      updateMuscles([
        ...muscles.filter(function (value, arrIndex) {
          return id !== arrIndex;
        }),
      ]);
    } else {
      updateMuscles([muscle, ...muscles]);
    }
  };

  return (
    <VStack style={styles.painAreaComponent}>
      <Center style={styles.painAreaToggle}>
        <ToggleButton
          value={bodySide}
          onPress={toggleBodySide}
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
            <VStack style={styles.painAreaToggleText}>
              <Text>Front</Text>
              {!bodySide && <Text>(right-left)</Text>}
            </VStack>
          }
          rightComponent={
            <VStack style={styles.painAreaToggleText}>
              <Text>Back</Text>
              {bodySide && <Text>(left-right)</Text>}
            </VStack>
          }
        />
      </Center>
      <Center style={styles.painAreaBody}>
        {!bodySide ? (
          <Body
            scale={2}
            frontOnly={true}
            data={muscles}
            onMusclePress={(muscle: Muscle) => {
              handleMusclePress(muscle);
            }}
          />
        ) : (
          <Body
            scale={2}
            backOnly={true}
            data={muscles}
            onMusclePress={(muscle: Muscle) => {
              handleMusclePress(muscle);
            }}
          />
        )}
      </Center>
    </VStack>
  );
};

const styles = StyleSheet.create({
  painAreaComponent: {
    width: "100%",
  },

  painAreaToggle: {
    marginTop: 10,
    marginBottom: 10,
  },

  painAreaToggleText: {
    justifyContent: "center",
    alignItems: "center",
  },

  painAreaBody: {
    height: 450,
    marginTop: 10,
    marginBottom: 20,
  },

  questionText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 14,
    color: Colors.cardText,
    marginLeft: 17,
    marginBottom: 15,
    marginTop: 26,
  },
});

export default PainAreaComponent;
