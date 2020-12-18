import store from './store'

export const auth = {
    authHeader,
    getAccessToken,
    isAuth
};

function authHeader() {
    const state = store.getState();
    let auth;
    if (state.authentication.auth && state.authentication.auth.access_token) {
        auth = state.authentication.auth.access_token;        
    }
    if (auth) {        
        return `Bearer ${auth}`;
    } else {
        return null;
    }
}

function getAccessToken() {
    const state = store.getState();
    let auth;
    if (state.authentication.auth && state.authentication.auth.access_token) {
        auth = state.authentication.auth.access_token;
    }
    if (auth) {
        return auth;
    } else {
        return null;
    }
}

function isAuth() {
    const state = store.getState();
    let auth = state.authentication.loggedIn;
    if (auth && auth === true) {
        return true;
    } else {
        return false;
    }
}