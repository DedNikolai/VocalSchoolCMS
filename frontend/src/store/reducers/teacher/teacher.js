import * as TYPES from '../../constants/teacher';

const initialState = {
    teachers: [],
    teachersLoading: true,
    teacherById: null,
    teacherByIdLoading: true,
    teachersByDiscipline: [],
    teachersByDisciplineLoading: true,
    teachersConfirmedLessons: [],
    teachersConfirmedLessonsLoading: true,
};

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
        case TYPES.SAVE_TEACHERS_BY_DISCIPLINE:
            return {...state, teachersByDiscipline: action.payload.teachersByDiscipline}
        case TYPES.TEACHERS_BY_DISCIPLINE_LOADING:
            return {...state, teachersByDisciplineLoading: action.payload.teachersByDisciplineLoading}
        case TYPES.TEACHERS_CONFIRMED_LESSONS_LOADING:
            return {...state, teachersConfirmedLessonsLoading: action.payload}
        case TYPES.SAVE_TEACHERS_CONFIRMED_LESSONS:
            return {...state, teachersConfirmedLessons: action.payload}
        default:
            return {...state}
    }
}

export default teacher;