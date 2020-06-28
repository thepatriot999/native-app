import { Location } from "../models/location";
import { Weather } from "../models/weather";

export class WeatherHelper {

    static getApi = (lat, long) => {
        return `https://samples.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=10&appid=b1b15e88fa797225412429c1c50c122a1`;
    }

    static async getWeatherFromLocation (location: Location): Promise<Weather> {
        try {
            const api = WeatherHelper.getApi(location.lat, location.long);
            const response = await fetch(api);
            const weather = await response.json();

            /* only get one from the list */
            const weatherDescriptions:string = weather.list.map(weatherItem => {
                return weatherItem.weather.map(weather => {
                    return weather.description;
                }).join();
            }).shift();

            return <Weather>{
                city: weather.city.name,
                description: weatherDescriptions,
            };
        } catch(err) {
            return <Weather>{
                city: '',
                description: ''
            };
        }
    }
}