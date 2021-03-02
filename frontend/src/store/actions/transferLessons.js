import * as TYPES from '../constants/transferLessons';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr';
import {getAllStudents} from "./student";
import {getLessonsByDate} from "./lesson";

export const getAllLessons = (page, size) => dispatch => {
    dispatch({type: TYPES.TRANSFERED_LESSONS_LOADING, payload: true})
    api.get(`/transfered-lessons?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_TRANSFERED_LESSONS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.TRANSFERED_LESSONS_LOADING, payload: false})
    })
};

export const getTransferedLessonsByDate = date => dispatch => {
    dispatch({type: TYPES.TRANSFERED_LESSONS_BY_DATE_LOADING, payload: true})
    api.get(`/transfered-lessons/day/${date}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_TRANSFERED_LESSONS_BY_DATE, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.TRANSFERED_LESSONS_BY_DATE_LOADING, payload: false})
    })
};

export const createTransferLesson = lesson => dispatch => {
    api.post(`/transfered-lessons`, lesson).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                toastr.success(res.data.message);
            } else toastr.error(res.data.message);
        }
    })
}

export const getTransferLessonById = id => dispatch => {
    dispatch({type: TYPES.TRANSFERED_LESSON_BY_ID_LOADING, payload: true})
    api.get(`/transfered-lessons/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.SAVE_TRANSFERED_LESSON_BY_ID, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.TRANSFERED_LESSON_BY_ID_LOADING, payload: false})
    })
}

export const updateTransferLesson = (lesson, id) => dispatch => {
    api.put(`/transfered-lessons/${id}`, lesson).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                toastr.success(res.data.message);
            } else toastr.error(res.data.message);
        }
    })
};

export const deleteTrasferLesson = (id, page, size) => dispatch => {
    api.deleteApi(`/transfered-lessons/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                toastr.success(res.data.message);
                dispatch(getAllLessons(page, size));
            } else toastr.error(res.data.message)
        }
    })
};

export const confirmTransferedLesson = (lesson, date, transferLessonId) => dispatch => {
    api.post(`/transfered-lessons/${transferLessonId}/confirm`, lesson).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                toastr.success(res.data.message);
                dispatch(getTransferedLessonsByDate(date));
            } else toastr.error(res.data.message);
        }
    })
};

