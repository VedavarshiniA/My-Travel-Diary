import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Platform, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [highlights, setHighlights] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addEntry = () => {
    const newEntry = { id: Date.now(), date: date.toLocaleDateString(), location: location, highlights: highlights };
    setEntries([...entries, newEntry]);
    setDate(new Date());
    setLocation('');
    setHighlights('');
  };

  const resetEntry = () => {
    setDate(new Date());
    setLocation('');
    setHighlights('');
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <Text style={styles.entryText}>Date: {item.date}</Text>
      <Text style={styles.entryText}>Location: {item.location}</Text>
      <Text style={styles.entryText}>Highlights: {item.highlights}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resetEntry} style={[styles.button, styles.resetButton]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteEntry(item.id)} style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>MY TRAVEL DIARY</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Button title="Select Date" onPress={() => setShowDatePicker(true)} color="#088f8f" />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={text => setLocation(text)}
            placeholderTextColor="#000000"
          />
          <TextInput
            style={[styles.input, { height: 80 }]} // Increase height for highlights input
            placeholder="Highlights"
            value={highlights}
            onChangeText={text => setHighlights(text)}
            multiline={true}
            placeholderTextColor='#000000'
          />
          <Button title="Add Entry" onPress={addEntry} color="#0d98ba" />
        </View>
        <ScrollView style={styles.entriesContainer}>
          <FlatList
            data={entries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    padding: 20,
  },
  headingContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#800080', // Purple text color
  },
  bodyContainer: {
    flex: 1,
    marginTop: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#000000', // Purple border color
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000000', // Purple text color
  },
  entriesContainer: {
    flex: 1,
  },
  entry: {
    borderWidth: 1,
    borderColor: '#007bff', // Purple border color
    backgroundColor: '#f9f9f9', // Light gray background color
    padding: 15,
    marginBottom: 10,
    borderRadius: 8, // Add border radius
  },
  entryText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#007bff', // Purple text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#00ff96',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#ffffff',
  },
});
