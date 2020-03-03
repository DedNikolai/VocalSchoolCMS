import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import {hasRoles} from '../../utils/roles';
import {Roles} from '../../constants/roles';
import {connect} from 'react-redux';
import SchoolIcon from '@material-ui/icons/School';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './Menu.scss';

const teacherPermissions = [Roles.TEACHER, Roles.ADMIN, Roles.SUPER_ADMIN];
const adminPermissions = [Roles.ADMIN, Roles.SUPER_ADMIN];
const superAdmin = [Roles.SUPER_ADMIN];

function Menu(props) {
    const {user} = props;
    return (
        <div className='main-menu'>
            <NavLink to='/admin' className='main-menu__item'>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Головна" />
                </ListItem>
            </NavLink>
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/lessons' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <ScheduleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Урокы" />
                    </ListItem>
                </NavLink>
            }
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/students' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Учні" />
                    </ListItem>
                </NavLink>
            }
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/teachers' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Вчителі" />
                    </ListItem>
                </NavLink>
            }
        </div>
    )
};

Menu.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = ({user}) => {
    return {
        user: user.currentUser
    }
}

export default connect(mapStateToProps)(Menu);