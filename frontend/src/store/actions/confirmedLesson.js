import * as TYPES from '../constants/confirmedLesson';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr';
import {getLessonsByDate} from './lesson';

export const getAllLessons = (page, size) => dispatch => {
    dispatch({type: TYPES.CONFIRMED_LESSONS_LOADING, payload: true})
    api.get(`/confirmed-lessons?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_CONFIRMED_LESSONS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.CONFIRMED_LESSONS_LOADING, payload: false})
    })
};

export const createConfirmedLesson = (lesson, date) => dispatch => {
    api.post(`/confirmed-lessons`, lesson).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                toastr.success(res.data.message);
                dispatch(getLessonsByDate(date));
            } else toastr.error(res.data.message);
        }
    })
};

export const deleteConfirmedLesson = (id, page, size) => dispatch => {
    api.deleteApi(`/confirmed-lessons/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            if (res.data.success) {
                toastr.success(res.data.message);
                dispatch(getAllLessons(page, size))
            } else toastr.error(res.data.message);
        }
    })
};

export const getLessonById = (id) => dispatch => {
    dispatch({type: TYPES.CONFIRMED_LESSON_BY_ID_LOADING, payload: true})
    api.get(`/confirmed-lessons/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_CONFIRMED_LESSON_BY_ID, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.CONFIRMED_LESSON_BY_ID_LOADING, payload: false})
    })
};

export const updateConfirmedLesson = (lesson, id) => dispatch => {
    api.put(`/confirmed-lessons/${id}`, lesson).then(res => {
        if (res.status === 200) {
            if (res.data.success) {
                toastr.success(res.data.message);
            } else toastr.error(res.data.message)
        }
    })
};

export const getLessonsByDates = (startDate, finishDate) => dispatch => {
    dispatch({type: TYPES.CONFIRMED_LESSON_BY_DATES_LOADING, payload: true})
    api.get(`/confirmed-lessons/dates?startDate=${startDate}&finishDate=${finishDate}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_CONFIRMED_LESSON_BY_DATES, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.CONFIRMED_LESSON_BY_DATES_LOADING, payload: false})
    })
};
