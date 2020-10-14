import * as TYPES from '../../constants/transferLessons';

const initialState = {
    transferedLessons: {},
    transferedLessonsLoading: true,
    transferedLessonsByDate: [],
    transferedLessonsByDateLoading: true,
    transferedLessonById: null,
    transferedLessonByIdLoading: true
}

const transferLessons = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_TRANSFERED_LESSONS:
            return {...state, transferedLessons: action.payload}
        case TYPES.TRANSFERED_LESSONS_LOADING:
            return {...state,transferedLessonsLoading: action.payload}
        case TYPES.SAVE_TRANSFERED_LESSONS_BY_DATE:
            return {...state, transferedLessonsByDate: action.payload}
        case TYPES.TRANSFERED_LESSONS_BY_DATE_LOADING:
            return {...state, transferedLessonsByDateLoading: action.payload}
        case TYPES.SAVE_TRANSFERED_LESSON_BY_ID:
            return {...state, transferedLessonById: action.payload}
        case TYPES.TRANSFERED_LESSON_BY_ID_LOADING:
            return {...state, transferedLessonByIdLoading: action.payload}
        default:
            return {...state}
    }
}

export default transferLessons;