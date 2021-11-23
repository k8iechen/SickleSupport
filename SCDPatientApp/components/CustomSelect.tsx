import React from "react";
import { View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import Colors from "../constants/Colors";

interface TCustomSelectOption {
  id: string;
  name: string;
}

const CustomSelect = ({
  single = false,
  selectText,
  choices,
  selections,
  onSelectedItemsChange,
}: {
  single: boolean;
  selectText: string;
  choices: TCustomSelectOption[];
  selections: TCustomSelectOption[];
  onSelectedItemsChange: (items: TCustomSelectOption[]) => void;
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
        fontSize={14}
        itemFontFamily="Poppins-Medium"
        itemFontSize={14}
        itemTextColor={Colors.text}
        tagBorderColor={Colors.darkGrey}
        selectedItemTextColor={Colors.darkGrey}
        selectedItemIconColor={Colors.darkGrey}
        selectedItemFontFamily="Poppins-Medium"
        textColor={Colors.darkColor}
        searchInputStyle={{
          color: Colors.darkGrey,
          fontFamily: "Poppins-Regular",
          fontSize: 14,
        }}
        submitButtonColor={Colors.darkColor}
        styleDropdownMenuSubsection={{
          paddingRight: 0,
          paddingLeft: 17,
          backgroundColor: Colors.unselected,
          borderColor: Colors.darkColor,
        }}
        styleInputGroup={{
          marginBottom: 20,
          marginRight: 10,
          marginTop: 20,
          backgroundColor: Colors.unselected,
          borderColor: Colors.backButtonArrow,
        }}
        styleItemsContainer={{
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: Colors.unselected,
        }}
        styleListContainer={{
          backgroundColor: Colors.unselected,
        }}
        styleMainWrapper={{
          backgroundColor: Colors.unselected,
        }}
        styleRowList={{
          backgroundColor: Colors.unselected,
        }}
        styleSelectorContainer={{
          backgroundColor: Colors.unselected,
          borderColor: Colors.backButtonArrow,
        }}
        styleTextDropdown={{}}
        styleTextDropdownSelected={{
          backgroundColor: Colors.unselected,
          borderColor: Colors.backButtonArrow,
        }}
        tagTextColor={Colors.darkGrey}
      />
    </View>
  );
};

export default CustomSelect;
