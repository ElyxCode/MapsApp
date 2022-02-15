import React, { useContext } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';
import { PermissionContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

    const { permissions, checkLocationPermission, askLocationPermission } = useContext(PermissionContext);


    return (
        <View style={ style.container }>
            <Text>PermisssionsScreen</Text>
            <Button 
                title='Permiso'
                onPress={ askLocationPermission }
            />
            <Text>{ JSON.stringify({ permissions }, null, 5) }</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});