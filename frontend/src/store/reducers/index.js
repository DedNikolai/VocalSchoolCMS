import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import user from './user/user';
import student from './student/student';
import teacher from './teacher/teacher';
import lesson from './lesson/lesson';
import confirmedLessons from './confirmedLesson/confirmedLesson';

const rootReducer = combineReducers({
    user: user,
    student: student,
    teacher: teacher,
    lesson: lesson,
    confirmedLessons: confirmedLessons,
    toastr: toastrReducer
});

export default rootReducer;