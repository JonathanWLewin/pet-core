import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
        tabBarActiveTintColor: '#55555c',
        headerShown: false,
        tabBarStyle: { backgroundColor: '#2b2a33' }
        }}>
        <Tabs.Screen
            name='index'
            options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
        />
        <Tabs.Screen
            name='editPet'
            options={{
            title: 'Edit',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
        />
        </Tabs>
    );
}