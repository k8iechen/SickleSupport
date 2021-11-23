import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "native-base";
import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../models/navigation";
import Colors from "../constants/Colors";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aowkin Home Screen</Text>
      <View style={styles.separator} />
      <Button
        size="sm"
        colorScheme="light"
        style={styles.diaryButton}
        variant="outline"
        onPress={() => navigation.navigate("DailyDiaryFormScreen")}
      >
        <Text style={styles.diaryButtonText}>Complete Diary Entry</Text>
      </Button>
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
