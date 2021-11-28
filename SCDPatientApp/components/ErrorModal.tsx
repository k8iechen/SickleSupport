import { HStack, Modal, Text, WarningIcon } from "native-base";
import * as React from "react";
import Colors from "../constants/Colors";
import { styles } from "../styles/PopupModal.styles";

export default function PopupModal({
  visible,
  onClose,
  title,
  description,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
}) {
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
