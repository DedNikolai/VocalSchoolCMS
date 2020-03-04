import * as TYPES from '../constants/teacher';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'

export const getAllTeachers = () => dispatch => {
    dispatch({type: TYPES.ALL_TEACHERS_LOADING, payload: true})
    api.get('/teachers').then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_ALL_TEACHERS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.ALL_TEACHERS_LOADING, payload: false})
    })
};

