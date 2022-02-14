import React from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

export const PermissionsScreen = () => {

    let permissionsStatus: PermissionStatus;
    
    const checkLocationPermission = async () => {
        
        if(Platform.OS == 'ios'){

            // permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            
        }else{
            
            // permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        console.log({permissionsStatus});
    }

    return (
        <View style={ style.container }>
            <Text>PermisssionsScreen</Text>
            <Button 
                title='Permiso'
                onPress={ checkLocationPermission }
            />
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