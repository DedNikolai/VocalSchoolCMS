import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Search from '../../../components/Search/Search';
import AddButton from  '../../../components/TableButtons/AddButton/AddButton';
import './Students.scss';
import {getAllStudents, deleteStudent} from "../../../store/actions/student";
import Preloader from '../../../components/Preloader/index';
import {rowsPerPage} from '../../../constants/view';

const columns = [
    { id: 'firstName', label: 'Ім\'я', minWidth: 150, align: 'left' },
    { id: 'lastName', label: 'Прізвище', minWidth: 150, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 150, align: 'left' },
    { id: 'payBalance', label: 'Баланс', minWidth: 50, align: 'center' },
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

function Students(props) {
    const classes = useStyles();
    const {students, studentsLoading, getAllStudents, deleteStudent} = props;
    const {content = [], totalElements, number} = students;
    const [param, setParam] = useState('');

    useEffect(() => {
        getAllStudents(0, rowsPerPage, param);
    }, []);

    const handleChangePage = (event, page) => {
        getAllStudents(page, rowsPerPage, param);
    };

    return (
        <div className='students-list'>
            <div className='students-list__top-block'>
                <Search
                    searchParam={param}
                    setSearchParam={value => setParam(value)}
                    search={(param) => getAllStudents(0, rowsPerPage, param)}
                />
                <NavLink to='/admin/students/edit'>
                    <AddButton/>
                </NavLink>
            </div>
            {
                studentsLoading ?
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
                                    {content.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                <NavLink to={`/admin/students/${row.id}`}>
                                                                    <IconButton>
                                                                        <NavLink to={`/admin/students/edit/${row.id}`}>
                                                                            <Edit/>
                                                                        </NavLink>
                                                                    </IconButton>
                                                                </NavLink>
                                                                <IconButton>
                                                                    <DeleteOutline onClick={() => deleteStudent(row.id)}/>
                                                                </IconButton>
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
                        <TablePagination
                            rowsPerPageOptions={[rowsPerPage]}
                            component="div"
                            count={totalElements}
                            rowsPerPage={rowsPerPage}
                            page={number}
                            onChangePage={handleChangePage}
                        />
                    </Paper>
            }
        </div>
    );
}

Students.propTypes = {
    students: PropTypes.object,
    studentsLoading: PropTypes.bool.isRequired,
    getAllStudents: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
};

Students.defaultProps = {
    students: {},
}

const mapStateToProps = ({student}) => {
    return {
        students: student.students,
        studentsLoading: student.studentsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getAllStudents: (page, size, param) => dispatch(getAllStudents(page, size, param)),
    deleteStudent: (id) => dispatch(deleteStudent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
