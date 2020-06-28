import React, { FunctionComponent, useState } from 'react';
import { Auth0API } from '../../api/auth0';

import {
  View,
  Text,
  Button,
} from 'react-native';

// const auth0 = new Auth0(credentials);

export const Login : FunctionComponent = (props) => {
    const [ githubUser, setGithubUser ] = useState(null);
    const auth:Auth0API = new Auth0API();

    const _onLogin = async () => {
        try {
            const credentials = await auth.webAuth();

            _getUserFromToken(credentials.accessToken);
        } catch(err) {
            console.log(err);
        }
    };

    const _getUserFromToken = async (token: string) => {
        try {
            const userInfo = await auth.getUserInfoFromToken(token);

            _getUser(token, userInfo.sub);
        } catch(err) {
            console.log(err);
        }
    }

    const _getUser = async (token: string, id: string) => {
        const githubUser = await auth.getUserFromSub(token, id);

        // setGithubUser({...githubUser, token});
        props.navigation.navigate('Home', {
            ...githubUser,
            token
        });
    }

    const _onLogout =  async () => {
        try {
            await auth.logOut();
        } catch(err) {
            console.log(err);
        }

        setGithubUser(null);
    };

    const loggedIn = githubUser === null ? false : true;

    return (
        <View>
            <Text>Test React Applications</Text>
            <Text>
            You are{ loggedIn ? ' ' : ' not ' }logged in . </Text>
            <Button onPress = { loggedIn ? _onLogout : _onLogin }
            title = { loggedIn ? 'Log Out' : 'Log In' }/>
        </View>
    )
}