import * as TYPES from '../constants/transferLessons';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr';
import {getAllStudents} from "./student";

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
            toastr.success('Lesson transfered');
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
    dispatch({type: TYPES.TRANSFERED_LESSON_BY_ID_LOADING, payload: true})
    api.put(`/transfered-lessons/${id}`, lesson).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.SAVE_TRANSFERED_LESSON_BY_ID, payload: res.data})
            toastr.success('Transfer Lesson updated');
        }
    }).finally(() => {
        dispatch({type: TYPES.TRANSFERED_LESSON_BY_ID_LOADING, payload: false})
    })
}

export const deleteTrasferLesson = (id, date) => dispatch => {
    api.deleteApi(`/transfered-lessons/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            toastr.success('trasfer lesson was deleted');
            dispatch(getTransferedLessonsByDate(date));
        }
    })
}