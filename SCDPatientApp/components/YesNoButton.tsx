import * as React from "react";
import { Text, View } from "native-base";
import Colors from "../constants/Colors";
import ToggleButton from "react-native-toggle-element";

type YesNoButtonProps = {
  value: boolean;
  onPress: () => void;
};

export default function YesNoButton({ value, onPress }: YesNoButtonProps) {
  return (
    <ToggleButton
      value={value}
      onPress={onPress}
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
              color: value ? "#BDBDBD" : Colors.selection,
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
              color: value ? Colors.success : "#BDBDBD",
            }}
          >
            Yes
          </Text>
        </View>
      }
    />
  );
}
