import React, { useEffect } from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  Slider,
  VStack,
  ScrollView,
  Box,
  HStack,
  Center,
  View,
  Circle,
  Modal,
  Button,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import PainEpisodeFormScreen from "../screens/PainEpisodeFormScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import PassportScreen from "../screens/PassportScreen";
import TabBarItem from "../components/TabBarItem";
import CustomTabBarButton from "../components/CustomTabBarComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/navigation";
import DailyDiaryFormScreen from "../screens/DailyDiaryFormScreen";
import { values } from "mobx";

const NewPainEpisodePlaceholder = () => <View />;

const getDateString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const parsedDate = new Date(date.getTime() - offset * 60 * 1000);
  return parsedDate.toISOString().split("T")[0];
};

const getDateObj = (hours: number, minutes: number) => {
  var date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};

const getHours = (hours: number) => {
  return hours > 12 ? hours - 12 : hours;
};

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const Tabs = () => {
  const { Navigator, Screen } = Tab;

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [showTypePainEpisodeModal, setShowTypePainEpisodeModal] =
    React.useState(false);

  const [showWhenPainEpisodeModal, setShowWhenPainEpisodeModal] =
    React.useState(false);

  const [navigationObj, setNavigationObj] = React.useState(null);
  const TODAYS_DATE = new Date();
  const TODAY_START_DAY = {
    dateString: getDateString(TODAYS_DATE),
    day: TODAYS_DATE.getDate(),
    month: TODAYS_DATE.getMonth(),
    timestamp: TODAYS_DATE.getTime(),
    year: TODAYS_DATE.getFullYear(),
  };
  const TODAY_START_TIME = {
    hours: TODAYS_DATE.getHours(),
    minutes: TODAYS_DATE.getMinutes(),
  };

  const [startDay, setStartDay] = React.useState(TODAY_START_DAY);
  // 24 hour time
  const [startTime, setStartTime] = React.useState(TODAY_START_TIME);
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
    if (showWhenPainEpisodeModal) {
      setStartDay(TODAY_START_DAY);
      setStartTime(TODAY_START_TIME);
    }
  }, [showWhenPainEpisodeModal]);

  function HomeNavigator() {
    return (
      <HomeStack.Navigator
        initialRouteName="Root"
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name="Root" component={HomeScreen} />
        <HomeStack.Screen
          name="DailyDiaryFormScreen"
          component={DailyDiaryFormScreen}
        />
        <HomeStack.Screen
          name="PainEpisodeFormScreen"
          component={PainEpisodeFormScreen}
        />
      </HomeStack.Navigator>
    );
  }

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
        isOpen={showWhenPainEpisodeModal}
        onClose={() => {
          setShowWhenPainEpisodeModal(false);
        }}
        size="lg"
      >
        <Modal.Content
          style={{
            marginBottom: 0,
            marginTop: "auto",
            width: "100%",
            backgroundColor: "#EDEBF4",
            borderRadius: 24,
          }}
        >
          <Modal.Header>
            <Center>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 20,
                  marginTop: 5,
                }}
              >
                When did the episode happen?
              </Text>
            </Center>
          </Modal.Header>
          <Modal.Body>
            <VStack>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Box
                  rounded="lg"
                  style={{
                    backgroundColor: "#fff",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 18,
                    borderRadius: 24,
                  }}
                >
                  <HStack>
                    <Box
                      style={{
                        backgroundColor: "#35B36F",
                        paddingLeft: 32,
                        paddingRight: 32,
                        paddingTop: 13,
                        paddingBottom: 13,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 15,
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 24,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-SemiBold",
                          fontSize: 18,
                          color: "#ffffff",
                        }}
                      >
                        {getHours(startTime.hours)}
                      </Text>
                    </Box>
                    <VStack
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 19,
                        marginRight: 19,
                      }}
                    >
                      <Circle
                        size={1.5}
                        bg="#C4C4C4"
                        style={{
                          marginBottom: 12,
                        }}
                      />
                      <Circle size={1.5} bg="#C4C4C4" />
                    </VStack>
                    <Box
                      style={{
                        backgroundColor: "#35B36F",
                        paddingLeft: 32,
                        paddingRight: 32,
                        paddingTop: 13,
                        paddingBottom: 13,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 24,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-SemiBold",
                          fontSize: 18,
                          color: "#ffffff",
                        }}
                      >
                        {startTime.minutes}
                      </Text>
                    </Box>
                    <Box
                      style={{
                        backgroundColor:
                          startTime.hours > 12 ? "#EDEBF4" : "#35B36F",
                        paddingLeft: 16,
                        paddingRight: 12,
                        paddingTop: 3,
                        paddingBottom: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                        marginBottom: 20,
                        borderTopLeftRadius: 24,
                        borderBottomLeftRadius: 24,
                        marginLeft: "auto",
                        // marginRight: 0,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-SemiBold",
                          fontSize: 12,
                          color: startTime.hours > 12 ? "#9B9B9B" : "#FFFFFF",
                        }}
                      >
                        AM
                      </Text>
                    </Box>
                    <Box
                      style={{
                        backgroundColor:
                          startTime.hours > 12 ? "#35B36F" : "#EDEBF4",
                        paddingLeft: 16,
                        paddingRight: 12,
                        paddingTop: 3,
                        paddingBottom: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                        marginBottom: 20,
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                        marginLeft: -1,
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-SemiBold",
                          fontSize: 12,
                          color: startTime.hours > 12 ? "#FFFFFF" : "#9B9B9B",
                        }}
                      >
                        PM
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </TouchableOpacity>
              <Calendar
                style={{
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
                }}
                renderArrow={(direction) => {
                  if (direction === "left") {
                    return (
                      <Entypo name="chevron-left" size={24} color="#A095C1" />
                    );
                  } else {
                    return (
                      <Entypo name="chevron-right" size={24} color="#A095C1" />
                    );
                  }
                }}
                maxDate={TODAYS_DATE}
                onDayPress={(day) => {
                  setStartDay(day);
                }}
                markingType={"period"}
                markedDates={selectedEpisodeDates}
              />
              <HStack justifyContent="center">
                <TouchableOpacity
                  style={{
                    height: 60,
                    backgroundColor: Colors.primary,
                    borderRadius: 14,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginRight: 40,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setStartDay(TODAY_START_DAY);
                    setStartTime(TODAY_START_TIME);
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 17,
                      color: "#FFFFFF",
                    }}
                  >
                    Now
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 60,
                    backgroundColor: "#35B36F",
                    borderRadius: 14,
                    marginBottom: 30,
                    paddingLeft: 20,
                    paddingRight: 20,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setShowWhenPainEpisodeModal(false);
                    setShowTypePainEpisodeModal(false);
                    navigationObj.navigate("PainEpisodeFormScreen");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 17,
                      color: "#FFFFFF",
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showTypePainEpisodeModal}
        onClose={setShowTypePainEpisodeModal}
        size="lg"
      >
        <Modal.Content
          style={{
            marginBottom: 0,
            marginTop: "auto",
            width: "100%",
            backgroundColor: "#EDEBF4",
            borderRadius: 24,
          }}
        >
          <Modal.Header>
            <Center>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 18,
                  marginTop: 12,
                  marginLeft: 5,
                }}
              >
                When did you have the pain episode?
              </Text>
            </Center>
          </Modal.Header>
          <Modal.Body>
            <VStack>
              <TouchableOpacity
                style={{
                  height: 73,
                  backgroundColor: "#ffffff",
                  borderRadius: 24,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowTypePainEpisodeModal(false);
                  navigationObj.navigate("PainEpisodeFormScreen");
                }}
              >
                <HStack>
                  <AntDesign
                    name="exclamationcircleo"
                    size={24}
                    color="#FF0000"
                    style={{
                      marginLeft: 31,
                      marginRight: 20,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 16,
                      color: "#0A0909",
                    }}
                  >
                    Ongoing episode
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#FF0000"
                    style={{
                      marginLeft: "auto",
                      marginRight: 25,
                    }}
                  />
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 73,
                  backgroundColor: "#ffffff",
                  borderRadius: 24,
                  marginBottom: 30,
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowWhenPainEpisodeModal(true);
                }}
              >
                <HStack>
                  <Feather
                    name="clock"
                    size={24}
                    color="#FFC702"
                    style={{
                      marginLeft: 31,
                      marginRight: 20,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 16,
                      color: "#0A0909",
                    }}
                  >
                    Record a past episode
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#FFC702"
                    style={{
                      marginLeft: "auto",
                      marginRight: 25,
                    }}
                  />
                </HStack>
              </TouchableOpacity>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#ffffff",
            height: 90,
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
        backBehavior="history"
      >
        <Screen
          name="Home"
          component={HomeNavigator}
          options={({ route }) => {
            var homeOptions = {
              tabBarIcon: ({ focused }) => (
                <TabBarItem
                  focused={focused}
                  icon={require("../assets/icons/home.png")}
                  label="Home"
                />
              ),
              headerShown: false,
            };
            if (
              route != null &&
              getFocusedRouteNameFromRoute(route) !== "Root"
            ) {
              homeOptions["tabBarStyle"] = {
                display: "none",
              };
            }
            return homeOptions;
          }}
        />
        <Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                icon={require("../assets/icons/history.png")}
                label="History"
              />
            ),
            headerShown: false,
          }}
        />
        <Screen
          name="+"
          component={NewPainEpisodePlaceholder}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={require("../assets/icons/plus.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              );
            },
            tabBarButton: (props: BottomTabBarButtonProps) => (
              <CustomTabBarButton {...props} />
            ),
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              setNavigationObj(navigation);
              setShowTypePainEpisodeModal(true);
            },
          })}
        />
        <Screen
          name="Resources"
          component={ResourcesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                icon={require("../assets/icons/resources.png")}
                label="Resources"
              />
            ),
            headerShown: false,
          }}
        />
        <Screen
          name="Passport"
          component={PassportScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                icon={require("../assets/icons/passport.png")}
                label="Passport"
              />
            ),
            headerShown: false,
          }}
        />
      </Navigator>
    </>
  );
};

export default Tabs;
