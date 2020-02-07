import * as TYPES from '../../constants/user';

const initialState = {
    currentUser: null,
    currentUserLoading: false,
    authLoading: false,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.USER_LOADING:
            return {...state, currentUserLoading: action.payload}
        case TYPES.SAVE_USER:
            return {...state, currentUser: action.payload}
        case TYPES.AUTH_LOADING:
            return {...state, authLoading: action.payload}
        default:
            return {...state}
    }
}

export default user;