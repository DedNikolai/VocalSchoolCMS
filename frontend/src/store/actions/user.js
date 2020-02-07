import LocalStorageService from '../../services/LocalStorageService';
import * as TYPES from '../constants/user';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'

export const userSignIn = (data) => dispatch => {
    api.post('/auth/signin', data).then(res => {
        if (res.status === 200) {
            const token = res.data.accessToken;
            LocalStorageService.set(LocalStorageService.Keys.TOKEN, token);
            dispatch(getCurrentUser());
        }
    }).catch(() => {
        dispatch({type: TYPES.USER_LOADING, payload: false});
        toastr.error('Error', 'Wrong password or email!');
    })
};

export const getCurrentUser = () => dispatch => {
    dispatch({type: TYPES.USER_LOADING, payload: true})
    api.get('/users/current').then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_LOADING, payload: false})
    })
};

export const userSignOut = () => dispatch => {
    LocalStorageService.delete(LocalStorageService.Keys.TOKEN);
    dispatch({type: TYPES.SAVE_USER, payload: null});
}



