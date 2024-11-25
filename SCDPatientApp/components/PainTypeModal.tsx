import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { VStack, HStack, Center, Modal } from "native-base";

import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

interface IPainTypeModalProps {
  showModal: boolean;
  setShowModal: any;
  setShowWhenModal: any;
  onSuccess: any;
}

const PainTypeModal: React.FC<IPainTypeModalProps> = ({
  showModal,
  setShowModal,
  setShowWhenModal,
  onSuccess,
}) => {
  return (
    <Modal isOpen={showModal} onClose={setShowModal} size="lg">
      <Modal.Content style={styles.modalContent}>
        <Modal.Header>
          <Center>
            <Text style={styles.modalHeader}>
              When did you have the pain episode?
            </Text>
          </Center>
        </Modal.Header>
        <Modal.Body>
          <VStack>
            <TouchableOpacity
              style={styles.ongoingBtn}
              onPress={() => {
                setShowModal(false);
                onSuccess();
              }}
            >
              <HStack>
                <AntDesign
                  name="exclamationcircleo"
                  size={24}
                  color="#FF0000"
                  style={styles.btnIcon}
                />
                <Text style={styles.btnText}>Ongoing episode</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="#FF0000"
                  style={styles.btnArrow}
                />
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pastBtn}
              onPress={() => {
                setShowWhenModal(true);
              }}
            >
              <HStack>
                <Feather
                  name="clock"
                  size={24}
                  color="#FFC702"
                  style={styles.btnIcon}
                />
                <Text style={styles.btnText}>Record a past episode</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="#FFC702"
                  style={styles.btnArrow}
                />
              </HStack>
            </TouchableOpacity>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    marginBottom: 0,
    marginTop: "auto",
    width: "100%",
    backgroundColor: "#EDEBF4",
    borderRadius: 24,
  },
  modalHeader: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 5,
  },
  ongoingBtn: {
    height: 73,
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginBottom: 20,
    justifyContent: "center",
  },
  pastBtn: {
    height: 73,
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginBottom: 30,
    justifyContent: "center",
  },
  btnIcon: {
    marginLeft: 31,
    marginRight: 20,
  },
  btnText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: Colors.title,
  },
  btnArrow: {
    marginLeft: "auto",
    marginRight: 25,
  },
});

export default PainTypeModal;
