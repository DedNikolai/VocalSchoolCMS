import * as TYPES from '../../constants/lessons';

const initialState = {
    lessons: {},
    lessonsLoading: true,
    lessonById: null,
    lessonByIdLoading: true,
    lessonsByStudent: [],
    lessonsByStudentLoading: true,
}

const lesson = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_LESSONS:
            return {...state, lessons: action.payload}
        case TYPES.LESSONS_LOADING:
            return {...state,lessonsLoading: action.payload}
        case TYPES.SAVE_LESSON:
            return {...state, lessonById: action.payload}
        case TYPES.LESSON_LOADING:
            return {...state, lessonByIdLoading: action.payload}
        case TYPES.SAVE_LESSONS_BY_STUDENT:
            return {...state, lessonsByStudent: action.payload}
        case TYPES.LESSONS_BY_STUDENT_LOADING:
            return {...state, lessonsByStudentLoading: action.payload}
        default:
            return {...state}
    }
}

export default lesson;