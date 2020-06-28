import GetLocation from 'react-native-get-location'
import { Location } from '../models/location';

export class LocationHelper {
    static async getLocation (): Promise<Location> {
        const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        });

        return <Location>{
            lat: location.latitude,
            long: location.longitude,
        };
    }
}
