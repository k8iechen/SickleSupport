import React from "react";
import { Image } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { View } from "native-base";

import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import PainEpisodeFormScreen from "../screens/PainEpisodeFormScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import PassportScreen from "../screens/PassportScreen";
import TabBarItem from "../components/TabBarItem";
import CustomTabBarButton from "../components/CustomTabBarComponent";
import DailyDiaryFormScreen from "../screens/DailyDiaryFormScreen";
import PainTypeModal from "../components/PainTypeModal";
import { PainWhenModal } from "../components/PainWhenModal";
import { getDateString } from "../common/DateUtils";

const NewPainEpisodePlaceholder = () => <View />;

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const Tabs = () => {
  const { Navigator, Screen } = Tab;

  const [showTypePainEpisodeModal, setShowTypePainEpisodeModal] =
    React.useState(false);
  const [showWhenPainEpisodeModal, setShowWhenPainEpisodeModal] =
    React.useState(false);

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

  const [navigationObj, setNavigationObj] = React.useState(null);
  const [startDay, setStartDay] = React.useState(TODAY_START_DAY);
  const [startTime, setStartTime] = React.useState(TODAY_START_TIME);

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
          options={{ gestureEnabled: false }} // Prevent user from swapping left to force exit form
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
      <PainWhenModal
        showModal={showWhenPainEpisodeModal}
        setShowModal={setShowWhenPainEpisodeModal}
        setShowTypeModal={setShowTypePainEpisodeModal}
        startDay={startDay}
        setStartDay={setStartDay}
        startTime={startTime}
        setStartTime={setStartTime}
        initialStartDay={TODAY_START_DAY}
        initialStartTime={TODAY_START_TIME}
        navigation={navigationObj}
      />
      <PainTypeModal
        showModal={showTypePainEpisodeModal}
        setShowModal={setShowTypePainEpisodeModal}
        setShowWhenModal={setShowWhenPainEpisodeModal}
        navigation={navigationObj}
      />
      <Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#ffffff",
            height: 110,
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
            var focusedRouteName = getFocusedRouteNameFromRoute(route);
            if (focusedRouteName && focusedRouteName !== "Root") {
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
