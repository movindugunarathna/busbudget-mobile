import { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import data from '../data/bus-fares.json';

const App = () => {
  const [startingPoint, setStartingPoint] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeNumber, setRouteNumber] = useState<string | null>(null);

  const keys = data.map((item) => Object.keys(item));
  const cities = data.flatMap((item: any) => {
    if (routeNumber !== null) {
      return item[routeNumber].map((subItem: any) => ({ label: subItem.city, value: subItem.index }));
    }
  });

  let fareIndex = (destination as any)?.value - (startingPoint as any)?.value;
  let calculatedFare = 0;
  data.forEach((item: any) => {
    const keys = data.map((item) => Object.keys(item)[0]);

    const foundItem = item[Object.keys(item)[0]].find((subItem: any) => subItem.index === Math.abs(fareIndex));

    if (foundItem) {
      calculatedFare = foundItem.fare;
    }
  });

  const handleStartingPointChange = (item: any) => {
    setStartingPoint(item);
  };

  const handleDestinationChange = (item: any) => {
    setDestination(item);
  };

  const resetState = () => {
    setDestination(null);
    setStartingPoint(null);
    setRouteNumber(null);
    calculatedFare = 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Route Number:</Text>
      <Dropdown
        style={styles.dropdown}
        data={keys}
        search
        searchPlaceholder="Search route"
        labelField="label"
        valueField="value"
        placeholder="Select a route"
        value={routeNumber}
        onChange={(item) => setRouteNumber(item.value)}
      />

      <Text style={styles.label}>Starting point:</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cities}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select Starting point'}
        searchPlaceholder="Starting point"
        value={startingPoint}
        onChange={handleStartingPointChange}
      />

      <Text style={styles.label}>Destination:</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cities}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select Destination'}
        searchPlaceholder="Destination"
        value={destination}
        onChange={handleDestinationChange}
      />

      <Text style={styles.fareLabel}>Fare is Rs. {calculatedFare}</Text>

      <Pressable onPress={resetState} style={styles.resetButton}>
        <Text style={styles.text}>Reset</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  resetButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
