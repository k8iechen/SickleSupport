import React from "react";
import { View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function CustomTabBarButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (e: any) => void;
}) {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.primaryShadow,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowRadius: 24,
        shadowOpacity: 0.8,
        elevation: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: hp("3"),
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: wp("13"),
          height: wp("13"),
          borderRadius: wp("3.86"),
          backgroundColor: Colors.primary,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

export default CustomTabBarButton;
