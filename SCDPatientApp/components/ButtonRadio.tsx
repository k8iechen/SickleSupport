import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function Group({ children }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <View style={styles.buttonRadioGroup}>
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

function ButtonRadio({
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
      style={[
        styles.buttonRadioTextContainer,
        {
          backgroundColor: isSelected ? "#6A6DCD" : "#F1F3F6",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonRadioText,
          { color: isSelected ? "#FFFFFF" : "#000000" },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

ButtonRadio.Group = Group;

const styles = StyleSheet.create({
  buttonRadioTextContainer: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginVertical: 6,
    marginHorizontal: 8,
    borderRadius: 3,
  },

  buttonRadioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 20,
  },

  buttonRadioText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
});

export default ButtonRadio;
