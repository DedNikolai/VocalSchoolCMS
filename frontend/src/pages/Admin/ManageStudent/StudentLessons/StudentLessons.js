import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
import {deleteLesson} from "../../../../store/actions/lesson";

const columns = [
    { id: 'teacher', label: 'Вчитель', minWidth: 150, align: 'center' },
    { id: 'room', label: 'Клас', minWidth: 150, align: 'center' },
    { id: 'discipline', label: 'Дисципліна', minWidth: 50, align: 'center' },
    { id: 'type', label: 'Тип', minWidth: 50, align: 'center' },
    { id: 'day', label: 'День', minWidth: 50, align: 'center' },
    { id: 'time', label: 'Час', minWidth: 50, align: 'center' },
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

function StudentLessons(props) {
    const classes = useStyles();
    const {lessons, deleteLessonById, studentId} = props;

    return (
        <div className='students-list'>
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
                                    {lessons.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                <IconButton>
                                                                    <NavLink to={`/admin/lessons/edit/${row.id}`}>
                                                                        <Edit/>
                                                                    </NavLink>
                                                                </IconButton>
                                                                <IconButton>
                                                                    <DeleteOutline onClick={() => deleteLessonById(row.id, studentId)}/>
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'teacher') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                {row.teacher ? row.teacher.firstName + ' ' + row.teacher.lastName : ''}
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
        </div>
    );
}

StudentLessons.propTypes = {
    lessons: PropTypes.array,
    deleteLessonById: PropTypes.func.isRequired,
};

StudentLessons.defaultProps = {
    lessons: [],
}

const mapStateToProps = ({}) => {
    return {

    }
};

const mapDispatchToProps = dispatch => ({
    deleteLessonById: (id, studentId) => dispatch(deleteLesson(id, studentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentLessons);
