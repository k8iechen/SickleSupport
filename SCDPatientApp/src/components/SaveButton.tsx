import React from "react";
import { Button, Text } from "native-base";
import styles from "../styles/SaveButtonStyles";

type TSaveButtonProps = {
  onPress: () => Promise<void>;
};

const SaveButton = ({ onPress }: TSaveButtonProps) => {
  return (
    <Button style={styles.saveButton} onPress={onPress}>
      <Text style={styles.saveText}>Save</Text>
    </Button>
  );
};

export default SaveButton;
