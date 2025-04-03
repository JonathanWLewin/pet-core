import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';
import { create } from 'zustand';
import { Pet } from '../../constants/types';

const client = generateClient<Schema>();

type PetStore = {
    pets: Pet[];
    setPets: (pets: Pet[]) => void;
};

// Zustand store for pets with types
export const usePetStore = create<PetStore>((set) => ({
    pets: [],
    setPets: (pets) => set({ pets }),
}));

export default function Tab() {
    const { pets, setPets } = usePetStore(); // Use Zustand store
    const router = useRouter();

    useEffect(() => {
        client.models.Pet.list().then((response) => {
            setPets(response.data as Pet[]); // Type assertion for response data
            console.log("List of pets:", JSON.stringify(response));
        });
    }, []);

    return (
        <View>
            <Link href={"/AddPetModal"}>Add Pet</Link>
            {pets.map((pet) => (
                <TouchableOpacity 
                    key={pet.id} 
                    onPress={() => router.push(`/pet/${pet.id}`)} 
                    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
                >
                    <Image 
                        source={{ uri: pet.uri }} 
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} 
                    />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{pet.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}