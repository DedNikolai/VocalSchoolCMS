import * as TYPES from '../constants/lessons';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'

export const getAllLessons = () => dispatch => {
    dispatch({type: TYPES.LESSONS_LOADING, payload: true})
    api.get('/lessons').then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_LESSONS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.LESSONS_LOADING, payload: false})
    })
};

export const getLessonById = id => dispatch => {
    dispatch({type: TYPES.LESSON_LOADING, payload: true})
    api.get(`/lessons/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_LESSON, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.LESSON_LOADING, payload: false})
    })
};

export const updateLesson = (id, data) => dispatch => {
    dispatch({type: TYPES.LESSON_LOADING, payload: true})
    api.put(`/lessons/${id}`, data).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_LESSON, payload: res.data})
            toastr.success('Lesson was updated');
        }
    }).finally(() => {
        dispatch({type: TYPES.LESSON_LOADING, payload: false})
    })
};

export const deleteLesson = (id) => dispatch => {
    api.deleteApi(`/lessons/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getLessonsByStudent(res.data.student.id));
            toastr.success('Lesson was deleted');
        }
    })
}

export const createLesson = (data) => dispatch => {
    dispatch({type: TYPES.LESSON_LOADING, payload: true})
    api.post('/lessons', data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getLessonsByStudent(res.data.student.id));
            toastr.success('Lesson was created');
        }
    }).finally(() => dispatch({type: TYPES.LESSON_LOADING, payload: true}))
}

export const getLessonsByStudent = (id) => dispatch => {
    dispatch({type: TYPES.LESSONS_BY_STUDENT_LOADING, payload: true})
    api.get(`/lessons/student/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_LESSONS_BY_STUDENT, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.LESSONS_BY_STUDENT_LOADING, payload: false})
    })
};

export const getLessonsByDate = day => dispatch => {
    dispatch({type: TYPES.LESSONS_BY_DATE_LOADING, payload: true})
    api.get(`/lessons/day/${day}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_LESSONS_BY_DATE, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.LESSONS_BY_DATE_LOADING, payload: false})
    })
};

export const getLessonsByDay = day => dispatch => {
    dispatch({type: TYPES.LESSONS_BY_DAY_LOADING, payload: true})
    api.get(`/lessons/lessonDay/${day}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_LESSONS_BY_DAY, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.LESSONS_BY_DAY_LOADING, payload: false})
    })
}