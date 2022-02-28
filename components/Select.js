import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Select = ({ value, onValueChange, placeholder, items }) => (
  <RNPickerSelect
    value={value}
    onValueChange={onValueChange}
    placeholder={placeholder}
    useNativeAndroidPickerStyle={false}
    items={items}
    style={styles}
  />
);

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: 'center',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: 'center',
  },
});

export { Select };
