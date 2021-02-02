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