import React from "react";
import { Image } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

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

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { Navigator, Screen } = Tab;

  const Stack = createNativeStackNavigator<RootStackParamList>();

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
      </Stack.Navigator>
    );
  }

  return (
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
          if (getFocusedRouteNameFromRoute(route) == "DailyDiaryFormScreen") {
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
        component={PainEpisodeFormScreen}
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
  );
};

export default Tabs;
