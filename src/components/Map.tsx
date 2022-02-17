import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers?: Marker[];
}

export const Map = ({ markers }: Props) => {

    const { hasLocation, initialPosition } = useLocation();

    if(!hasLocation){
        return <LoadingScreen />
    }
    
    return (
        <>
            <MapView
                style={{ flex: 1 }}
                // provider={ PROVIDER_GOOGLE }
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitud,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >
                {/* <Marker
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 13.816424,
                        longitude: -89.232220
                    }}
                    title='My location'
                    description='This my actually locate'
                /> */}
            </MapView>
            <Fab 
                iconName='star-outline'
                onPress={ () => console.log('Hello!')}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />
        </>
    )
}
