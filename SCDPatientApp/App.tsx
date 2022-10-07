import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { observer } from "mobx-react-lite";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import { AuthProvider } from "./src/providers/AuthProvider";


const App = observer(() => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
        <StatusBar style="auto" />
      </NativeBaseProvider>
    );
  }
});

export default App;
