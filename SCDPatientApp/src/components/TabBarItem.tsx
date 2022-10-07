import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

function TabBarItem({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  label: string;
  icon;
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: wp("20"),
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: wp("12.07"),
          width: wp("12.07"),
        }}
      >
        {focused && <View style={[styles.overlay]} />}
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            position: "absolute",
            width: wp("5"),
            height: wp("5"),
            tintColor: focused ? Colors.primary : Colors.text,
          }}
        />
      </View>
      <Text
        style={{
          color: Colors.text,
          fontSize: RFValue(15, 896),
          marginTop: 5,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: Colors.primary,
    opacity: 0.07,
    width: wp("12.07"),
    height: wp("12.07"),
    borderRadius: 14,
  },
});

export default TabBarItem;
