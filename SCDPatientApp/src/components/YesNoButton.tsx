import * as React from "react";
import { Text, View } from "native-base";
import Colors from "../constants/Colors";
import ToggleButton from "react-native-toggle-element";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
        width: wp("64"),
        height: hp("6"),
      }}
      thumbButton={{
        width: wp("32"),
        height: hp("6"),
        activeBackgroundColor: "#ffffff",
        inActiveBackgroundColor: "#ffffff",
      }}
      leftComponent={
        <View
          style={{
            width: wp("32"),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: RFValue(19, 896),
              color: value ? "#BDBDBD" : Colors.selection,
              lineHeight: 0,
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
              fontSize: RFValue(19, 896),
              color: value ? Colors.success : "#BDBDBD",
              lineHeight: 0,
            }}
          >
            Yes
          </Text>
        </View>
      }
    />
  );
}
