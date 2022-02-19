import React, { useEffect, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';
import { useState } from 'react';

interface Props {
    markers?: Marker[];
}

export const Map = ({ markers }: Props) => {

    const [ showPolyline , setShowPolyline ] = useState(true);
    const { 
        hasLocation, 
        initialPosition, 
        getCurrentLocation, 
        followUserLocation, 
        userLocation,
        stopUserLocation,
        routeLines } = useLocation();

    const mapViewRef = useRef<MapView>();

    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();

        return () => { stopUserLocation }
    }, []);

    useEffect(() => {

        if(!following.current) return;

        const { latitude, longitude } = userLocation;

        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        });
    }, [userLocation])
    
    

    const centerPosition = async () => {

        const { latitude, longitude } = await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        });
    }

    if(!hasLocation){
        return <LoadingScreen />
    }
    
    return (
        <>
            <MapView
                ref={ (ele)=> mapViewRef.current = ele! }
                style={{ flex: 1 }}
                // provider={ PROVIDER_GOOGLE }
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onTouchStart={ () => following.current = false }
            >
                {
                    showPolyline && 
                    <Polyline
                        coordinates={ routeLines }
                        strokeColor='#000'
                        strokeWidth={ 3 }
                    />
                }

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
                iconName='compass-outline'
                onPress={ centerPosition }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />

            <Fab 
                iconName='brush-outline'
                onPress={() => setShowPolyline(!showPolyline)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }}
            />
        </>
    )
}
