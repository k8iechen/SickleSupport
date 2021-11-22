import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function Group({ children }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <View>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onPress: () => {
              setSelectedIndex(idx);
              child.props.onPress();
            },
            isSelected: selectedIndex === idx,
          });
        }
        return child;
      })}
    </View>
  );
}

function ScaleButton({
  children,
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
      style={
        (styles.scaleButton,
        {
          backgroundColor: isSelected ? "#6A6DCD" : "#F1F3F6",
        })
      }
      onPress={onPress}
    >
      <Text style={[styles.scaleButtonHeader]}>1</Text>
      <Text style={[styles.scaleButtonText]}>Awful</Text>
      {children}
    </TouchableOpacity>
  );
}

ScaleButton.Group = Group;

const styles = StyleSheet.create({
  scaleButton: {
    backgroundColor: "#F1F3F6",
    borderRadius: 3,
    width: 70,
    height: 70,
  },

  scaleButtonHeader: {
    marginLeft: 22,
    marginRight: 22,
    marginTop: 10,
    fontSize: 24,
    textAlign: "center",
    color: "#EF8D8A",
  },

  scaleButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1D335A",
    marginBottom: 11,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default ScaleButton;
