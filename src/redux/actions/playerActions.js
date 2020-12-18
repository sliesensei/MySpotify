import { playerConstants } from "../constants/playerConstants";

export const playerActions = {
	setPlayerState, 
	setIsPlayingMusic,
	setDevice
};

function setPlayerState(state) {
	return dispatch => {
		dispatch({ type: playerConstants.CURRENT, state });
	}
}

function setIsPlayingMusic(state) {
	return dispatch => {
		dispatch({ type: playerConstants.ISPLAYING, state });
	}
}

function setDevice(state) {
	localStorage.setItem('device', state);
	return dispatch => {
		dispatch({ type: playerConstants.DEVICE, state });
	}
}