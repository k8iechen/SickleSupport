import { AntDesign } from "@expo/vector-icons";
import { Center, HStack, Text } from "native-base";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/CounterWithButtons.styles";

interface ICounterWithButtonsProps {
  value: number;
  setValue: (newvalue: number) => void;
}

export default function CounterWithButtons({
  value,
  setValue,
}: ICounterWithButtonsProps) {
  return (
    <HStack style={styles.container}>
      <TouchableOpacity onPress={() => setValue(value - 1)}>
        <AntDesign name="minuscircleo" size={24} color={"black"} />
      </TouchableOpacity>
      <Center>
        <Text style={styles.text}>{value}</Text>
      </Center>
      <TouchableOpacity onPress={() => setValue(value + 1)}>
        <AntDesign name="pluscircleo" size={24} color="black" />
      </TouchableOpacity>
    </HStack>
  );
}
