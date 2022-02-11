import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import { MapScreen } from '../screens/MapScreen';

const Stack = createStackNavigator();

export const StackNavigation = () => {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#FFF'
                } 
            }}
        >
            <Stack.Screen name='PermissionsScreen' component={PermissionsScreen} />
            <Stack.Screen name='MapScreen' component={MapScreen} />
        </Stack.Navigator>
            
    )   
}
