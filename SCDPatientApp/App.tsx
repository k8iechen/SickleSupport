import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { observer } from "mobx-react-lite";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { AuthProvider } from "./providers/AuthProvider";

const App = observer(() => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <AuthProvider>
          <Navigation colorScheme={colorScheme} />
        </AuthProvider>
        <StatusBar style="auto" />
      </NativeBaseProvider>
    );
  }
});

export default App;
