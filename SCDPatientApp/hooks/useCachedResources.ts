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
          'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
          'Poppins-BlackItalic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'Poppins-BoldItalic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
          'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-ExtraBoldItalic': require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
          'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
          'Poppins-ExtraLightItalic': require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
          'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
          'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
          'Poppins-LightItalic': require('../assets/fonts/Poppins-LightItalic.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-MediumItalic': require('../assets/fonts/Poppins-MediumItalic.ttf'),
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-SemiBoldItalic': require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
          'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
          'Poppins-ThinItalic': require('../assets/fonts/Poppins-ThinItalic.ttf'),
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
