import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PainCrisisFormScreen from '../screens/PainCrisisFormScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import PassportScreen from '../screens/PassportScreen';

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
                tabBarIcon: ({focused}) => {
                    return (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 20
                        }}>
                        <View style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={[styles.overlay]}/>
                            <Image
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                position: "absolute",
                                width: 20,
                                height: 20,
                                tintColor: focused ? '#957DD6' : '#9B9B9B',
                            }}
                            />
                        </View>
                        <Text style={{color: '#9B9B9B', fontSize: 12, top: 3}}>Home</Text>
                    </View>
                )
                }
            }
            }/>
            <Screen name="History" component={HistoryScreen} />
            <Screen name="+" component={PainCrisisFormScreen} />
            <Screen name="Resources" component={ResourcesScreen} />
            <Screen name="Passport" component={PassportScreen} />
        </Navigator>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        backgroundColor: "#957DD6",
        opacity: 0.07,
        width: 50,
        height: 50,
        borderRadius: 14,
    }
})

export default Tabs;