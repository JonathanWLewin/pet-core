import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { usePetStore } from './index';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource'
import { Pet } from '../../constants/types';

const client = generateClient<Schema>();

export default function Tab() {
    const { pets } = usePetStore();
    const [selectedPet, setSelectedPet] = useState(pets[0]?.name);
    const [name, setName] = useState(pets[0]?.name);
    const [breed, setBreed] = useState(pets[0]?.breed);
    const [sex, setSex] = useState(pets[0]?.sex);
    const [currentConditions, setCurrentConditions] = useState(pets[0]?.currentConditions);
    const [weight, setWeight] = useState(pets[0]?.weight);

    const handlePetChange = (itemValue: string, itemIndex: number) => {
        const newPet = pets[itemIndex];
        setSelectedPet(newPet.name);
        setName(newPet.name);
        setBreed(newPet.breed);
        setSex(newPet.sex);
        setCurrentConditions(newPet.currentConditions);
        setWeight(newPet.weight);
    };

    const handleSubmit = async () => {
        const petToUpdate: Pet | undefined = pets.find((pet) => pet.name === selectedPet);
        console.log(petToUpdate);
        console.log(breed);
        console.log(
            petToUpdate && (
                name !== petToUpdate.name ||
                breed !== petToUpdate.breed ||
                sex !== petToUpdate.sex ||
                currentConditions !== petToUpdate.currentConditions ||
                weight !== petToUpdate.weight
            ));
        if (
            petToUpdate && (
                name !== petToUpdate.name ||
                breed !== petToUpdate.breed ||
                sex !== petToUpdate.sex ||
                currentConditions !== petToUpdate.currentConditions ||
                weight !== petToUpdate.weight
            )) {
                const petWithUpdates = {
                    ...petToUpdate,
                    name,
                    breed,
                    sex,
                    currentConditions,
                    weight,
                };
                console.log("Pet to update:", JSON.stringify(petWithUpdates));
                const {data: updatedPet, errors } = await client.models.Pet.update(petWithUpdates);
                console.log("Updated pet:", JSON.stringify(updatedPet));
                console.log("Errors:", JSON.stringify(errors));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select a pet:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedPet}
                    onValueChange={handlePetChange}
                    style={styles.picker}
                >
                    {pets.map((pet) => (
                        <Picker.Item key={pet.id} label={pet.name} value={pet.id} />
                    ))}
                </Picker>
            </View>
            {selectedPet && (
                <>
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
                </>
            )}
        </View>
    );
};

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
        height: 55,
        width: '100%',
    },
});
