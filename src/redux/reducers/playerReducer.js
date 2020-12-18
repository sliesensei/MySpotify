import { playerConstants } from '../constants/playerConstants';

let localDevice = localStorage.getItem('device');

let initialState = {};
if (localDevice) {
    initialState = {
        isPlaying: false,
        device: localDevice

    };
}
else {
    initialState = {
        isPlaying: false,
        device: "",
    };
}

export default function player(state = initialState, action) {
    switch (action.type) {
        case playerConstants.CURRENT:
            return { ...state, current: action.state }
        case playerConstants.ISPLAYING:
            return { ...state, isPlaying: action.state }
        case playerConstants.QUEUE:
            return { ...state, queue: action.state }
        case playerConstants.DEVICE:
            return { ...state, device: action.state }
        default:
            return state
    }
}