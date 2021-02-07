import * as TYPES from '../../constants/abonement';

const initialState = {
    abonements: {},
    abonementsLoading: true,
    abonementById: {},
    abonementByIdLoading: true,
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
        default:
            return {...state}
    }
}

export default abonement;