import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import user from './user/user';
import student from './student/student';
import teacher from './teacher/teacher';
import lesson from './lesson/lesson';

const rootReducer = combineReducers({
    user: user,
    student: student,
    teacher: teacher,
    lesson: lesson,
    toastr: toastrReducer
});

export default rootReducer;