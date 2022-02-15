import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { AppState, ImageStore, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from "react-native-permissions";

export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermissionsContextProps); 

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionInitState);

    useEffect(() => {
        
        checkLocationPermission();

        AppState.addEventListener('change', ( state ) => {
            if(state !== 'active') return;

            checkLocationPermission();
        });
      
    }, [])
    

    const askLocationPermission = async () => {
        
        let permissionsStatus: PermissionStatus;
                
        if(Platform.OS == 'ios'){

            // permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            
        }else{
            
            // permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if( permissionsStatus === 'blocked'){
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionsStatus
        });
        
    }

    const checkLocationPermission = async () => {

        let permissionsStatus: PermissionStatus;
                
        if(Platform.OS == 'ios'){

            // permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            
        }else{
            
            // permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionsStatus
        });

    }
    
    return (
        <PermissionContext.Provider
            value={{
                permissions,
                askLocationPermission,
                checkLocationPermission
            }}
        >
            { children }
        </PermissionContext.Provider>
    )

}