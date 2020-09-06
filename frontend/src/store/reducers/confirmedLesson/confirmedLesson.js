import * as TYPES from '../../constants/confirmedLesson';

const initialState = {
    lessons: {},
    lessonsLoading: true,
}

const confirmedLessons = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_CONFIRMED_LESSONS:
            return {...state, lessons: action.payload}
        case TYPES.CONFIRMED_LESSONS_LOADING:
            return {...state,lessonsLoading: action.payload}
        default:
            return {...state}
    }
}

export default confirmedLessons;