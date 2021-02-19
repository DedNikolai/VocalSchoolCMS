import * as TYPES from '../constants/credit';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'
import {getLessonsByDate} from "./lesson";

export const getAllCredits = (page, size) => dispatch => {
    dispatch({type: TYPES.CREDITS_LOADING, payload: true});
    api.get(`/credits?&page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_CREDITS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.CREDITS_LOADING, payload: false})
    })
};

export const deleteCredit = (id, page, size) => dispatch => {
    api.deleteApi(`/credits/${id}`).then(res => {
        if (res.status === 200) {
            if (res.data.success) {
                toastr.success(res.data.message);
                dispatch(getAllCredits(page, size));
            } else toastr.error(res.data.message);
        }
    })
};

export const getStudentCredits = (id) => dispatch => {
    dispatch({type: TYPES.CREDITS_LOADING, payload: true});
    api.get(`/credits/student/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_STUDENT_CREDITS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.CREDITS_LOADING, payload: false})
    })
};