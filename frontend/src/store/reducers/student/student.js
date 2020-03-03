import * as TYPES from '../../constants/student';

const initialState = {
    students: {},
    studentsLoading: true,
    studentById: null,
    studentByIdLoading: true,
}

const student = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SAVE_STUDENTS:
            return {...state, students: action.payload}
        case TYPES.STUDENTS_LOADING:
            return {...state, studentsLoading: action.payload}
        case TYPES.SAVE_STUDENT:
            return {...state, studentById: action.payload}
        case TYPES.STUDENT_LOADING:
            return {...state, studentByIdLoading: action.payload}
        default:
            return {...state}
    }
}

export default student;