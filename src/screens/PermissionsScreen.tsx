import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PermissionsButton } from '../components/PermissionsButton';
import { PermissionContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

    const { permissions, checkLocationPermission, askLocationPermission } = useContext(PermissionContext);


    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Para usar esta aplicación se necesita permisos del GPS</Text>
            <PermissionsButton 
                title='Permiso'
                onPress={ askLocationPermission }
            />
            <Text style={{ marginTop: 20 }}>{ JSON.stringify({ permissions }, null, 5) }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    }
});