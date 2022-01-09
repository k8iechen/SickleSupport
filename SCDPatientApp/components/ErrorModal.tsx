import { HStack, Modal, Text, WarningIcon, Center } from "native-base";
import * as React from "react";
import Colors from "../constants/Colors";
import { styles } from "../styles/PopupModal.styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type ErrorModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
};

export default function ErrorModal({
  visible,
  onClose,
  title,
  description,
}: ErrorModalProps) {
  return (
    <Modal isOpen={visible} onClose={onClose} size="lg">
      <Modal.Content maxWidth={wp("90")}>
        <Modal.CloseButton />
        <Modal.Header>
          <HStack alignItems="center">
            <WarningIcon style={{ color: Colors.darkColor }} />
            <Text style={styles.title}>{title}</Text>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <Text style={styles.description}>{description}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
