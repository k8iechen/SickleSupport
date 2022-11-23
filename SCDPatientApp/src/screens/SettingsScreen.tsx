import React from "react";
import { action } from 'mobx';
import { observer } from "mobx-react-lite";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Box,
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

import ButtonRadio from "../components/ButtonRadio";
import Colors from "../constants/Colors";
import { AuthContext } from "../contexts/AuthContext";
import {styles as sharedStyles } from "../styles/Shared.styles";
import type { IAuthStore } from "../stores/Auth";
import type { TPatient } from '../models/Patient';

const settingsItemStyle = StyleSheet.create({
  row: {
    display: "flex",
    padding: 8,
  },
  item: {
    paddingLeft: 24,
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

const setNotificationTime = action((store: IAuthStore, notifyTime?: number) => {
  store.updatePatient((patient: TPatient) => {
    patient.notification = notifyTime;
    return patient;
  });
});

type SettingsItemProps = {
  iconSource: number,
  label: string,
  children: React.ReactNode,
}

const SettingsItem: React.FC<SettingsItemProps> = ({iconSource, label, children}) => {
  const [isOpen, setOpen] = React.useState(false);

  const childview = () => {
    return (<Box style={settingsItemStyle.item}>
      { children }
    </Box>);
  };

  return (
    <TouchableOpacity accessibilityLabel={label}
      onPress={() => setOpen(!isOpen)}>
      <HStack style={settingsItemStyle.row}>
        <Image
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
      { isOpen && childview() }
    </TouchableOpacity>
  );
};

// TODO: This back button is the same as what's used on
// DailyDiaryFormScreen. Refactor to a reusable back button.
// TODO: use `navigation.addEventListener('blur', ...);` to reset each
// SettingsItem to a 'closed' state. Or, preferably, pass an opened/closed prop
// to SettingsItem.
const SettingsScreen = observer(
  ({ navigation }) => {
    navigation = navigation || useNavigation();
    const authStore = React.useContext(AuthContext);
    const currentValue = authStore.getPatient().notification;

    return (<Box style={styles.container}>
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
                <TouchableOpacity onPress={()=>{authStore.signOut()}}>
                  <Text>Logout</Text>
                </TouchableOpacity>
            </SettingsItem>
            <SettingsItem label="Notifications"
                iconSource={require("../../assets/icons/bell.png")}>
                <ButtonRadio.Group>
                  <ButtonRadio default={currentValue === 10*3600} onPress={() => setNotificationTime(authStore, 10*3600)}>10:00 am</ButtonRadio>
                  <ButtonRadio default={currentValue === 12*3600 + 20*60} onPress={() => setNotificationTime(authStore, 12*3600 + 20*60)}>12:20 pm</ButtonRadio>
                  <ButtonRadio default={currentValue === (12+8)*3600} onPress={() => setNotificationTime(authStore, (12+8)*3600)}>08:00 pm</ButtonRadio>
                  <ButtonRadio default={currentValue === null} onPress={() => setNotificationTime(authStore, undefined)}>Never</ButtonRadio>
                </ButtonRadio.Group>
            </SettingsItem>
            <SettingsItem label="Privacy & Security"
                iconSource={require("../../assets/icons/security.png")}>
                <TouchableOpacity onPress={()=>{authStore.wipeOut()}}>
                  <Text>Wipeout</Text>
                </TouchableOpacity>
            </SettingsItem>
          </VStack>
      </Box>);
  }
);

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
});

SettingsScreen.displayName = "SettingsScreen";
export default SettingsScreen;
