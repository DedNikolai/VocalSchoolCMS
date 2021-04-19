import * as TYPES from '../constants/student';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'

export const getAllStudents = (page, size, param) => dispatch => {
    dispatch({type: TYPES.STUDENTS_LOADING, payload: true})
    api.get(`/students?param=${param}&page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_STUDENTS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.STUDENTS_LOADING, payload: false})
    })
};

export const getStudentById = id => dispatch => {
    dispatch({type: TYPES.STUDENT_LOADING, payload: true})
    api.get(`/students/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_STUDENT, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.STUDENT_LOADING, payload: false})
    })
};

export const updateStudent = (id, data) => dispatch => {
    dispatch({type: TYPES.STUDENT_LOADING, payload: true})
    api.put(`/students/${id}`, data).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_STUDENT, payload: res.data})
            dispatch(getAllStudents(0, 25, ''));
            toastr.success('Student was updated');
        }
    }).finally(() => {
        dispatch({type: TYPES.STUDENT_LOADING, payload: false})
    })
};

export const deleteStudent = id => dispatch => {
    api.deleteApi(`/students/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getAllStudents(0, 25, ''));
            toastr.success('Student was deleted');
        }
    })
}

export const createStudent = data => dispatch => {
    dispatch({type: TYPES.STUDENT_LOADING, payload: true})
    api.post('/students', data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getAllStudents(0, 25, ''));
            toastr.success('Student was created');
        }
    }).finally(() => dispatch({type: TYPES.STUDENT_LOADING, payload: true}))
};

export const getStudentTransfers = id => dispatch => {
    dispatch({type: TYPES.STUDENT_TRANSFERS_LOADING, payload: true})
    api.get(`/transfered-lessons/student/${id}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.LOAD_STUDENT_TRANSFERS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.STUDENT_TRANSFERS_LOADING, payload: false})
    })
};

export const getStudentsByDates = (startDate, finishDate) => dispatch => {
    dispatch({type: TYPES.STUDENT_BY_DATES_LOADING, payload: true})
    api.get(`/students/dates?startDate=${startDate}&finishDate=${finishDate}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_STUDENT_BY_DATES, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.STUDENT_BY_DATES_LOADING, payload: false})
    })
};
