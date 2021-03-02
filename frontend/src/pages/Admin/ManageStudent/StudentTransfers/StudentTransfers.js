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
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import {getLessonsByDate, deleteTrasferLesson, confirmTransferedLesson} from "../../../../store/actions/transferLessons";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import {NavLink} from 'react-router-dom';

const columns = [
    { id: 'discipline', label: 'Дисципліна', minWidth: 150, align: 'left' },
    { id: 'teacher', label: 'Вчитель', minWidth: 150, align: 'left' },
    { id: 'date', label: 'Дата', minWidth: 50, align: 'center' },
    { id: 'time', label: 'Час', minWidth: 50, align: 'center' },
    { id: 'room', label: 'Класс', minWidth: 50, align: 'center' },
    { id: 'duration', label: 'Трывалість', minWidth: 50, align: 'center' },
    { id: 'actions', label: 'Дії', minWidth: 50, align: 'center' },
];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },

    cell: {
        padding: '2px',
        textAlign: 'center'
    },

});

function StudentTransfers(props) {
    const classes = useStyles();
    const {tarnsferedLessons, deleteTransfer, date, confirmTransfer} = props;

    const deleteTrasferedLesson = id => {
        deleteTransfer(id, date);
    };

    const confirmTrasferedLesson = lesson => {
        const price = lesson.teacher.prices.filter(price => price.type === lesson.lesson.type && lesson.lesson.discipline === price.discipline)[0].priceValue;
        const confirmedLesson = {
            lesson: lesson.lesson,
            teacher: lesson.teacher,
            student: lesson.lesson.student,
            lessonDate: lesson.transferDate,
            time: lesson.transferTime,
            price: price
        };
        confirmTransfer(confirmedLesson, date, lesson.id);
    }

    return (
        <div className='lessons-list'>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, textAlign: column.align}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tarnsferedLessons.map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            if (column.id === 'actions' && row.status != 'CONFIRMED') {
                                                return (
                                                    <TableCell className={classes.cell} key={column.id}>
                                                        <IconButton>
                                                            <NavLink to={`/admin/lessons/transfer/edit/${row.id}`}>
                                                                <EditIcon/>
                                                            </NavLink>
                                                        </IconButton>
                                                        <IconButton onClick={() => confirmTrasferedLesson(row)}>
                                                            <CheckBoxIcon/>
                                                        </IconButton>
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === 'discipline') {
                                                return (
                                                    <TableCell align={column.align}>
                                                        {row.lesson.discipline}
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === 'time') {
                                                return (
                                                    <TableCell className={classes.cell}>
                                                        {row.transferTime}
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === 'duration') {
                                                return (
                                                    <TableCell className={classes.cell}>
                                                        {row.lesson.duration}
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === 'room') {
                                                return (
                                                    <TableCell className={classes.cell}>
                                                        {row.room}
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === 'teacher') {
                                                return (
                                                    <TableCell align={column.align}>
                                                        {row.teacher.firstName + ' ' + row.teacher.lastName}
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === 'date') {
                                                return (
                                                    <TableCell className={classes.cell}>
                                                        {row.lessonDate.split('-').reverse().join('-')}
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
    )
}

StudentTransfers.propTypes = {
    tarnsferedLessons: PropTypes.array,
    deleteTransfer: PropTypes.func.isRequired,
    confirmTransfer: PropTypes.func.isRequired,
};

StudentTransfers.defaultProps = {
    tarnsferedLessons: [],
}

const mapStateToProps = ({transferLessons}) => {
    return {

    }
};

const mapDispatchToProps = dispatch => ({
    deleteTransfer: (id, date) => dispatch(deleteTrasferLesson(id, date)),
    confirmTransfer: (lesson, date, id) => dispatch(confirmTransferedLesson(lesson, date, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentTransfers);

