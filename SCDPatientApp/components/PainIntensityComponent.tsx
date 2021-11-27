import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Slider, VStack, ScrollView, Box, HStack, Center } from "native-base";
import Svg, { SvgCssUri } from "react-native-svg";
import Colors from "../constants/Colors";

function PainIntensityComponent({
  selectedButton,
  setSelectedButton,
}: {
  selectedButton: number;
  setSelectedButton: any;
}) {
  const detailItems = [
    {
      id: 1,
      color: ["#BAE096", "#C5E297"],
      image: require("../assets/images/slight_pain.svg"),
      title: "Slight Pain",
      detail: "Pain is present, but it does not limit activity.",
    },
    {
      id: 2,
      color: ["#D0E496", "#DCE395"],
      image: require("../assets/images/mild_pain.svg"),
      title: "Mild Pain",
      detail: "Can do most activities.",
    },
    {
      id: 3,
      color: ["#E6E496", "#EDE495"],
      image: require("../assets/images/moderate_pain.svg"),
      title: "Moderate Pain",
      detail: "Unable to do some activities.",
    },
    {
      id: 4,
      color: ["#DEC353", "#F0C890"],
      image: require("../assets/images/severe_pain.svg"),
      title: "Severe Pain",
      detail: "Unable to do most activities.",
    },
    {
      id: 5,
      color: ["#EEB38B", "#EDA78B"],
      image: require("../assets/images/extreme_pain.svg"),
      title: "Extreme Pain",
      detail: "Excruciating, unable to do any activities due to pain",
    },
  ];
  const levelItems = [
    {
      id: 1,
      color: "#BAE096",
    },
    {
      id: 2,
      color: "#C5E297",
    },
    {
      id: 3,
      color: "#D0E496",
    },
    {
      id: 4,
      color: "#DCE395",
    },
    {
      id: 5,
      color: "#E6E496",
    },
    {
      id: 6,
      color: "#EDE495",
    },
    {
      id: 7,
      color: "#DEC353",
    },
    {
      id: 8,
      color: "#F0C890",
    },
    {
      id: 9,
      color: "#EEB38B",
    },
    {
      id: 10,
      color: "#EDA78B",
    },
  ];

  return (
    <HStack space={2} style={styles.painIntensityComponent}>
      <VStack space={0} style={styles.painIntensityLevels}>
        {levelItems.map((levelItem) => (
          <LevelButton
            key={levelItem.id}
            mainText={levelItem.id.toString()}
            color={levelItem.color}
            onPress={() => {
              if (selectedButton === levelItem.id) {
                setSelectedButton(-1);
              } else {
                setSelectedButton(levelItem.id);
              }
            }}
          />
        ))}
      </VStack>
      <VStack space={0} style={styles.painIntensityDetails}>
        {detailItems.map((detailItem) => (
          <Detail
            headerPicture={detailItem.image}
            mainText={detailItem.title}
            detailText={detailItem.detail}
            isSelected={Math.floor((selectedButton + 1) / 2) === detailItem.id}
            selectedColor={detailItem.color[(selectedButton + 1) % 2]}
          />
        ))}
      </VStack>
    </HStack>
  );
}

function LevelButton({
  color,
  mainText,
  onPress,
}: {
  color: string;
  mainText: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.scaleButton}
      onPress={onPress}
    >
      <Center
        style={{
          backgroundColor: color,
          borderRadius: 3,
        }}
      >
        <Text style={[styles.scaleButtonText]}>{mainText}</Text>
      </Center>
    </TouchableOpacity>
  );
}

function Detail({
  headerPicture,
  mainText,
  detailText,
  isSelected,
  selectedColor,
}: {
  headerPicture: any;
  mainText: string;
  detailText: string;
  isSelected: boolean;
  selectedColor: string;
}) {
  return (
    <Center
      style={{
        backgroundColor: isSelected ? selectedColor : "#ffffff",
        borderRadius: 3,
      }}
    >
      <HStack>
        <Image
          source={require("../assets/images/slight_pain.png")}
          style={{ tintColor: isSelected ? Colors.white : Colors.cardText }}
        />
        <VStack>
          <Text
            style={{
              color: isSelected ? Colors.white : Colors.cardText,
              ...styles.scaleButtonText,
            }}
          >
            {mainText}
          </Text>
          <Text
            style={{
              color: isSelected ? Colors.white : Colors.cardText,
              ...styles.scaleButtonText,
            }}
          >
            {detailText}
          </Text>
        </VStack>
      </HStack>
    </Center>
  );
}

const styles = StyleSheet.create({
  scale: {
    width: "100%",
    justifyContent: "center",
    marginRight: 20,
  },

  scaleButton: {
    width: 60,
    height: 57,
  },

  scaleButtonText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "bold",
    textAlign: "center",
    // marginTop: 4,
    // marginBottom: 10,
    fontSize: 12,
  },

  painIntensityComponent: {},
  painIntensityLevels: {
    // width: 75,
    // height: 280,
    // left: 30,
    // top: 62,
  },
  painIntensityDetails: {},
});

export default PainIntensityComponent;
