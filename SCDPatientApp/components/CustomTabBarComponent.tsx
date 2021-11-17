import React from "react";
import {View, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

function CustomTabBarButton({
    children,
    onPress
} : {
    children;
    onPress: () => void
}) {
    return (
        <TouchableOpacity
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: Colors.primaryShadowColor,
                shadowOffset: {
                    width: 0,
                    height: 8,
                },
                shadowRadius: 24,
                shadowOpacity: 0.8,
                elevation: 5,
                marginLeft: 15,
                marginRight: 15
            }
            }
            onPress={onPress}
        >
            <View style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                backgroundColor: Colors.primaryColor
            }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

export default CustomTabBarButton;
