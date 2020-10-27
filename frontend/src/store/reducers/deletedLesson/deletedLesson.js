import * as TYPES from '../../constants/deletedLesson';

const initialState = {
    lessons: {},
    lessonsLoading: true,
    deletedLessonById: {},
    deletedLessonByIdLoading: true,
}

const deletedLessons = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_DELETED_LESSONS:
            return {...state, lessons: action.payload}
        case TYPES.DELETED_LESSONS_LOADING:
            return {...state, lessonsLoading: action.payload}
        case TYPES.SAVE_DELETED_LESSON_BY_ID:
            return {...state, deletedLessonById: action.payload}
        case TYPES.DELETED_LESSON_BY_ID_LOADING:
            return {...state, deletedLessonByIdLoading: action.payload}
        default:
            return {...state}
    }
}

export default deletedLessons;