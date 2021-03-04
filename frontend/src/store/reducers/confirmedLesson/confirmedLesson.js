import * as TYPES from '../../constants/confirmedLesson';

const initialState = {
    lessons: {},
    lessonsLoading: true,
    confirmedLesson: {},
    confirmedLessonLoading: true
}

const confirmedLessons = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_CONFIRMED_LESSONS:
            return {...state, lessons: action.payload}
        case TYPES.CONFIRMED_LESSONS_LOADING:
            return {...state,lessonsLoading: action.payload}
        case TYPES.CONFIRMED_LESSON_BY_ID_LOADING:
            return {...state, confirmedLessonLoading: action.payload}
        case TYPES.SAVE_CONFIRMED_LESSON_BY_ID:
            return {...state,confirmedLesson: action.payload}
        default:
            return {...state}
    }
}

export default confirmedLessons;