import * as TYPES from '../constants/abonement';
import api from '../api/FetchData';
import {toastr} from 'react-redux-toastr'

export const getAllAbonements = (page, size, param) => dispatch => {
    dispatch({type: TYPES.ABONEMENTS_LOADING, payload: true});
    api.get(`/abonements?param=${param}&page=${page}&size=${size}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_ABONEMENTS, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.ABONEMENTS_LOADING, payload: false})
    })
};

export const createAbonement = (abonement) => dispatch => {
    api.post('/abonements', abonement).then(res => {
        if (res.status >= 200 && res.status < 300) {
            toastr.success('Abonement was created');
        }
    })
};

export const updateAbonement = (abonement, id) => dispatch => {
    dispatch({type: TYPES.ABONEMENT_LOADING, payload: true});
    api.put(`/abonements/${id}`, abonement).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.SAVE_ABONEMENT, payload: res.data})
            toastr.success('Abonement was created');
        }
    }).finally(() => {
        dispatch({type: TYPES.ABONEMENT_LOADING, payload: false});
    })
};

export const getAbonementById = id => dispatch => {
    dispatch({type: TYPES.ABONEMENT_LOADING, payload: true});
    api.get(`/abonements/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.SAVE_ABONEMENT, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.ABONEMENT_LOADING, payload: false});
    })
};

export const deleteAbonement = (id, page, size) => dispatch => {
    api.deleteApi(`/abonements/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            console.log(res)
            if (res.data.success) {
                dispatch(getAllAbonements(page, size));
                toastr.success(res.data.message);
            } else toastr.error(res.data.message)
        }
    })
};

export const getAbonementsByStudent = id => dispatch => {
    dispatch({type: TYPES.ABONEMENTS_BY_STUDENT_LOADING, payload: true});
    api.get(`/abonements/student/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            dispatch({type: TYPES.SAVE_ABONEMENTS_BY_STUDENT, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.ABONEMENTS_BY_STUDENT_LOADING, payload: false});
    })
};

export const getAbonementsByDates = (startDate, finishDate) => dispatch => {
    dispatch({type: TYPES.ABONEMENTS_BY_DATES_LOADING, payload: true});
    api.get(`/abonements/dates?startDate=${startDate}&finishDate=${finishDate}`).then(res => {
        if (res.status === 200) {
            dispatch({type: TYPES.SAVE_ABONEMENTS_BY_DATES, payload: res.data})
        }
    }).finally(() => {
        dispatch({type: TYPES.ABONEMENTS_BY_DATES_LOADING, payload: false})
    })
};
