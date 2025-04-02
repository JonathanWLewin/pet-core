import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export default function Tab() {

    useEffect(() => {
        client.models.Pet.list().then((response) => {
            console.log("List of pets:", JSON.stringify(response));
        });
    }, [])

    return (
        <View>
            <Link href={"/AddPetModal"}>Add Pet</Link>
        </View>
    )
}