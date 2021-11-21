import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { observer } from "mobx-react-lite";

import { RootStackScreenProps } from "../models/navigation";
import styles from "../styles/DailyDiaryFormScreen.styles";

const DailyDiaryFormScreen = observer(
  ({ navigation }: RootStackScreenProps<"DailyDiaryFormScreen">) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Daily Diary Entry</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/icons/back.png")} />
        </TouchableOpacity>
      </View>
    );
  }
);

export default DailyDiaryFormScreen;
