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
import TableRow from '@material-ui/core/TableRow';
import {NavLink} from 'react-router-dom';
import AddButton from  '../../../components/TableButtons/AddButton/AddButton';
import './Teacher.scss';
import {getAllTeachers, deleteTeacher} from "../../../store/actions/teacher";
import Preloader from '../../../components/Preloader/index';
import TeacherTableRow from './TeacherTableRow/TeacherTableRow';

const columns = [
    { id: 'firstName', label: 'Ім\'я', minWidth: 150, align: 'left' },
    { id: 'lastName', label: 'Прізвище', minWidth: 150, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 150, align: 'left' },
    { id: 'disciplines', label: 'Дисципліни', minWidth: 150, align: 'left' },
    { id: 'students', label: 'Кількість Студентів', minWidth: 50, align: 'center' },
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

function Teachers(props) {
    const classes = useStyles();
    const {teachers, teachersLoading, getAllTeachers, deleteTeacher} = props;

    useEffect(() => {
        getAllTeachers();
    }, []);

    return (
        <div className='teachers-list'>
            <div className='teachers-list__top-block'>
                <NavLink to='/admin/teachers/edit'>
                    <AddButton/>
                </NavLink>
            </div>
            {
                teachersLoading ?
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
                                    {teachers.map(teacher =>
                                        <TeacherTableRow
                                            columns={columns}
                                            teacher={teacher}
                                            key={teacher.id}
                                            deleteTeacher={id => deleteTeacher(id)}
                                        />)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
            }
        </div>
    );
}

Teachers.propTypes = {
    teachers: PropTypes.array,
    teachersLoading: PropTypes.bool.isRequired,
    getAllTeachers: PropTypes.func.isRequired,
    deleteTeacher: PropTypes.func.isRequired,
};

Teachers.defaultProps = {
    teachers: [],
}

const mapStateToProps = ({teacher}) => {
    return {
        teachers: teacher.teachers,
        teachersLoading: teacher.teachersLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getAllTeachers: () => dispatch(getAllTeachers()),
    deleteTeacher: (id) => dispatch(deleteTeacher(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
