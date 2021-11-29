import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, VStack, Box, HStack } from "native-base";
import Colors from "../constants/Colors";

type TSummaryCardProps = {
  medicationStreak: number;
  totalPainEpisodes: number;
  numHospitalEpisodes: number;
};

const SummaryCard = ({
  medicationStreak,
  totalPainEpisodes,
  numHospitalEpisodes,
}: TSummaryCardProps) => {
  return (
    <>
      <Text style={styles.summaryText}>Summary</Text>
      <View style={styles.summaryLine} />
      <Box style={styles.summaryBox}>
        <HStack style={styles.summaryContent}>
          <VStack>
            <Text style={styles.header}>Medication{"\n"}Streak</Text>
            <Text style={styles.streakNum}>{medicationStreak}</Text>
          </VStack>
          <VStack
            style={{
              marginLeft: 50,
              marginRight: 37,
            }}
          >
            <Text style={styles.header}>Pain Episodes</Text>
            <HStack
              style={{
                marginTop: 20,
              }}
            >
              <VStack>
                <Text style={styles.subHeader}>Total:</Text>
                <HStack
                  style={{
                    marginTop: 4,
                  }}
                  alignItems="center"
                >
                  <Image
                    source={require("../assets/images/thunder.png")}
                    resizeMode="contain"
                    style={{
                      width: 27,
                      height: 27,
                    }}
                  />
                  <Text style={{ ...styles.subNum, marginLeft: 1 }}>
                    {totalPainEpisodes}
                  </Text>
                </HStack>
              </VStack>
              <VStack
                style={{
                  marginLeft: 28,
                }}
              >
                <Text style={styles.subHeader}>Hospital:</Text>
                <HStack
                  style={{
                    marginTop: 4,
                    marginLeft: 5,
                  }}
                  alignItems="center"
                >
                  <Image
                    source={require("../assets/images/ambulance.png")}
                    resizeMode="contain"
                    style={{
                      width: 33,
                      height: 33,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.subNum,
                      marginLeft: 8,
                    }}
                  >
                    {numHospitalEpisodes}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  summaryText: {
    marginTop: 41,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  summaryLine: {
    borderBottomColor: "#EC7669",
    width: 86,
    borderBottomWidth: 2,
    marginTop: 6,
  },
  summaryBox: {
    backgroundColor: "#F3F7C8",
    marginTop: 12,
    width: "100%",
    borderRadius: 28,
  },
  summaryContent: {
    marginTop: 22,
    marginLeft: 22,
    marginRight: 22,
    marginBottom: 10,
  },
  header: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
  },
  subHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#929478",
  },
  streakNum: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 55,
    color: "#60B4AF",
    textAlign: "center",
    marginLeft: 24,
    marginTop: 3,
  },
  subNum: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 30,
    color: "#929478",
  },
});

export default SummaryCard;
