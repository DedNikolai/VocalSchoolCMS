import * as TYPES from '../constants/teacher';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'
import {getAllStudents} from "./student";

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

export const getTeacherById = id => dispatch => {
    dispatch({type: TYPES.TEACHER_LOADING, payload: true})
    api.get(`/teachers/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_TEACHER, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.TEACHER_LOADING, payload: false})
    })
};

export const updateTeacher = (id, data) => dispatch => {
    dispatch({type: TYPES.TEACHER_LOADING, payload: true})
    api.put(`/teachers/${id}`, data).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_TEACHER, payload: res.data})
            dispatch(getAllTeachers());
            toastr.success('Teacher was updated');
        }
    }).finally(() => {
        dispatch({type: TYPES.TEACHER_LOADING, payload: false})
    })
};

export const deleteTeacher = id => dispatch => {
    api.deleteApi(`/teachers/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getAllTeachers());
            toastr.success('Teacher was deleted');
        }
    })
}

export const createTeacher = data => dispatch => {
    dispatch({type: TYPES.TEACHER_LOADING, payload: true})
    api.post('/teachers', data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getAllTeachers());
            toastr.success('Teacher was created');
        }
    }).finally(() => dispatch({type: TYPES.TEACHER_LOADING, payload: true}))
}
