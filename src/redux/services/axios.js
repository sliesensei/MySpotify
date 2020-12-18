
import axios from 'axios';
import config from '../../config';
import { userServices } from './userServices';
import { userConstants } from '../constants/userConstants';
import store from '../../helpers/store';
import { auth } from '../../helpers/authHeader';
import { toastr } from 'react-redux-toastr';
import Cookies from 'js-cookie'



const main = axios.create();

axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

main.defaults.baseURL = config.API_URL;
main.defaults.headers.post['Content-Type'] = 'application/json';
main.defaults.headers.put['Content-Type'] = 'application/json';

main.interceptors.request.use(
  config => {
    const token = auth.authHeader();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => Promise.reject(error),
);

let isRefreshing = false;

let subscribers = [];

main.interceptors.response.use(undefined, err => {

  const { config, response: { status } } = err;
  const originalRequest = config;

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      let refresh = Cookies.get('refresh');
      userServices.refreshAuth(refresh)
        .then(response => {
          const auth = response;
          userServices.generateLoginToken(auth);
          isRefreshing = false;
          onRrefreshed(auth.access_token);
          store.dispatch({ type: userConstants.LOGIN_REFRESH_SUCCESS, auth })
          subscribers = [];
        }
        );
    }
    const requestSubscribers = new Promise(resolve => {
      subscribeTokenRefresh(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
    return requestSubscribers;
  }
  return Promise.reject(err);
});

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRrefreshed(token) {
  subscribers.map(cb => cb(token));
}


export const apiClient = main;

export function handleResponse(response) {
  if (response.statusText !== 'OK') {
    if (response.status === 401) {
      let refresh = Cookies.get('refresh');
      userServices.refreshAuth(refresh)
        .then(res => {
          if (res && res.access_token) {
            userServices.generateLoginToken(res);
            toastr.success('Your connection', "Your connection token has been successfully refreshed, please refresh")
          }
          else {
            toastr.error('Error', "Your session as expired, please relogin")
            const error = response.statusText;
            return Promise.reject(error);
          }
        })
    }
  }
  return response.data;
}