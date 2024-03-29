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
import FaceIcon from '@material-ui/icons/Face';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ua from '../../languages/ua';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EqualizerIcon from '@material-ui/icons/Equalizer';
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
                    <ListItemText primary={ua.menu.main} />
                </ListItem>
            </NavLink>
            {
                hasRoles(user, superAdmin) &&
                <NavLink to='/admin/users' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={ua.menu.users} />
                    </ListItem>
                </NavLink>
            }
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/timetable' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={ua.menu.timetable} />
                    </ListItem>
                </NavLink>
            }
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/students' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText primary={ua.menu.students} />
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
                        <ListItemText primary={ua.menu.teachers} />
                    </ListItem>
                </NavLink>
            }
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/abonements' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary={ua.menu.abonements} />
                    </ListItem>
                </NavLink>
            }
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/confirmed-lessons' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary={ua.menu.confirmedLessons} />
                    </ListItem>
                </NavLink>
            }
            {/*{*/}
                {/*hasRoles(user, adminPermissions) &&*/}
                {/*<NavLink to='/admin/transfer-lessons' className='main-menu__item'>*/}
                    {/*<ListItem button>*/}
                        {/*<ListItemIcon>*/}
                            {/*<ArrowForwardIcon />*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={ua.menu.transferLessons} />*/}
                    {/*</ListItem>*/}
                {/*</NavLink>*/}
            {/*}*/}
            {
                hasRoles(user, adminPermissions) &&
                <NavLink to='/admin/deleted-lessons' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <CancelIcon />
                        </ListItemIcon>
                        <ListItemText primary={ua.menu.deleted} />
                    </ListItem>
                </NavLink>
            }
            {/*{*/}
                {/*hasRoles(user, adminPermissions) &&*/}
                {/*<NavLink to='/admin/credits' className='main-menu__item'>*/}
                    {/*<ListItem button>*/}
                        {/*<ListItemIcon>*/}
                            {/*<CreditCardIcon />*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={ua.menu.credits} />*/}
                    {/*</ListItem>*/}
                {/*</NavLink>*/}
            {/*}*/}
            {
                hasRoles(user, superAdmin) &&
                <NavLink to='/admin/statistics' className='main-menu__item'>
                    <ListItem button>
                        <ListItemIcon>
                            <EqualizerIcon />
                        </ListItemIcon>
                        <ListItemText primary={ua.menu.statistics} />
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