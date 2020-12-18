import { searchConstants } from '../constants/searchConstants';

let localSearch = localStorage.getItem('search');

let initialState = {};
if (localSearch) {
    initialState = {
        lastsearch: localSearch
    };
}
else {
    initialState = {
        lastsearch: ""
    };
}

export default function search(state = initialState, action) {
    switch (action.type) {
        case searchConstants.LASTSEARCH:
            return { ...state, lastsearch: action.state }
        case searchConstants.LASTRESULTSEARCH:
            return { ...state, lastresult: action.state }
        default:
            return state
    }
}