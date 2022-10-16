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

import { AuthContext } from "../contexts/AuthContext";
import Colors from "../constants/Colors";
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

const SettingsItem = ({iconSource, label, children}) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <TouchableOpacity accesibilityLabel={label}
      onPress={() => setOpen(!isOpen)}>
      <HStack style={settingsItemStyle.row}>
        <Image
          alt={label}
          resizeMode="contain"
          source={iconSource}
          style={settingsItemStyle.icon}
        />
        <Text style={settingsItemStyle.label}>{label}</Text>
        { isOpen
            ? <Ionicons style={settingsItemStyle.arrow} name="chevron-down-outline" size={wp("4")} color="grey" />
            : <Ionicons style={settingsItemStyle.arrow} name="chevron-forward-outline" size={wp("4")} color="grey" />
        }
      </HStack>
      { isOpen && children }
    </TouchableOpacity>
  );
};

// TODO: This back button is the same as what's used on
// DailyDiaryFormScreen. Refactor to a reusable back button.
// TODO: use `navigation.addEventListener('blur', ...);` to reset each
// SettingsItem to a 'closed' state. Or, preferably, pass an opened/closed prop
// to SettingsItem.
export default function SettingsScreen({ navigation }) {
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
      <Text style={sharedStyles.title}>Settings</Text>
      <VStack style={styles.optionsList}>
        <SettingsItem label="Account"
            iconSource={require("../../assets/icons/person.png")}>
          <AuthContext.Consumer>
            {authStore => (
              <TouchableOpacity style={styles.optionsListSubItem} onPress={()=>{authStore.signOut()}}>
                <Text>Logout</Text>
              </TouchableOpacity>
            )}
          </AuthContext.Consumer>
        </SettingsItem>
        <SettingsItem label="Notifications"
            iconSource={require("../../assets/icons/bell.png")}/>
        <SettingsItem label="Privacy & Security"
            iconSource={require("../../assets/icons/security.png")} />
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
    marginLeft: 16,
    paddingLeft: 16,
  },
  optionsListSubItem: {
    marginLeft: 24,
  },
});

SettingsScreen.displayName = "SettingsScreen";
