import { userConstants } from "../constants/userConstants";
import { userServices } from '../services/userServices';
import { alertActions } from './alertActions';

export const userActions = {
	login,
	logout,
};


function logout() {
	return dispatch => {
		dispatch({ type: 'USERS_LOGGED_OUT' });
		//userServices.logout();
	}
}

function login(code) {
	return dispatch => {
		dispatch(loginRequest({ code }));
		return userServices.login(code)
			.then(
				logged => {
					userServices.generateLoginToken(logged);
					dispatch(loginSuccess(logged))
					dispatch(alertActions.successToast('Connection successfull'));
				},
				error => {
					dispatch(loginFailure(error.toString()));
					dispatch(alertActions.error('Could not connect, please check your credentials.'));
				}
			)
			.catch((error) => {
				console.error(error);
			})
	};

	function loginRequest() { return { type: userConstants.LOGIN_REQUEST } }
	function loginSuccess(auth) { return { type: userConstants.LOGIN_SUCCESS, auth } }
	function loginFailure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}