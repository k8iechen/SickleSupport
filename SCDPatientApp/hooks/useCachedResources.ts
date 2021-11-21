import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'Poppins-Black.ttf': require('../assets/fonts/Poppins-Black.ttf'),
          'Poppins-BlackItalic.ttf': require('../assets/fonts/Poppins-BlackItalic.ttf'),
          'Poppins-Bold.ttf': require('../assets/fonts/Poppins-Bold.ttf'),
          'Poppins-BoldItalic.ttf': require('../assets/fonts/Poppins-BoldItalic.ttf'),
          'Poppins-ExtraBold.ttf': require('../assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-ExtraBoldItalic.ttf': require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
          'Poppins-ExtraLight.ttf': require('../assets/fonts/Poppins-ExtraLight.ttf'),
          'Poppins-ExtraLightItalic.ttf': require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
          'Poppins-Italic.ttf': require('../assets/fonts/Poppins-Italic.ttf'),
          'Poppins-Light.ttf': require('../assets/fonts/Poppins-Light.ttf'),
          'Poppins-LightItalic.ttf': require('../assets/fonts/Poppins-LightItalic.ttf'),
          'Poppins-Medium.ttf': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-MediumItalic.ttf': require('../assets/fonts/Poppins-MediumItalic.ttf'),
          'Poppins-Regular.ttf': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-SemiBold.ttf': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-SemiBoldItalic.ttf': require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
          'Poppins-Thin.ttf': require('../assets/fonts/Poppins-Thin.ttf'),
          'Poppins-ThinItalic.ttf': require('../assets/fonts/Poppins-ThinItalic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
