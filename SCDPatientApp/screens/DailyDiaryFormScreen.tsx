import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { VStack, ScrollView, Box } from "native-base";
import { observer } from "mobx-react-lite";

import { RootStackScreenProps } from "../models/navigation";
import styles from "../styles/DailyDiaryFormScreen.styles";

const DailyDiaryFormScreen = observer(
  ({ navigation }: RootStackScreenProps<"DailyDiaryFormScreen">) => {
    return (
      <ScrollView style={styles.container}>
        <VStack>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={require("../assets/icons/back.png")} />
          </TouchableOpacity>
          <Text style={styles.title}>Daily Diary Entry</Text>
          <VStack space={10} style={styles.form}>
            <Box rounded="lg" style={styles.card}>
              <Text>Sleep</Text>
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
    );
  }
);

export default DailyDiaryFormScreen;
