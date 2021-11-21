import * as React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

import { RootTabScreenProps } from "../models/navigation";
import styles from "../styles/PainCrisisFormScreen.styles";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pain Episode Entry</Text>
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
