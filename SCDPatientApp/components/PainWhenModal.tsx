import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { VStack, Box, HStack, Center, Circle, Modal } from "native-base";

import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { getHours } from "../common/DateUtils";

interface IDayObj {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface ITimeObj {
  hours: number;
  minutes: number;
}

interface IPainWhenModalProps {
  showModal: boolean;
  setShowModal: any;
  setShowTypeModal: any;
  startDay: IDayObj;
  setStartDay: any;
  startTime: ITimeObj;
  setStartTime: any;
  initialStartDay: IDayObj;
  initialStartTime: ITimeObj;
  onSuccess;
}

export const PainWhenModal: React.FC<IPainWhenModalProps> = ({
  showModal,
  setShowModal,
  setShowTypeModal,
  startDay,
  setStartDay,
  startTime,
  setStartTime,
  initialStartDay,
  initialStartTime,
  onSuccess,
}) => {
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [selectedEpisodeDates, setSelectedEpisodeDates] = React.useState(null);

  useEffect(() => {
    var newDates = {};
    newDates[startDay.dateString] = {
      selected: true,
      color: "#35B36F",
      startingDay: true,
      endingDay: true,
    };
    setSelectedEpisodeDates(newDates);
  }, [startDay]);

  useEffect(() => {
    if (showModal) {
      setStartDay(initialStartDay);
      setStartTime(initialStartTime);
    }
  }, [showModal]);

  return (
    <>
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={(date) => {
          setStartTime({
            hours: date.getHours(),
            minutes: date.getMinutes(),
          });
          setShowTimePicker(false);
        }}
        onCancel={() => {
          setShowTimePicker(false);
        }}
      />
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <Modal.Content style={styles.modalContent}>
          <Modal.Header>
            <Center>
              <Text style={styles.modalHeader}>
                When did the episode happen?
              </Text>
            </Center>
          </Modal.Header>
          <Modal.Body>
            <VStack>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Box rounded="lg" style={styles.timeContainer}>
                  <HStack>
                    <Box
                      style={{
                        ...styles.timeBox,
                        marginLeft: 15,
                      }}
                    >
                      <Text style={styles.timeText}>
                        {getHours(startTime.hours)}
                      </Text>
                    </Box>
                    <VStack style={styles.timeColon}>
                      <Circle
                        size={1.5}
                        bg="#C4C4C4"
                        style={{
                          marginBottom: 12,
                        }}
                      />
                      <Circle size={1.5} bg="#C4C4C4" />
                    </VStack>
                    <Box style={styles.timeBox}>
                      <Text style={styles.timeText}>{startTime.minutes}</Text>
                    </Box>
                    <Box
                      style={{
                        ...styles.timeTypeBtn,
                        borderTopLeftRadius: 24,
                        borderBottomLeftRadius: 24,
                        marginLeft: "auto",
                        backgroundColor:
                          startTime.hours > 12 ? "#EDEBF4" : Colors.success,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.timeTypeBtnTxt,
                          color:
                            startTime.hours > 12 ? Colors.text : Colors.white,
                        }}
                      >
                        AM
                      </Text>
                    </Box>
                    <Box
                      style={{
                        ...styles.timeTypeBtn,
                        marginLeft: -1,
                        marginRight: 12,
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                        backgroundColor:
                          startTime.hours > 12 ? Colors.success : "#EDEBF4",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.timeTypeBtnTxt,
                          color:
                            startTime.hours > 12 ? Colors.white : Colors.text,
                        }}
                      >
                        PM
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </TouchableOpacity>
              <Calendar
                style={styles.calendar}
                renderArrow={(direction) => {
                  return (
                    <Entypo
                      name={"chevron-" + direction}
                      size={24}
                      color="#A095C1"
                    />
                  );
                }}
                maxDate={startDay.dateString}
                onDayPress={(day) => {
                  setStartDay(day);
                }}
                markingType={"period"}
                markedDates={selectedEpisodeDates}
              />
              <HStack justifyContent="center">
                <TouchableOpacity
                  style={{
                    ...styles.modalBtn,
                    backgroundColor: Colors.primary,
                    marginRight: 40,
                  }}
                  onPress={() => {
                    setStartDay(initialStartDay);
                    setStartTime(initialStartTime);
                  }}
                >
                  <Text style={styles.modalBtnText}>Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.modalBtn,
                    backgroundColor: Colors.success,
                    marginBottom: 30,
                  }}
                  onPress={() => {
                    setShowModal(false);
                    setShowTypeModal(false);
                    onSuccess();
                  }}
                >
                  <Text style={styles.modalBtnText}>Continue</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
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
    fontSize: 20,
    marginTop: 5,
  },
  timeText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.white,
  },
  timeContainer: {
    backgroundColor: Colors.white,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 18,
    borderRadius: 24,
  },
  timeBox: {
    backgroundColor: Colors.success,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 13,
    paddingBottom: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 24,
  },
  timeColon: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 19,
    marginRight: 19,
  },
  timeTypeBtn: {
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  timeTypeBtnTxt: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
  calendar: {
    borderRadius: 24,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 29,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBtn: {
    height: 60,
    borderRadius: 14,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
  },
  modalBtnText: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
    color: Colors.white,
  },
});
