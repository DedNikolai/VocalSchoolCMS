import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {hasRoles} from '../../../utils/roles';
import {Roles} from '../../../constants/roles';
import PropTypes from 'prop-types';
import MainPage from '../MainPage/MainPage';
import Students from '../Students/Students';
import Teachers from '../Teachers/Teachers';
import ManageStudent from '../ManageStudent/ManageStudent';
import ManageTeacher from '../ManageTeachers/ManageTeacher';
import ManageUser from '../ManageUser/ManageUser';
import CreateUser from '../CreateUser/CreateUser';
import Users from '../Users/Users';
import Lessons from '../Lessons/Lessons'
import ManageLessons from '../ManageLessons/ManageLessons';
import CreateStudnet from '../CreateStudent/CreateStudent';
import CreateTeacher from '../CreateTeacher/CreateTeacher';
import CreateTransferLesson from '../CreateTransferLesson/CreateTransferLesson';
import ManageTrasferLesson from '../ManageTransferLesson/ManageTransferLesson';
import DeletedLesson from '../DeletedLesson/DeletedLesson';
import CreateDeleteLesson from '../CreateDeletedLesson/CreateDeleteLesson';
import Abonements from '../Abonements/Abonements';
import CreateAbonement from '../CreateAbonement/CreateAbonement';
import ManageAbonement from '../ManageAbonement/ManageAbonement';
import ManageConfirmedLesson from '../ManageConfirmedLesson/ManageConfirmedLesson';
import DeletedLessons from '../DeletedLessons/DeletedLessons';
import ConfirmedLessons from '../ConfirmedLessons/ConfirmedLessons';
import CreateConfirmedLesson from '../CreateConfirmedLesson/CreateConfirmedLesson';
import TransferLessons from '../TransferLessons/TransferLessons';
import Credit from '../Credit/Credits';
import Stats from '../Stats/Stats';

const teacherPermissions = [Roles.TEACHER, Roles.ADMIN, Roles.SUPER_ADMIN];
const adminPermissions = [Roles.ADMIN, Roles.SUPER_ADMIN];
const superAdmin = [Roles.SUPER_ADMIN];

function AdminRouter (props) {
    const {user} = props;

    return (
        <Switch>
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/users/edit/:id' component={ManageUser} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/users/add-new' component={CreateUser} />
            <AuthorizedRoute authorized={hasRoles(user, superAdmin)} path='/admin/users' component={Users} />
            <AuthorizedRoute authorized={hasRoles(user, superAdmin)} path='/admin/statistics' component={Stats} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/students/edit/:id' component={ManageStudent} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/students/add-new' component={CreateStudnet} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/students' component={Students} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/teachers/edit/:id' component={ManageTeacher} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/teachers/add-new' component={CreateTeacher} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/teachers' component={Teachers} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/lessons/add-new' component={ManageLessons} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/lessons/confirm/:lessonId/:date' component={CreateConfirmedLesson} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/lessons/edit/:id' component={ManageLessons} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/lessons/transfer/:id/date/:current' component={CreateTransferLesson} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/lessons/reject/:id/date/:current' component={CreateDeleteLesson} />
            {/*<AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/transfer-lessons/edit/:id' component={ManageTrasferLesson} />*/}
            {/*<AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/transfer-lessons' component={TransferLessons} />*/}
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/timetable' component={Lessons} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/deleted-lessons/:id' component={DeletedLesson} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/deleted-lessons' component={DeletedLessons} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/abonements/edit/:id' component={ManageAbonement} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/abonements/create' component={CreateAbonement} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/abonements' component={Abonements} />
            {/*<AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/credits' component={Credit} />*/}
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/confirmed-lessons/edit/:id' component={ManageConfirmedLesson} />
            <AuthorizedRoute authorized={hasRoles(user, adminPermissions)} path='/admin/confirmed-lessons' component={ConfirmedLessons} />
            <AuthorizedRoute authorized={hasRoles(user, teacherPermissions)} path='/admin' component={MainPage} />
        </Switch>
    )
}

export const AuthorizedRoute = ({component: Component, authorized, ...rest}) => (
    <Route {...rest} render={(props) => authorized
        ? <Route component={Component} {...props} />
        : <Redirect to='/admin/login' />} />
)


const mapStateToProps = ({user}) => {
    return {
        user: user.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(AdminRouter));
