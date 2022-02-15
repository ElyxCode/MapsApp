import React from 'react'
import MapView, { Marker } from 'react-native-maps'

export const Map = () => {
    return (
        <>
            <MapView
                style={{ flex: 1 }}
                // provider={ PROVIDER_GOOGLE }
                initialRegion={{
                    latitude: 13.816424,
                    longitude: -89.232220,
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
        </>
    )
}
