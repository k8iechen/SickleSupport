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
      id: 5,
      color: ["#EEB38B", "#EDA78B"],
      image: require("../assets/images/extreme_pain.png"),
      title: "Extreme Pain",
      detail: "Excruciating, unable to do any activities due to pain",
    },
    {
      id: 4,
      color: ["#DEC353", "#F0C890"],
      image: require("../assets/images/severe_pain.png"),
      title: "Severe Pain",
      detail: "Unable to do most activities.",
    },
    {
      id: 3,
      color: ["#E6E496", "#EDE495"],
      image: require("../assets/images/moderate_pain.png"),
      title: "Moderate Pain",
      detail: "Unable to do some activities.",
    },
    {
      id: 2,
      color: ["#D0E496", "#DCE395"],
      image: require("../assets/images/mild_pain.png"),
      title: "Mild Pain",
      detail: "Can do most activities.",
    },
    {
      id: 1,
      color: ["#BAE096", "#C5E297"],
      image: require("../assets/images/slight_pain.png"),
      title: "Slight Pain",
      detail: "Pain is present, but it does not limit activity.",
    },
  ];
  const levelItems = [
    {
      id: 10,
      color: "#EDA78B",
    },
    {
      id: 9,
      color: "#EEB38B",
    },
    {
      id: 8,
      color: "#F0C890",
    },
    {
      id: 7,
      color: "#DEC353",
    },

    {
      id: 6,
      color: "#EDE495",
    },
    {
      id: 5,
      color: "#E6E496",
    },
    {
      id: 4,
      color: "#DCE395",
    },
    {
      id: 3,
      color: "#D0E496",
    },
    {
      id: 2,
      color: "#C5E297",
    },
    {
      id: 1,
      color: "#BAE096",
    },
  ];

  return (
    <HStack style={styles.painIntensityComponent}>
      <VStack style={styles.painIntensityLevels}>
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
      <VStack style={styles.painIntensityDetails}>
        {detailItems.map((detailItem) => (
          <Detail
            key={detailItem.id}
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
      style={{
        backgroundColor: color,
        ...styles.painIntensityLevelButton,
      }}
      onPress={onPress}
    >
      <Text style={[styles.painIntensityLevelButtonText]}>{mainText}</Text>
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
  const renderDetailText = () => {
    if (isSelected) {
      return (
        <Text
          style={{
            color: Colors.white,
            ...styles.painIntensityDetailDetailText,
          }}
        >
          {detailText}
        </Text>
      );
    }
  };
  return (
    <HStack
      style={{
        backgroundColor: isSelected ? selectedColor : Colors.white,
        ...styles.painIntensityDetailBlock,
      }}
    >
      <Image
        source={headerPicture}
        style={{
          tintColor: isSelected ? Colors.white : Colors.cardText,
          ...styles.painIntensityDetailPicture,
        }}
      />
      <VStack style={styles.painIntensityDetailTextBlock}>
        <Text
          style={{
            color: isSelected ? Colors.white : Colors.cardText,
            ...styles.painIntensityDetailHeaderText,
          }}
        >
          {mainText}
        </Text>
        {renderDetailText()}
      </VStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  painIntensityComponent: {
    width: "100%",
    marginLeft: 15,
  },

  painIntensityLevels: {
    width: 75,
    height: 280,
    marginRight: 0,
  },

  painIntensityLevelButton: {
    width: 75,
    height: 28,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  painIntensityLevelButtonText: {
    fontFamily: "Poppins-Bold",
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: Colors.white,
  },

  painIntensityDetails: {
    width: 200,
    height: 280,
  },

  painIntensityDetailBlock: {
    width: 265,
    height: 56,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    // justifyContent: "center",
    alignItems: "center",
  },

  painIntensityDetailPicture: {
    width: 35,
    height: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  painIntensityDetailTextBlock: {
    width: 210,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  painIntensityDetailHeaderText: {
    fontFamily: "Poppins-Bold",
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  painIntensityDetailDetailText: {
    fontFamily: "Poppins-Medium",
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});

export default PainIntensityComponent;
