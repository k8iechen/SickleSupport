import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Slider, VStack, ScrollView, Box, HStack, Center } from "native-base";

const scaleItems = [
  {
    header: 1,
    text: "Awful",
    color: "#EF8D8A",
    selectColor: "#FBE7E7",
  },
  {
    header: 2,
    text: "Poor",
    color: "#F4B482",
    selectColor: "#FCEFE6",
  },
  {
    header: 3,
    text: "OK",
    color: "#F7D948",
    selectColor: "#FEF7D1",
  },
  {
    header: 4,
    text: "Good",
    color: "#82D098",
    selectColor: "#E3F5E9",
  },
  {
    header: 5,
    text: "Great",
    color: "#60B4AF",
    selectColor: "#DDEFEF",
  },
];

function Scale() {
  return (
    <HStack space={3} style={styles.scale}>
      {scaleItems.map((scaleItem) => (
        <ScaleButton
          headerText={scaleItem.header}
          headerColor={scaleItem.color}
          selectedColor={scaleItem.selectColor}
          mainText={scaleItem.text}
          isSelected={false}
        />
      ))}
    </HStack>
  );
}

function ScaleButton({
  children,
  headerText,
  headerColor,
  selectedColor,
  mainText,
  isSelected,
  onPress,
}: {
  children;
  isSelected?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.scaleButton,
        {
          backgroundColor: isSelected ? selectedColor : "#F1F3F6",
          borderColor: headerColor,
          borderWidth: isSelected ? 1 : 0,
          borderStyle: "solid",
        },
      ]}
      onPress={onPress}
    >
      <Center>
        <Text
          style={[
            styles.scaleButtonHeader,
            {
              color: headerColor,
            },
          ]}
        >
          {headerText}
        </Text>
        <Text style={[styles.scaleButtonText]}>{mainText}</Text>
        {children}
      </Center>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scale: {
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  scaleButton: {
    borderRadius: 3,
    width: 55,
    height: 55,
  },

  scaleButtonHeader: {
    fontFamily: "Poppins-Medium",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
    fontSize: 20,
    textAlign: "center",
  },

  scaleButtonText: {
    fontFamily: "Poppins-Bold",
    // fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1D335A",
    marginTop: -3,
    marginBottom: 10,
    fontSize: 12,
    // marginLeft: 10,
    // marginRight: 10,
  },
});

export default Scale;
