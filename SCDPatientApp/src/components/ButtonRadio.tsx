import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface IGroupProps {
  children: React.ReactNode;
}

const Group: React.FC<IGroupProps> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    React.Children.toArray(children).forEach((child, idx) => {
      if (React.isValidElement(child) && child.props.default === true) {
        if (selectedIndex === null) {
          setSelectedIndex(idx);
        } else if (selectedIndex !== idx) {
          throw new TypeError("Only one child element can be default");
        }
      }
    });
  }, []);

  return (
    <View style={styles.buttonRadioGroup}>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onPress: () => {
              setSelectedIndex(idx);
              child.props.onPress();
            },
            _isSelected: child.props._isSelected || selectedIndex === idx,
          } as IButtonRadioProps);
        }
        return child;
      })}
    </View>
  );
};

const MultiGroup: React.FC<IGroupProps> = ({ children }) => {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set()
  );
  return (
    <View style={styles.buttonRadioGroup}>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onPress: () => {
              if (selectedIndices.delete(idx)) {
                setSelectedIndices(new Set(selectedIndices));
              } else {
                setSelectedIndices(new Set(selectedIndices.add(idx)));
              }
              child.props.onPress();
            },
            _isSelected: selectedIndices.has(idx),
          });
        }
        return child;
      })}
    </View>
  );
};

interface IButtonRadioProps {
  children: React.ReactNode;
  // Warning: internal boolean property should not be set... use `default` property instead
  _isSelected?: boolean;
  // whether button is selected be default or not
  default?: boolean;
  onPress: () => void;
}

const ButtonRadio: React.FC<IButtonRadioProps> & {
  Group: React.FC<IGroupProps>;
  MultiGroup: React.FC<IGroupProps>;
} = ({ children, _isSelected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.buttonRadioTextContainer,
        {
          backgroundColor: _isSelected ? "#6A6DCD" : "#F1F3F6",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonRadioText,
          { color: _isSelected ? "#FFFFFF" : "#000000" },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

ButtonRadio.Group = Group;
ButtonRadio.MultiGroup = MultiGroup;

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
    fontFamily: "Poppins-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
});

export default ButtonRadio;
