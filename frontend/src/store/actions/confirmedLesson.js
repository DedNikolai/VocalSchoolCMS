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
            toastr.success('Lesson confirmed');
            dispatch(getLessonsByDate(date));
        }
    })
};

export const deleteConfirmedLesson = (id, page, size) => dispatch => {
    api.deleteApi(`/confirmed-lessons/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            toastr.success('Lesson deleted');
            dispatch(getAllLessons(page, size))
        }
    })
};