import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import {
  Slider,
  VStack,
  ScrollView,
  Box,
  HStack,
  Center,
  View,
  Modal,
  Button
} from "native-base";;
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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

const NewPainEpisodePlaceholder = () => <View />;

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { Navigator, Screen } = Tab;

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [showPainEpisodeModal, setShowPainEpisodeModal] = React.useState(false);
  const [navigationObj, setNavigationObj] = React.useState(null);

  function HomeNavigator() {
    return (
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Root" component={HomeScreen} />
        <Stack.Screen
          name="DailyDiaryFormScreen"
          component={DailyDiaryFormScreen}
        />
         <Stack.Screen
          name="PainEpisodeFormScreen"
          component={PainEpisodeFormScreen}
        />
      </Stack.Navigator>
    );
  }

  return (
    <>
     <Modal isOpen={showPainEpisodeModal} onClose={setShowPainEpisodeModal} size="lg">
          <Modal.Content style={{
               marginBottom: 0,
               marginTop: "auto",
               width: "100%",
               backgroundColor: "#EDEBF4",
               borderRadius: 24,
          }}>
            <Modal.Header>
              <Center>
                <Text style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 18,
                  marginTop: 12,
                  marginLeft: 5,
                }}>When did you have the pain episode?</Text>
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
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setShowPainEpisodeModal(false);
                  navigationObj.navigate("PainEpisodeFormScreen")
                }}
              >
                <HStack>
                  <AntDesign name="exclamationcircleo" size={24} color="#FF0000" style={{
                    marginLeft: 31,
                    marginRight: 20,
                  }}
                  />
                  <Text style={{
                     fontFamily: "Poppins-Medium",
                     fontSize: 16,
                     color: "#0A0909"
                  }}>Ongoing episode</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="#FF0000" style={{
                    marginLeft: "auto",
                    marginRight: 25,
                  }}/>
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 73,
                  backgroundColor: "#ffffff",
                  borderRadius: 24,
                  marginBottom: 30,
                  justifyContent: 'center',
                }}
              >
                <HStack>
                <Feather name="clock" size={24} color="#FFC702" style={{
                    marginLeft: 31,
                    marginRight: 20,
                  }}
                  />
                  <Text style={{
                     fontFamily: "Poppins-Medium",
                     fontSize: 16,
                     color: "#0A0909"
                  }}>Record a past episode</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="#FFC702" style={{
                    marginLeft: "auto",
                    marginRight: 25,
                  }}/>
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
          if (getFocusedRouteNameFromRoute(route) !== "Root") {
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
            setShowPainEpisodeModal(true);
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
