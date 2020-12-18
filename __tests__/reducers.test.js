import {
	userReducer,
	playerReducer,
	sidebarReducer,
	authenticationReducer,
	searchReducer
} from '../src/redux/reducers';
import { userConstants } from "../src/redux/constants/userConstants";
import { playerConstants } from "../src/redux/constants/playerConstants";
import { sidebarConstants } from "../src/redux/constants/sidebarConstants";
import { searchConstants } from "../src/redux/constants/searchConstants";
import { auth } from "../src/helpers/authHeader";

describe('Authentication reducer', () => {
	it('should return the initial state', () => {
		expect(authenticationReducer(undefined, {}))
			.toEqual({})
	})

	it('should request login', () => {
		expect(authenticationReducer(undefined, {
			type: userConstants.LOGIN_REQUEST
		}))
			.toEqual({
				loggingIn: true
			})
	})

	it('should request new password', () => {
		expect(authenticationReducer(undefined, {
			type: userConstants.REQUEST_NEW_PASSWORD
		}))
			.toEqual({
				requestNewPassword: true,
			})
	})

	it('should success login', () => {
		expect(authenticationReducer(undefined, {
			type: userConstants.LOGIN_SUCCESS,
			auth: 'auth'
		}))
			.toEqual({
				loggedIn: true,
				auth: 'auth'
			})
	})

	it('should refresh request', () => {
		expect(authenticationReducer(undefined, {
			type: userConstants.LOGIN_REFRESH_REQUEST
		}))
			.toEqual({
				refreshingToken: true
			})
	})

	it('should success refresh', () => {
		expect(authenticationReducer(undefined, {
			type: userConstants.LOGIN_REFRESH_SUCCESS,
			auth: 'auth'
		}))
			.toEqual({
				loggedIn: true,
				auth: 'auth'
			})
	})

	it('should logout', () => {
		let state = {
			loggedIn: true,
			auth: {
				access_token: 'auth',
				refresh_token: 'refresh',
			}
		}
		expect(authenticationReducer(state, {
			type: userConstants.LOGOUT
		}))
			.toEqual({})
	})
})

describe('Search reducer', () => {
	it('should return the initial state', () => {
		expect(searchReducer(undefined, {}))
			.toEqual({
				lastsearch: ""
			})
	})

	it('should set the last search', () => {
		expect(searchReducer(undefined, {
			type: searchConstants.LASTSEARCH,
			state: 'search'
		}))
			.toEqual({
				lastsearch: "search"
			})
	})

	it('should set the last result', () => {
		expect(searchReducer(undefined, {
			type: searchConstants.LASTRESULTSEARCH,
			state: 'result'
		}))
			.toEqual({
				lastresult: 'result',
				lastsearch: ''
			})
	})
})

describe('User reducer', () => {
	it('should return the initial state', () => {
		expect(userReducer(undefined, {})).toEqual({});
	})

	it('should loading', () => {
		expect(userReducer(undefined, {
			type: userConstants.GET_USER_REQUEST,
			isLoading: true
		}))
			.toEqual({
				loading: true
			})
	})
	it('should return user tokens', () => {
		expect(userReducer({}, {
			type: userConstants.GET_USER_SUCCESS,
			accessToken: 'accessToken',
			refreshToken: 'refreshToken'
		}))
			.toEqual({
				accessToken: 'accessToken',
				refreshToken: 'refreshToken'
			})
	})
})

describe('Player reducer', () => {
	it('should return the initial state', () => {
		expect(playerReducer(undefined, {})).toEqual({
			isPlaying: false,
			device: "",
		});
	})

	it('should set current state', () => {
		expect(playerReducer({}, {
			type: playerConstants.CURRENT,
			state: 'current state'
		}))
			.toEqual({
				current: 'current state'
			})
	})

	it('should set playing state', () => {
		expect(playerReducer({}, {
			type: playerConstants.ISPLAYING,
			state: true
		}))
			.toEqual({
				isPlaying: true
			})
	})

	it('should set the queue', () => {
		let queue = [
			'track 1',
			'track 2',
			'track 3',
		];
		expect(playerReducer({}, {
			type: playerConstants.QUEUE,
			state: queue
		}))
			.toEqual({
				queue: queue
			})
	})

	it('should set the device', () => {
		let device = {
			name: "device"
		}
		expect(playerReducer({}, {
			type: playerConstants.DEVICE,
			state: device
		}))
			.toEqual({
				device: device
			})
	})
})

describe('Sidebar reducer', () => {
	it('should return the initial state', () => {
		expect(sidebarReducer(undefined, {})).toEqual({});
	})

	it('should set the visibility', () => {
		expect(sidebarReducer({}, {
			type: sidebarConstants.VISIBILITY,
			state: true
		}))
			.toEqual({
				visibility: true
			})
	})
})