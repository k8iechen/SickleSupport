import * as React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Spacer,
  Spinner,
  VStack,
} from "native-base";

import { RootTabScreenProps } from "../models/navigation";
import painStyles from "../styles/PainEpisodeFormScreen.styles";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';

export default function PassportScreen({
  navigation,
}: RootTabScreenProps<"PassportScreen">) {
  const authStore = React.useContext(AuthContext);
  const patient = authStore.getPatient();
  return (
    <ScrollView style={styles.container}>
      <HStack style={styles.header}>
        <Text style={painStyles.title}>Digital Card</Text>
        <TouchableOpacity style={{
          marginLeft: 0,
          marginRight: 24,
          marginTop: 5,
        }} onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-sharp" size={24} color="#2E3A59" />
        </TouchableOpacity>
      </HStack>
      <VStack>
        <Box style={{
          backgroundColor: "#FF0000",
          padding: 10,
          alignItems: "center"
        }}>
          <Text style={{
            fontFamily: "Poppins-ExtraBold",
            fontSize: 25,
            color: "#ffffff"
          }}>Emergency Management of</Text>
          <Text style={{
            fontFamily: "Poppins-ExtraBold",
            fontSize: 24,
            color: "#000000"
          }}>Sickle Cell Disease</Text>
          <Text style={{
            fontFamily: "Poppins-Bold",
            fontSize: 22,
            color: "#ffffff"
          }}>THIS PATIENT REQUIRES PROMPT</Text>
          <Text style={{
            fontFamily: "Poppins-Bold",
            fontSize: 22,
            color: "#ffffff"
          }}>TREATMENT!</Text>
          <Text style={{
            fontFamily: "Poppins-Bold",
            fontSize: 24,
            color: "#FFFF00",
            textDecorationLine: 'underline'
          }}>ATTENTION EMERG STAFF</Text>
        </Box>
        <Box style={{
          backgroundColor: "#FFFF00",
          padding: 10,
          alignItems: "center"
        }}>
          <Text style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
            color: "#000000",
            textAlign: "center",
          }}><Text style={{textDecorationLine: 'underline'}}>Do not transfuse blood</Text> for an uncomplicated pain crisis or asymptomatic drop in {'\n'} baseline hemoglobin.</Text>
        </Box>
        <Box style={{
          borderColor: "#1D335A",
          borderWidth: 2,
          padding: 10,
        }}>
          <VStack space={3} >
          <HStack style={{
            alignItems: "center",
          }}>
          <Image
            alt="name"
            source={require("../../assets/icons/name.png")}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              marginLeft: 8,
            }}
          />
            <VStack style={{
              marginLeft: 52,
            }}>
              <Text style={{
                fontFamily: "Poppins-Bold",
                fontSize: 17,
                color: "#D00809",
              }}>Name</Text>
              <Text style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                marginTop: -2,
                color: "#000000",
              }}>{patient.name}</Text>
            </VStack>
          </HStack>
          <HStack style={{
            alignItems: "center",
          }}>
          <Image
            alt="drop"
            source={require("../../assets/icons/drop.png")}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              marginLeft: 8,
            }}
          />
            <VStack style={{
              marginLeft: 52,
            }}>
              <Text style={{
                fontFamily: "Poppins-Bold",
                fontSize: 17,
                color: "#D00809",
              }}>Diagnosis</Text>
              <Text style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                marginTop: -2,
                color: "#000000",
              }}>Sickle Cell Disease</Text>
            </VStack>
          </HStack>
          <HStack style={{
            alignItems: "center",
          }}>
          <Image
            alt="medication"
            source={require("../../assets/icons/medication.png")}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              marginLeft: 8,
            }}
          />
            <VStack style={{
              marginLeft: 52,
            }}>
              <Text style={{
                fontFamily: "Poppins-Bold",
                fontSize: 17,
                color: "#D00809",
              }}>Recommendations for Pain Management</Text>
              <Text style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                marginTop: -2,
                color: "#000000",
              }}> - First line treatment: opioids + NSAID</Text>
            </VStack>
          </HStack>
          <HStack style={{
            alignItems: "center",
          }}>
          <Image
            alt="fever"
            source={require("../../assets/icons/fever.png")}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              marginLeft: 8,
              top: 0,
            }}
          />
            <VStack style={{
              marginLeft: 52,
            }}>
              <Text style={{
                fontFamily: "Poppins-Bold",
                fontSize: 17,
                color: "#D00809",
              }}>Recommendations for Fever ≥ 38.0</Text>
              <Text style={{
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                marginTop: -2,
                color: "#000000",
              }}>- Do blood/urine cultures {'&'} CXR {'\n'}
              - Start Ceftriaxone 1g IVq24hrs {'\n   '}(if no known allergy) </Text>
            </VStack>
          </HStack>
          </VStack>

        </Box>
        <Box style={{
          backgroundColor: "#FF0000",
          padding: 10,
        }}>
          <Text style={{
            fontFamily: "Poppins-Bold",
            fontSize: 16,
            color: "#ffffff",
            textDecorationLine: 'underline'
          }}>Contact  Hematologist</Text>
        </Box>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
