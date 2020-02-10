import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import {hasRoles} from '../../utils/roles';
import {Roles} from '../../constants/roles';
import {connect} from 'react-redux';
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
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Головна" />
                </ListItem>
            </NavLink>
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/lessons' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCartIcon />
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
                hasRoles(user, superAdmin) &&
                <NavLink to='/admin/reports' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Звіти" />
                    </ListItem>
                </NavLink>
            }
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/teachers' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <LayersIcon />
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