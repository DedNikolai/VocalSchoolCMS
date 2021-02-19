import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import user from './user/user';
import student from './student/student';
import teacher from './teacher/teacher';
import lesson from './lesson/lesson';
import confirmedLessons from './confirmedLesson/confirmedLesson';
import transferLessons from './transferLessons/transferLessons';
import deletedLessons from './deletedLesson/deletedLesson';
import abonement from './abonement/abonement';
import credit from './credit/credit';

const rootReducer = combineReducers({
    user: user,
    student: student,
    teacher: teacher,
    lesson: lesson,
    confirmedLessons: confirmedLessons,
    transferLessons: transferLessons,
    deletedLessons: deletedLessons,
    abonement: abonement,
    credit: credit,
    toastr: toastrReducer
});

export default rootReducer;