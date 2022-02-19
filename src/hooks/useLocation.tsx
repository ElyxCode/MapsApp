import { useEffect, useRef, useState } from "react";
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation'; //This packaged no worked for me
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
    
    const [hasLocation, setHasLocation] = useState(false);

    const [ routeLines, setRouteLines ] = useState<Location[]>([]);

    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const [ userLocation, setUserLocation ] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const isMounted = useRef(true);

    const watchId = useRef<number>()

    useEffect(() => {

        isMounted.current = true;
        
        return () => {
            isMounted.current = false;
        }
    }, [])
    

    useEffect(() => {
        getCurrentLocation()
            .then(location => {
                
                if(!isMounted) return;
                
                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines(route => [...route, location]);
                setHasLocation(true);
            })
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (err) => reject({err}),
                {
                    enableHighAccuracy: true
                }
            );
        });
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {
                
                if(!isMounted) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }

                setUserLocation(location);

                setRouteLines(route => [...route, location]);
                console.log(routeLines);
            },
            (err) =>console.log({err}),
            {
                enableHighAccuracy: true, distanceFilter: 10
            }
        )
    };

    const stopUserLocation = () => {
        if(watchId.current){
            Geolocation.clearWatch(watchId.current);
        };
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        stopUserLocation,
        userLocation,
        routeLines
    }
}
