import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Slider, VStack, ScrollView, Box, HStack, Center } from "native-base";

function PictureScale({
  pictureData,
  data,
  selectedButton,
  setSelectedButton,
}: {
  pictureData: Array<any>;
  data: Array<String>;
  selectedButton: string;
  setSelectedButton;
}) {
  const scaleItems = [];
  data.forEach((item, idx) => {
    scaleItems.push({
      id: idx,
      header: pictureData[idx],
      text: item,
    });
  });

  return (
    <HStack space={2} style={styles.scale}>
      {scaleItems.map((scaleItem) => (
        <PictureScaleButton
          key={scaleItem.id}
          headerPicture={scaleItem.header}
          mainText={scaleItem.text}
          isSelected={selectedButton == scaleItem.text}
          siblingSelected={
            selectedButton !== "" && selectedButton != scaleItem.text
          }
          onPress={() => {
            if (selectedButton == scaleItem.text) {
              setSelectedButton("");
            } else {
              setSelectedButton(scaleItem.text);
            }
          }}
        />
      ))}
    </HStack>
  );
}

function PictureScaleButton({
  children,
  headerPicture,
  mainText,
  isSelected,
  siblingSelected,
  onPress,
}: {
  children;
  headerPicture;
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
          backgroundColor: isSelected ? "#F1F3F6" : "#ffffff",
          borderRadius: 3,
          opacity: siblingSelected ? 0.5 : 1,
        }}
      >
        <Image
          source={headerPicture}
          resizeMode="contain"
          style={styles.scaleButtonHeader}
        />
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
    marginTop: 5,
    marginBottom: 30,
  },

  scaleButton: {
    width: 60,
    height: 57,
  },

  scaleButtonHeader: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    width: 35,
    height: 35,
  },

  scaleButtonText: {
    fontFamily: "Poppins-Medium",
    fontWeight: "bold",
    textAlign: "center",
    color: "#1D335A",
    marginTop: 4,
    marginBottom: 10,
    fontSize: 12,
  },
});

export default PictureScale;
