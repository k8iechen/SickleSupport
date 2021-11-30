import { AntDesign } from "@expo/vector-icons";
import { Center, HStack, Text } from "native-base";
import * as React from "react";
import styles from "../styles/CounterWithButtons.styles";

interface CounterWithButtonsProps {
  value: number;
  setValue: (newvalue: number) => void;
}

export default function CounterWithButtons({
  value,
  setValue,
}: CounterWithButtonsProps) {
  return (
    <HStack style={styles.container}>
      <AntDesign
        name="minuscircleo"
        size={24}
        color={"black"}
        onPress={() => setValue(value - 1)}
      />
      <Center>
        <Text style={styles.text}>{value}</Text>
      </Center>
      <AntDesign
        name="pluscircleo"
        size={24}
        color="black"
        onPress={() => setValue(value + 1)}
      />
    </HStack>
  );
}
