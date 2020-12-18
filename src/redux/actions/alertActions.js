import { alertConstants } from '../constants/alertConstants';
import { toastr } from 'react-redux-toastr';

export const alertActions = {
    success,
    successToast,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function successToast(message) {
    toastr.success('Success', message)
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    toastr.error('Error', message)
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}