import * as TYPES from '../constants/deletedLesson';
import api from '../api/FetchData';
import {getLessonsByDate} from './lesson';
import {toastr} from 'react-redux-toastr';

export const getAllLessons = (page, size) => dispatch => {
    dispatch({type: TYPES.DELETED_LESSONS_LOADING, payload: true})
    api.get(`/deleted-lessons?page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_DELETED_LESSONS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.DELETED_LESSONS_LOADING, payload: false})
    })
};

export const getDeletedLessonById = id => dispatch => {
    dispatch({type: TYPES.DELETED_LESSON_BY_ID_LOADING, payload: true});
    api.get(`/deleted-lessons/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_DELETED_LESSON_BY_ID, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.DELETED_LESSON_BY_ID_LOADING, payload: false});
    })
}

export const rejectLesson = (lesson, date) => dispatch => {
    api.post(`/deleted-lessons`, lesson).then(res => {
        if (res.status >= 200 && res.status < 300) {
            toastr.success('Lesson rejected');
        }
    })
};
