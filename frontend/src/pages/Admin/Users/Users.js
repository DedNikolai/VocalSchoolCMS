import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '../../../components/TableButtons/AddButton/AddButton';
import './Users.scss';
import {deleteUser, getAllUsers} from "../../../store/actions/user";
import Preloader from '../../../components/Preloader';
import ua from '../../../languages/ua';

const columns = [
    { id: 'email', label: 'Email', minWidth: 150, align: 'left' },
    { id: 'roles', label: 'Рівні доступа', minWidth: 150, align: 'center' },
    { id: 'actions', label: 'Дії', minWidth: 50, align: 'center' },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#fff'
    },
    container: {
        maxHeight: 440,
    },

    cell: {
        padding: '2px',
        textAlign: 'center'
    },

    headCell: {
        backgroundColor: '#fff',
        fontWeight: 'bold'
    },
});

function Users(props) {
    const classes = useStyles();
    const {allUsers, usersLoading, getUsers, deleteUser} = props;

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className='students-list'>
            <div className='students-list__top-block'>
                <h1>{ua.pages.users.title}</h1>
                <NavLink to='/admin/users/add-new'>
                    <AddButton/>
                </NavLink>
            </div>
            {
                usersLoading ?
                    <div className="wrapper"><Preloader/></div>
                    :
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map(column => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                className={classes.headCell}
                                                style={{ minWidth: column.minWidth, textAlign: column.align}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allUsers.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                <IconButton>
                                                                    <NavLink to={`/admin/users/edit/${row.id}`}>
                                                                        <Edit/>
                                                                    </NavLink>
                                                                </IconButton>
                                                                <IconButton onClick={() => deleteUser(row.id)}>
                                                                    <DeleteOutline/>
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'roles') {
                                                        return (
                                                            <TableCell className={classes.cell} key={row.id}>
                                                                {row.roles ? row.roles.join(', ') : ''}
                                                            </TableCell>
                                                        )
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
            }
        </div>
    );
}

Users.defaultProps = {
    allUsers: [],
}

const mapStateToProps = ({user}) => {
    return {
        allUsers: user.allUsers,
        usersLoading: user.usersLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getAllUsers()),
    deleteUser: (id) => dispatch(deleteUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
