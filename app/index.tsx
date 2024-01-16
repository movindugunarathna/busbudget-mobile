import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = require('../data/bus-fares.json');

const Page = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  type data = {
    city: string;
    index: number;
    fare: number;
  };
  const [items, setItems] = useState<data[]>([]);

  useEffect(() => {
    setItems(data);
  }, []);

  let startingPointIndex = items.find((item) => item.city === startingPoint)?.index;
  let destinationIndex = items.find((item) => item.city === destination)?.index;

  let fareIndex = (destinationIndex ?? 0) - (startingPointIndex ?? 0);
  let calculatedFare = items.find((item) => item.index === fareIndex)?.fare || 0;

  return (
    <View style={styles.container}>
      <Dropdown labelField="Starting Point" data={items.map((item) => ({ value: item.city }))} value={startingPoint} onChangeText={(value) => setStartingPoint(value)} />
      <Dropdown labelField="Destination" data={items.map((item) => ({ value: item.city }))} value={destination} onChangeText={(value) => setDestination(value)} />
    </View>
  );
};

export default Page;

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
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
