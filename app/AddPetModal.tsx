import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../amplify/data/resource';

type Gender = 'male' | 'female';

const client = generateClient<Schema>();

export default function Modal() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState<Gender>('male');
  const [currentConditions, setCurrentConditions] = useState('');
  const [weight, setWeight] = useState(0);

  const handleSubmit = () => {
    // Handle form submission logic here
    client.models.Pet.create({
        name,
        breed,
        sex,
        currentConditions,
        weight
    });
    console.log({ name, breed, sex, currentConditions, weight });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter pet's name"
      />

      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
        placeholder="Enter pet's breed"
      />

      <Text style={styles.label}>Sex</Text>
      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={sex}
            style={styles.picker}
            onValueChange={(itemValue) => setSex(itemValue)}
        >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <Text style={styles.label}>Current Conditions</Text>
      <TextInput
        style={styles.input}
        value={currentConditions}
        onChangeText={setCurrentConditions}
        placeholder="Enter current conditions"
      />

      <Text style={styles.label}>Weight</Text>
      <TextInput
        style={styles.input}
        value={weight.toString()}
        onChangeText={(text) => setWeight(parseFloat(text) || 0)}
        placeholder="Enter weight"
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
