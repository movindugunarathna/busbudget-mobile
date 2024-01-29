import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import data from '../data/bus-fares.json';

const App = () => {
  const [startingPoint, setStartingPoint] = useState(null);
  const [destination, setDestination] = useState(null);

  const options = data.map((item: any, index: any) => {
    return { label: item.city, value: (index + 1).toString() };
  });

  let startingPointIndex = data.find((item: any) => item.city === startingPoint)?.index;
  let destinationIndex = data.find((item: any) => item.city === destination)?.index;

  let fareIndex = (destinationIndex ?? 0) - (startingPointIndex ?? 0);
  let calculatedFare = data.find((item: any) => item.index === fareIndex)?.fare || 0;

  const handleStartingPointChange = (event: any) => {
    setStartingPoint(event.target.value);
  };

  const handleDestinationChange = (event: any) => {
    setDestination(event.target.value);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select Starting point'}
        searchPlaceholder="Starting point"
        onChange={(item: any) => {
          setStartingPoint(item.label);
          handleStartingPointChange;
        }}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select Destination'}
        searchPlaceholder="Destination"
        onChange={(item: any) => {
          setDestination(item.label);
          handleDestinationChange;
        }}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={[]}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'001'}
        searchPlaceholder="Route Number"
        onChange={(item: any) => {}}
      />
      <Text style={styles.fareLabel}>Bus fare: {calculatedFare}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  fareLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
  },
});

export default App;
