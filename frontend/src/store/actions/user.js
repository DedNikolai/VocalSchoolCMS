import LocalStorageService from '../../services/LocalStorageService';
import * as TYPES from '../constants/user';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'

export const userSignIn = (data) => dispatch => {
    dispatch({type: TYPES.AUTH_LOADING, payload: true})
    api.post('/auth/signin', data).then(res => {
        dispatch({type: TYPES.AUTH_LOADING, payload: false})
        if (res.status === 200) {
            const token = res.data.accessToken;
            LocalStorageService.set(LocalStorageService.Keys.TOKEN, token);
            dispatch(getCurrentUser());
        }
    }).catch(() => {
        dispatch({type: TYPES.USER_LOADING, payload: false});
        toastr.error('Error', 'Wrong password or email!');
    }).finally(() => {
        dispatch({type: TYPES.AUTH_LOADING, payload: false})
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
};

export const getAllUsers = () => dispatch => {
    dispatch({type: TYPES.ALL_USERS_LOADING, payload: {usersLoading: true}})
    api.get('/users').then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_ALL_USERS, payload: {allUsers: res.data}})
        }
    }).finally(() => {
        dispatch({type: TYPES.ALL_USERS_LOADING, payload: {usersLoading: false}})
    })
};

export const getUserById = id => dispatch => {
    dispatch({type: TYPES.USER_BY_ID_LOADING, payload: true})
    api.get(`/users/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER_BY_ID, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_BY_ID_LOADING, payload: false})
    })
};

export const updateUser = (id, data) => dispatch => {
    dispatch({type: TYPES.USER_BY_ID_LOADING, payload: true})
    api.put(`/users/${id}`, data).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_USER_BY_ID, payload: res.data})
            dispatch(getAllUsers());
            toastr.success('User was updated');
        }
    }).finally(() => {
        dispatch({type: TYPES.USER_BY_ID_LOADING, payload: false})
    })
};

export const deleteUser = id => dispatch => {
    api.deleteApi(`/users/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getAllUsers());
            toastr.success('User was deleted');
        }
    })
};

export const createUser = data => dispatch => {
    dispatch({type: TYPES.USER_BY_ID_LOADING, payload: true})
    api.post('/users', data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getAllUsers());
            toastr.success('User was created');
        }
    }).finally(() => dispatch({type: TYPES.USER_BY_ID_LOADING, payload: true}))
};



