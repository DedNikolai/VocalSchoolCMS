import * as TYPES from '../../constants/credit';

const initialState = {
    credits: {},
    creditsLoading: false,
    studentCredits: [],
};

const credits = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_CREDITS:
            return {...state, credits: action.payload}
        case TYPES.CREDITS_LOADING:
            return {...state, creditsLoading: action.payload}
        case TYPES.SAVE_STUDENT_CREDITS:
            return {...state, studentCredits: action.payload}
        default:
            return {...state}
    }
}

export default credits;