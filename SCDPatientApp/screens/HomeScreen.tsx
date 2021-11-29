import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, VStack, Box, HStack } from "native-base";
import { RootTabScreenProps } from "../models/navigation";
import Colors from "../constants/Colors";
import SummaryCard from "../components/SummaryCard";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  return (
    <View style={styles.container}>
      <VStack style={styles.content}>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.nameText}>Katherine</Text>

        <SummaryCard
          medicationStreak={8}
          totalPainEpisodes={8}
          numHospitalEpisodes={1}
        />

        <HStack style={styles.historyBox}>
          <Text style={styles.historyText}>History</Text>
          <Button
            size="sm"
            colorScheme="light"
            style={styles.diaryButton}
            variant="outline"
            onPress={() => navigation.navigate("DailyDiaryFormScreen")}
          >
            <Text style={styles.diaryButtonText}>Complete Diary Entry</Text>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  content: {
    marginTop: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  diaryButton: {
    marginLeft: "auto",
    fontFamily: "Poppins-Regular",
    borderColor: Colors.darkGrey,
    borderRadius: 6,
    borderWidth: 2,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    width: 174,
  },
  diaryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.darkGrey,
    borderColor: Colors.darkGrey,
    borderRadius: 6,
  },
  historyBox: {
    marginTop: 62,
  },
  helloText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 28,
  },
  nameText: {
    fontFamily: "Poppins-Regular",
    fontSize: 28,
  },
  historyText: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
});
