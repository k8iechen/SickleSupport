import React from "react";
import {StyleSheet, Text, View, Image} from 'react-native';
import Colors from '../constants/Colors';

function TabBarItem({
    focused,
    icon,
    label,
} : {
    focused : boolean,
    label: string
    icon;
}) {

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
                {focused && <View style={[styles.overlay]}/>}
                <Image
                source={icon}
                resizeMode='contain'
                style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    tintColor: focused ? Colors.primary : Colors.text,
                }}
                />
            </View>
            <Text style={{color: Colors.text, fontSize: 12, top: 3}}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        backgroundColor: Colors.primary,
        opacity: 0.07,
        width: 50,
        height: 50,
        borderRadius: 14,
    }
});

export default TabBarItem;
