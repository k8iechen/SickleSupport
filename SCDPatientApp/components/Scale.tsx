import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Slider, VStack, ScrollView, Box, HStack, Center } from "native-base";

function Scale({
  data,
  reverse,
  selectedButton,
  setSelectedButton,
}: {
  data: Array<string>;
  reverse: string;
  selectedButton: Number;
  setSelectedButton;
}) {
  const baseScaleItems = [
    {
      header: 1,
      text: "",
      color: "#EF8D8A",
      selectColor: "#FBE7E7",
    },
    {
      header: 2,
      text: "",
      color: "#F4B482",
      selectColor: "#FCEFE6",
    },
    {
      header: 3,
      text: "",
      color: "#F7D948",
      selectColor: "#FEF7D1",
    },
    {
      header: 4,
      text: "",
      color: "#82D098",
      selectColor: "#E3F5E9",
    },
    {
      header: 5,
      text: "",
      color: "#60B4AF",
      selectColor: "#DDEFEF",
    },
  ];
  const scaleItems = baseScaleItems.map((base, idx) => {
    if (reverse) {
      var tmpColor = base.color;
      var tmpSelectColor = base.selectColor;
      if (idx === 0) {
        base.color = baseScaleItems[4].color;
        base.selectColor = baseScaleItems[4].selectColor;
        baseScaleItems[4].color = tmpColor;
        baseScaleItems[4].selectColor = tmpSelectColor;
      }
      if (idx === 1) {
        base.color = baseScaleItems[3].color;
        base.selectColor = baseScaleItems[3].selectColor;
        baseScaleItems[3].color = tmpColor;
        baseScaleItems[3].selectColor = tmpSelectColor;
      }
    }
    base.text = data[idx];
    return base;
  });

  return (
    <HStack space={3} style={styles.scale}>
      {scaleItems.map((scaleItem) => (
        <ScaleButton
          key={scaleItem.header}
          headerText={scaleItem.header}
          headerColor={scaleItem.color}
          selectedColor={scaleItem.selectColor}
          mainText={scaleItem.text}
          isSelected={selectedButton === scaleItem.header}
          siblingSelected={
            selectedButton !== -1 && selectedButton !== scaleItem.header
          }
          onPress={() => {
            if (selectedButton === scaleItem.header) {
              setSelectedButton(-1);
            } else {
              setSelectedButton(scaleItem.header);
            }
          }}
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
  siblingSelected,
  onPress,
}: {
  children;
  headerText: string;
  headerColor: string;
  selectedColor: string;
  mainText: string;
  isSelected: boolean;
  siblingSelected: boolean;
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
          backgroundColor: isSelected ? selectedColor : "#F1F3F6",
          borderColor: headerColor,
          borderRadius: 3,
          borderWidth: isSelected ? 1 : 0,
          borderStyle: "solid",
          opacity: siblingSelected ? 0.5 : 1,
        }}
      >
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
    marginTop: 12,
    marginBottom: 20,
  },

  scaleButton: {
    width: 57,
    height: 57,
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
    fontWeight: "bold",
    textAlign: "center",
    color: "#1D335A",
    marginTop: -3,
    marginBottom: 10,
    fontSize: 12,
  },
});

export default Scale;
