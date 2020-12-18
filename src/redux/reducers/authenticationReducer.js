
import { userConstants } from '../constants/userConstants';
import Cookies from 'js-cookie';

let auth = Cookies.get('auth');
let refresh = Cookies.get('refresh');

let initialState = {};

if (auth) {
  initialState = {
    loggedIn: true,
    auth: {
      access_token: auth,
      refresh_token: refresh,
    }
  };
} else {
  initialState = {};
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case userConstants.REQUEST_NEW_PASSWORD:
      return {
        requestNewPassword: true,
      };
    case userConstants.LOGIN_SUCCESS:
        return {
          loggedIn: true,
          auth: action.auth
        };
    case userConstants.LOGIN_REFRESH_REQUEST:
        return {
          ...state,
          refreshingToken: true
        }
    case userConstants.LOGIN_REFRESH_SUCCESS:
      return {
        loggedIn: true,
        auth: action.auth
      }
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGIN_REFRESH_FAILURE:
      return {};

    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}