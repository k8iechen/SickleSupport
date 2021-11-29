import { AntDesign } from "@expo/vector-icons";
import { HStack, Text } from "native-base";
import * as React from "react";
import Colors from "../constants/Colors";

type CounterWithButtonsProps = {
  value: number;
  setValue: (newvalue: number) => void;
  style?: {};
};

export default function CounterWithButtons({
  value,
  setValue,
  style,
}: CounterWithButtonsProps) {
  return (
    <HStack
      style={{
        ...style,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AntDesign
        name="minuscircleo"
        size={24}
        color={"black"}
        onPress={() => setValue(value - 1)}
      />
      <Text
        style={{
          paddingHorizontal: 25,
          paddingVertical: 12,
          marginHorizontal: 20,
          backgroundColor: Colors.backButtonBackground,
          borderRadius: 24,
          fontFamily: "Poppins-Regular",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: 18,
          lineHeight: 24,
          overflow: "hidden",
        }}
      >
        {value}
      </Text>
      <AntDesign
        name="pluscircleo"
        size={24}
        color="black"
        onPress={() => setValue(value + 1)}
      />
    </HStack>
  );
}
