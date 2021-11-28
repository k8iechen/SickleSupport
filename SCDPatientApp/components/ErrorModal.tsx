import { HStack, Modal, Text, WarningIcon } from "native-base";
import * as React from "react";
import Colors from "../constants/Colors";
import { styles } from "../styles/PopupModal.styles";

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
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>
          <HStack>
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
