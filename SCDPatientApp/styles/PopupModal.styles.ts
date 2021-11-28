import { StyleSheet } from "react-native";
import { styles as sharedStyles } from "./Shared.styles"

export const styles = StyleSheet.create({
    title: {
        ...sharedStyles.cardTitleText,
        marginLeft: 10,
        paddingTop: 10,
    },

    description: {
        fontFamily: "Poppins-Medium",
        fontWeight: "500",
        fontSize: 14,
        marginBottom: 30
    },
})
