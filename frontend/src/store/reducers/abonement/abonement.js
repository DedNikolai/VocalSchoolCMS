import * as TYPES from '../../constants/abonement';

const initialState = {
    abonements: {},
    abonementsLoading: true,
    abonementById: {},
    abonementByIdLoading: true,
    abonementsByStudent: [],
    abonementsByStudentLoading: true,
    abonementsByDates: [],
    abonementsByDatesLoading: true
};

const abonement = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_ABONEMENTS:
            return {...state, abonements: action.payload}
        case TYPES.ABONEMENTS_LOADING:
            return {...state, abonementsLoading: action.payload}
        case TYPES.SAVE_ABONEMENT:
            return {...state, abonementById: action.payload}
        case TYPES.ABONEMENT_LOADING:
            return {...state, abonementByIdLoading: action.payload}
        case TYPES.SAVE_ABONEMENTS_BY_STUDENT:
            return {...state, abonementsByStudent: action.payload}
        case TYPES.ABONEMENTS_BY_STUDENT_LOADING:
            return {...state, abonementsByStudentLoading: action.payload}
        case TYPES.SAVE_ABONEMENTS_BY_DATES:
            return {...state, abonementsByDates: action.payload}
        case TYPES.ABONEMENTS_BY_DATES_LOADING:
            return {...state, abonementsByDatesLoading: action.payload}
        default:
            return {...state}
    }
};

export default abonement;