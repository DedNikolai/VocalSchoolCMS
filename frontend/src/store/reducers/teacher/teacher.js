import * as TYPES from '../../constants/teacher';

const initialState = {
    teachers: [],
    teachersLoading: true,
}

const teacher = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_ALL_TEACHERS:
            return {...state, teachers: action.payload}
        case TYPES.ALL_TEACHERS_LOADING:
            return {...state, teachersLoading: action.payload}
        default:
            return {...state}
    }
}

export default teacher;