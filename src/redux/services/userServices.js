import Cookies from 'js-cookie'
import config from "../../config";

export const userServices = {
    login,
    logout,
    generateLoginToken,
    refreshAuth,
};

function refreshAuth(refreshToken) {
    const encodedId = btoa(`${config.clientId}:${config.clientSecret}`);
    const body = {
        "grant_type": "refresh_token",
        "refresh_token": refreshToken,
        "client_id": config.clientId
    }

    return fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${encodedId}`
        },
        body: new URLSearchParams(body)
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
}

function login(code) {
    const encodedId = btoa(`${config.clientId}:${config.clientSecret}`);
    const body = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": config.redirectUri
    }

    return fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${encodedId}`
        },
        body: new URLSearchParams(body)
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
}

function generateLoginToken(auth) {
    if (auth !== undefined) {
        if (auth.access_token)
            Cookies.set('auth', auth.access_token, { expires: auth.expires_in }, { secure: true }, { sameSite: 'strict' })
        if (auth.refresh_token)
              Cookies.set('refresh', auth.refresh_token, { expires: auth.expires_in }, { secure: true }, { sameSite: 'strict' })
    }
}

function logout() {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove('auth');
    Cookies.remove('refresh');
    window.location.reload();
}