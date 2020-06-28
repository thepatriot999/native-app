import Auth0 from 'react-native-auth0';
const credentials = require('../auth0-configuration.json');

export class Auth0API {
    auth0: Auth0;

    constructor() {
        this.auth0 = new Auth0(credentials);
    }

    webAuth() {
        return this.auth0
            .webAuth
            .authorize({
                scope: 'openid profile email read:current_user',
                audience : `https://${credentials.domain}/api/v2/`,
            })
    }

    getUserInfoFromToken(token) {
        return this.auth0
            .auth
            .userInfo({token});
    }

    getUserFromSub(token, userSub) {
        return this.auth0
            .users(token)
            .getUser({id: userSub});
    }

    logOut() {
        return this.auth0.webAuth
            .clearSession({})
    }
}