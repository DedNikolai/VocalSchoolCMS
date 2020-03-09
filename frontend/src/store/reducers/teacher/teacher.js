import * as TYPES from '../../constants/teacher';

const initialState = {
    teachers: [],
    teachersLoading: true,
    teacherById: null,
    teacherByIdLoading: true,
}

const teacher = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_TEACHERS:
            return {...state, teachers: action.payload.allTeachers}
        case TYPES.ALL_TEACHERS_LOADING:
            return {...state, teachersLoading: action.payload.teachersLoading}
        case TYPES.SAVE_TEACHER:
            return {...state, teacherById: action.payload}
        case TYPES.TEACHER_LOADING:
            return {...state, teacherByIdLoading: action.payload}
        default:
            return {...state}
    }
}

export default teacher;