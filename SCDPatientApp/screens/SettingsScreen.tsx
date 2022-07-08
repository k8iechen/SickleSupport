import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HStack,
  VStack,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

// TODO: painStyles is used here and in PassportScreen. Need to refactor it to
// some kind of shared 'tab' styles.
import painStyles from "../styles/PainEpisodeFormScreen.styles";

// TODO: This back button is the same as what's used on
// DailyDiaryFormScreen. Refactor to a reusable back button.
export default function SettingsScreen({
  navigation,
}) {
  return (
    <View style={painStyles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={wp("6")} color="grey" />
      </TouchableOpacity>
      <Text style={{
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        color: "#ffffff",
        textDecorationLine: 'underline',
      }}>Some Text 4 you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 3,
  },

  // TODO: copied from DailDiaryFormScreen
  title: {
    width: wp("60"),
    height: hp("4.5"),
    marginLeft: 28,
    marginTop: 18,
    fontFamily: "Poppins-SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: RFValue(30, 896),
    color: Colors.title,
  },
});
