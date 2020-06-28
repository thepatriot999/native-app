import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import GetLocation from 'react-native-get-location'
import { LocationHelper } from '../../api/location';
import { WeatherHelper } from '../../api/weather';
import { Location } from '../../models/location';
import { Weather as WeatherModel } from '../../models/weather';

export const Weather : FunctionComponent = ({route, navigation}) => {
    const [ weather, setWeather ] = useState(null);

    const _getLocation = async () => {
        const location:Location = await LocationHelper.getLocation();
        const weather:WeatherModel = await WeatherHelper.getWeatherFromLocation(location);

        setWeather(weather);
    }

    useEffect(() => {
        _getLocation();
    }, [])

    return (
        <View>
            <Text>What's the weatehr today!</Text>
            {
                !!weather
                &&
                <View>
                    <Text>City: {weather.city}</Text>
                    <Text>City: {weather.description}</Text>
                </View>
            }
        </View>
    )
}