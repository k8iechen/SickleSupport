import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Image,
  Spinner,
  HStack,
  VStack,
  Spacer,
  Box,
  Button,
} from "native-base";


import painStyles from "../styles/PainEpisodeFormScreen.styles";
import { RootTabScreenProps } from "../models/navigation";

export default function ResourcesScreen({
  navigation,
}: RootTabScreenProps<"ResourcesScreen">) {
  return (
    <View style={painStyles.container}>
    <HStack style={styles.header}>
      <Text style={painStyles.title}>Resources</Text>
    </HStack>
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
});
