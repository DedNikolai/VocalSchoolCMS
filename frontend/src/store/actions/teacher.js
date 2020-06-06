import * as TYPES from '../constants/teacher';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'

export const getAllTeachers = () => dispatch => {
    dispatch({type: TYPES.ALL_TEACHERS_LOADING, payload: {teachersLoading: true}})
    api.get('/teachers').then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_TEACHERS, payload: {allTeachers: res.data}})
        }
    }).finally(() => {
        dispatch({type: TYPES.ALL_TEACHERS_LOADING, payload: {teachersLoading: false}})
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
    }).finally(() => dispatch({type: TYPES.TEACHER_LOADING, payload: false}))
}

export const createWorkTime = (data, id) => dispatch => {
    api.post(`/worktimes/teacher/${id}`, data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getTeacherById(id))
            toastr.success('Time was created');
        }
    })
}

export const updateWorkTime = (data, timeId, teacherId) => dispatch => {
    api.put(`/worktimes/${timeId}`, data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getTeacherById(teacherId))
            toastr.success('Time was updated');
        }
    })
}

export const deleteWorkTime = (timeId, teacherId) => dispatch => {
    api.deleteApi(`/worktimes/${timeId}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getTeacherById(teacherId));
            toastr.success('Time was deleted');
        }
    })
}

export const createTeacherPrice = (data, teacherId) => dispatch => {
    api.post(`/prices/teacher/${teacherId}`, data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getTeacherById(teacherId));
            toastr.success('Price was created');
        }
    })
}

export const updateTeacherPrice = (data, priceId, teacherId) => dispatch => {
    console.log(data)
    api.put(`/prices/${priceId}/teacher/${teacherId}`, data).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getTeacherById(teacherId));
            toastr.success('Price was updated');
        }
    })
}

export const deletePrice = (priceId, teacherId) => dispatch => {
    api.deleteApi(`/prices/${priceId}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch(getTeacherById(teacherId));
            toastr.success('Price was deleted');
        }
    })
}
