import * as TYPES from '../../constants/user';

const initialState = {
    currentUser: null,
    currentUserLoading: true,
    authLoading: false,
    allUsers: [],
    usersLoading: true,
    userById: null,
    userByIdLoading: true,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.USER_LOADING:
            return {...state, currentUserLoading: action.payload}
        case TYPES.SAVE_USER:
            return {...state, currentUser: action.payload}
        case TYPES.AUTH_LOADING:
            return {...state, authLoading: action.payload}
        case TYPES.ALL_USERS_LOADING:
            return {...state, usersLoading: action.payload.usersLoading}
        case TYPES.SAVE_ALL_USERS:
            return {...state, allUsers: action.payload.allUsers}
        case TYPES.USER_BY_ID_LOADING:
            return {...state, userByIdLoading: action.payload}
        case TYPES.SAVE_USER_BY_ID:
            return {...state, userById: action.payload}
        default:
            return {...state}
    }
}

export default user;