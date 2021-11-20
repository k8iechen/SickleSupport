import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PainCrisisFormScreen from '../screens/PainCrisisFormScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import PassportScreen from '../screens/PassportScreen';
import TabBarItem from '../components/TabBarItem';
import CustomTabBarButton from '../components/CustomTabBarComponent';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const { Navigator, Screen } = Tab;

    return (
        <Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: "#ffffff",
                    height: 90,
                    borderTopWidth: 0,
                  },
              }}
        >
            <Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => <TabBarItem focused={focused} icon={require("../assets/icons/home.png")} label="Home" />,
                headerShown: false,
            }}/>
            <Screen name="History" component={HistoryScreen} options={{
                tabBarIcon: ({focused}) => <TabBarItem focused={focused} icon={require("../assets/icons/history.png")} label="History" />,
                headerShown: false,
            }}/>
            <Screen name="+" component={PainCrisisFormScreen} options={{
                tabBarIcon: ({focused}) => {
                    return (
                    <Image
                        source={require("../assets/icons/plus.png")}
                        resizeMode="contain"
                        style={{
                        width: 30,
                        height: 30,
                    }} />
                    )
                },
                tabBarButton: (props) => <CustomTabBarButton {... props} />,
                headerShown: false,
            }}/>
            <Screen name="Resources" component={ResourcesScreen} options={{
                tabBarIcon: ({focused}) => <TabBarItem focused={focused} icon={require("../assets/icons/resources.png")} label="Resources" />,
                headerShown: false,
            }}/>
            <Screen name="Passport" component={PassportScreen} options={{
                tabBarIcon: ({focused}) => <TabBarItem focused={focused} icon={require("../assets/icons/passport.png")} label="Passport" />,
                headerShown: false,
            }}/>
        </Navigator>
    )
}

export default Tabs;