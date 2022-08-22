import React from "react";
import {
  Image,
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
import { useNavigation } from '@react-navigation/native';

import Colors from "../constants/Colors";

// TODO: painStyles is used here and in PassportScreen. Need to refactor it to
// some kind of shared 'tab' styles.
import {styles as sharedStyles } from "../styles/Shared.styles";

const settingsItemStyle = StyleSheet.create({
  row: {
    display: "flex",
    padding: 8,
  },
  icon: {
  },
  label: {
    flexGrow: 1,
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: RFValue(16),
    lineHeight: RFValue(26),
    paddingLeft: 8,
  },
  arrow: {
    height: RFValue(24),
  },
});

interface SettingsItemProps {
  iconSource: any,
  label: String,
  route: String,
  navigation: any,
};

const SettingsItem = ({iconSource, label, route, navigation}):SettingsItemProps => {
  navigation = navigation || useNavigation();
  return (
    <TouchableOpacity accesibilityLabel={label} onPress={navigation.navigate(route)}>
      <HStack style={settingsItemStyle.row}>
        <Image
          alt={label}
          resizeMode="contain"
          source={iconSource}
          style={settingsItemStyle.icon}
        />
        <Text style={settingsItemStyle.label}>{label}</Text>
        <Ionicons style={settingsItemStyle.arrow} name="chevron-forward-outline" size={wp("4")} color="grey" />
      </HStack>
    </TouchableOpacity>
  );
};

// TODO: This back button is the same as what's used on
// DailyDiaryFormScreen. Refactor to a reusable back button.
export default function SettingsScreen({
  navigation,
}) {
  navigation = navigation || useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityLabel="go-back"
        activeOpacity={0.5}
        style={sharedStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={wp("6")} color="grey" />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      <VStack style={styles.optionsList}>
        <SettingsItem label="Account" route="settings-account" navigation={navigation}
            iconSource={require("../assets/icons/person.png")} />
        <SettingsItem label="Notifications" route="settings-notifications" navigation={navigation}
            iconSource={require("../assets/icons/bell.png")}/>
        <SettingsItem label="Privacy & Security" route="settings-security" navigation={navigation}
            iconSource={require("../assets/icons/security.png")} />
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: hp("24"),
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 3,
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 16,
  },
  // TODO: copied from DailyDiaryFormScreen
  title: {
    width: wp("60"),
    height: hp("5.5"),
    marginLeft: 28,
    marginTop: 18,
    fontFamily: "Poppins-SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: RFValue(28),
    lineHeight: RFValue(38),
    color: Colors.title,
  },
});

SettingsScreen.displayName = "SettingsScreen";
