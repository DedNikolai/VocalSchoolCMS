import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {findLessonId, isFreeTime, isFullLesson, isLesson, isTimeClosed} from "../../utils/timetable";
import {NavLink} from 'react-router-dom';
import './TimeTable.scss';

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#fff',
    },
    container: {
        maxHeight: 600,
    },

    cell: {
        padding: '0',
        textAlign: 'center',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderBottom: 'none',
        borderRight: 'none',
        boxSizing: 'border-box',
        height: '20px',
    },

    headCell: {
        backgroundColor: '#fff',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRight: 'none',
        textAlign: 'center',
        boxSizing: 'border-box',
        padding: '7px'
    },

    tableHead: {
        top: '57px'
    },

    lesson: {
        backgroundColor: '#4caf50'
    }
});

const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];

function TimeTable(props) {
    const classes = useStyles();
    const {lessons = [], freeTime = [], week} = props;

    const daysList = days.map((day, index) =>
        <TableCell key={index} className={classes.headCell} colSpan="4">
            <div>{day}</div>
            <div>{week[index+1].split('-').reverse().join('-')}</div>
        </TableCell>);
    const roomsList = Array.apply(null, {length: 24}).map((room, index) => <TableCell key={index} className={classes.headCell} style={{top: 57}}>{index%4 + 1}</TableCell>);
    const timesList = times.map(time => {
        return (
            <TableRow key={time}>
                <TableCell className='lessons-timetable__cell lessons-timetable__cell--padding'><span className='lessons-timetable__cell-time'>{time}</span></TableCell>
                {Array.apply(null, {length: 24}).map((item, index) => {
                    return (
                        isLesson(lessons, time, index) ?
                            <TableCell key={index}
                                className={`lessons-timetable__cell ${classes.lesson} ${isFullLesson(lessons, time, index) && 'lessons-timetable__cell--border-none'}`}
                                // rowspan={isFullLesson(lessons, time, index) && 2}
                            >
                                <NavLink
                                    to={`/admin/lessons/edit/${findLessonId(lessons, time, index)}`}
                                    className={`lessons-timetable__lesson-link`}
                                >
                                    1
                                </NavLink>
                            </TableCell>
                                :
                            isTimeClosed(lessons, time, index) ?
                                <TableCell key={index}
                                    className='lessons-timetable__cell'
                                >
                                </TableCell>
                                :
                            isFreeTime(freeTime, time, index) ?
                                 <TableCell key={index}
                                     className='lessons-timetable__cell lessons-timetable__cell--grey'
                                 >
                                 </TableCell>
                                 :
                                <TableCell key={index}
                                     className='lessons-timetable__cell'
                                >
                                </TableCell>
                    )}
                )
                }
            </TableRow>
        )
    });

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" className='lessons-timetable'>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headCell} rowSpan="2"></TableCell>
                            {daysList}
                        </TableRow>
                        <TableRow>
                            {roomsList}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timesList}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

TimeTable.propTypes = {
    lessons: PropTypes.array,
};

TimeTable.defaultProps = {
    lessons: [],
}

const mapStateToProps = ({}) => {
    return {

    }
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);