import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';
import { create } from 'zustand';
import { Pet, ExtendedPet } from '../../constants/types';
import { Image } from 'expo-image';
import { fetchImage } from '../../helpers/profile-pictures';
import { fetchProfilePictures } from '../../helpers/profile-pictures';

const client = generateClient<Schema>();

type PetStore = {
    pets: ExtendedPet[];
    setPets: (pets: ExtendedPet[]) => void;
};

// Zustand store for pets with types
export const usePetStore = create<PetStore>((set) => ({
    pets: [],
    setPets: (pets) => set({ pets }),
}));

export default function Tab() {
    const { pets, setPets } = usePetStore();
    const router = useRouter();

    // Grab the list of pets from the API and set them in the Zustand store
    // Then fetch the profile pictures for each pet and set them in the store
    useEffect(() => {
        client.models.Pet.list().then((response) => {
            let petsWithDownloadUrl = (response.data as Pet[]).map((pet) => ({
                ...pet,
                downloadUrl: undefined,
            }));
            console.log("List of pets:", JSON.stringify(petsWithDownloadUrl));
            setPets(petsWithDownloadUrl);
            fetchProfilePictures(petsWithDownloadUrl).then(() => {
                console.log("Fetched profile pictures successfully.");
                setPets(petsWithDownloadUrl);
            });
        });
    }, []);

    return (
        <View>
            <Link href={"/AddPetModal"}>Add Pet</Link>
            {pets.map((pet) => (
                <TouchableOpacity 
                    key={pet.id} 
                    onPress={() => router.push(`editPet`)} 
                    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
                >
                    <Image 
                        source={pet.downloadUrl}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} 
                    />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{pet.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}