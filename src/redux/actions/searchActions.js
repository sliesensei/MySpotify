import { searchConstants } from "../constants/searchConstants";

export const searchActions = {
	setLastSearch,
	setLastResultSearch
};

function setLastSearch(state) {
	localStorage.setItem('search', state);
	return dispatch => {
		dispatch({ type: searchConstants.LASTSEARCH, state });
	}
}

function setLastResultSearch(state) {
	return dispatch => {
		dispatch({ type: searchConstants.LASTRESULTSEARCH, state });
	}
}