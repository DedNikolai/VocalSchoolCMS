import * as TYPES from '../../constants/student';

const initialState = {
    students: {},
    studentsLoading: true,
    studentById: null,
    studentByIdLoading: true,
    studentTransferLessons: [],
    studentTransferLessonsLoading: false,
    studentByDates: [],
    studentByDatesLoading: true
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
        case TYPES.LOAD_STUDENT_TRANSFERS:
            return {...state, studentTransferLessons: action.payload}
        case TYPES.STUDENT_TRANSFERS_LOADING:
            return {...state, studentTransferLessonsLoading: action.payload}
        case TYPES.SAVE_STUDENT_BY_DATES:
            return {...state, studentByDates: action.payload}
        case TYPES.STUDENT_BY_DATES_LOADING:
            return {...state, studentByDatesLoading: action.payload}
        default:
            return {...state}
    }
}

export default student;