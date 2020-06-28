import React, { FunctionComponent, useState, useEffect } from 'react';

import {
  View,
  Text,
  Button,
} from 'react-native';
import { useLinkProps } from '@react-navigation/native';

export const Home : FunctionComponent = ({route, navigation}) => {
    const [ nickname, setNickname ] = useState(null);
    const [ html_url, setHtmlUrl ] = useState(null);

    useEffect(() => {
        if(!!!route.params) {
            return navigation.navigate('Login');
        }
    }, []);

    useEffect(() => {
        if(!!route.params) {
            const { nickname, html_url } = route.params;

            setNickname(nickname);
            setHtmlUrl(html_url);
        }
    }, [route.params])

    return (
        <View>
            <Text>Welcome to Lauer Systems!</Text>
            <Text>Username: {nickname}</Text>
            <Text>Github Profile: {html_url}</Text>
            <Button title="Weather" onPress={() => navigation.navigate('Weather')} />
        </View>
    )
}