import React from "react";
import { StyleSheet, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

type TCustomSelectOption = {
  id: string;
  name: string;
};

interface ICustomSelectProps {
  single: boolean;
  selectText: string;
  choices: TCustomSelectOption[];
  selections: TCustomSelectOption[];
  onSelectedItemsChange: (items: TCustomSelectOption[]) => void;
}

const styles = StyleSheet.create({
  tagContainerStyle: {
    width: wp("38"),
  },
});

// TODO: investigate how to handle nesting of lists
const CustomSelect: React.FC<ICustomSelectProps> = ({
  single = false,
  selectText,
  choices,
  selections,
  onSelectedItemsChange,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <MultiSelect
        single={single}
        items={choices}
        selectedItems={selections}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectText={selectText}
        displayKey="name"
        submitButtonText="Submit"
        fontFamily="Poppins-Medium"
        fontSize={RFValue(16, 896)}
        itemFontFamily="Poppins-Medium"
        itemFontSize={RFValue(16, 896)}
        itemTextColor={Colors.text}
        tagBorderColor={Colors.darkGrey}
        selectedItemTextColor={Colors.darkGrey}
        selectedItemIconColor={Colors.darkGrey}
        selectedItemFontFamily="Poppins-Medium"
        textColor={Colors.darkColor}
        textInputProps={{ editable: false }}
        searchInputPlaceholderText={selectText}
        searchIcon={false}
        tagRemoveIconColor={Colors.darkColor}
        searchInputStyle={{
          color: Colors.darkGrey,
          fontFamily: "Poppins-Regular",
          fontSize: RFValue(16, 896),
        }}
        submitButtonColor={Colors.darkColor}
        styleDropdownMenuSubsection={{
          paddingRight: 0,
          paddingLeft: 17,
          backgroundColor: Colors.unselected,
          borderColor: Colors.darkColor,
        }}
        styleInputGroup={{
          marginRight: 10,
          marginTop: 20,
          backgroundColor: Colors.unselected,
          borderColor: Colors.backButton,
        }}
        styleItemsContainer={{
          marginTop: 5,
          backgroundColor: Colors.unselected,
        }}
        styleRowList={{
          backgroundColor: Colors.unselected,
        }}
        styleSelectorContainer={{
          backgroundColor: Colors.unselected,
          borderColor: Colors.backButton,
        }}
        styleTextDropdown={{
          height: "100%",
        }}
        styleTextDropdownSelected={{
          backgroundColor: Colors.unselected,
          borderColor: Colors.backButton,
          height: "100%",
        }}
        tagTextColor={Colors.darkGrey}
        tagContainerStyle={styles.tagContainerStyle}
      />
    </View>
  );
};

export default CustomSelect;
