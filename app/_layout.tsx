import { Stack } from 'expo-router/stack';

import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="AddPetModal"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
