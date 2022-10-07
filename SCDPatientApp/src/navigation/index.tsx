/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";

import { AuthContext } from "../contexts/AuthContext";
import WelcomeAuthScreen from "../screens/WelcomeAuthScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { RootStackParamList } from "../models/navigation";
import LinkingConfiguration from "./LinkingConfiguration";

import Tabs from "./tabs";

const Navigation = observer(() => {
  const authStore = useContext(AuthContext);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "#fff",
        },
      }}
    >
      {authStore.isAuthenticated() ? (
        <Tabs />
      ) : (
        <OnboardingNavigator />
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
});

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function OnboardingNavigator() {
  const authStore = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={authStore.patient === null ? "Welcome" : "Onboarding"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeAuthScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;
