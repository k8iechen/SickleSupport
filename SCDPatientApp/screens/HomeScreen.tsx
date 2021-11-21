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
        style={{
          borderColor: Colors.completeDiaryOutline,
          borderRadius: 6,
        }}
        variant="outline"
        onPress={() => navigation.navigate("DailyDiaryFormScreen")}
      >
        <Text>Complete Diary Entry</Text>
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
});
