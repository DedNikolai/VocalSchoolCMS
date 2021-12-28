import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import Typography from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {findLesson, isFreeTime, isLesson, isTimeClosed, isLessonStartTime} from "../../utils/timetable";
import lessonColors from "../../constants/lessonColors";
import {NavLink} from 'react-router-dom';
import './TimeTable.scss';

const LessonCell = (props) => {
    const {color, lesson, time} = props;
    const [modalIsOpen, toggleModal] = useState(false);

    return (
        <TableCell
            onMouseOver={() => toggleModal(true)}
            onMouseOut={() => toggleModal(false)}
            className={`lessons-timetable__cell ${lesson.duration === 60 && isLessonStartTime(lesson, time) && 'lessons-timetable__cell--border-none'}`}
            style={{backgroundColor: color}}
        >
            <NavLink
                to={`/admin/lessons/edit/${lesson.id}`}
                className={`lessons-timetable__lesson-link
                                                ${lesson.duration === 60 && 'lessons-timetable__lesson-link--color-transparent'}
                                    `           }
            >
                <span className={`lessons-type-symbol`}>{lesson.isSingleLesson ? '?' : ''}</span>
            </NavLink>
            <Card sx={{ minWidth: 275 }}
                  className={`lessons-timetable__cell-modal ${!modalIsOpen && 'lessons-timetable__cell-modal--hidden'}`}
            >
                <CardContent>
                    <Typography variant="body2">
                        {lesson.teacher.firstName + ' ' + lesson.teacher.lastName}
                    </Typography>
                    <Typography variant="body2">
                        {lesson.student.firstName + ' ' + lesson.student.lastName}
                    </Typography>
                    <Typography variant="body2">
                        {lesson.duration + 'хв'}
                    </Typography>
                </CardContent>
            </Card>
        </TableCell>
    )
};


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
        border: '1px solid #333',
        borderBottom: 'none',
        borderRight: 'none',
        boxSizing: 'border-box',
        height: '25px',
    },

    headCell: {
        backgroundColor: '#fff',
        border: '1px solid #333',
        borderRight: 'none',
        textAlign: 'center',
        boxSizing: 'border-box',
        padding: '7px',
        height: '10px'
    },

    tableHead: {
        top: '57px'
    },

    // lesson: {
    //     backgroundColor: '#4caf50'
    // }
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
                    const lesson = findLesson(lessons, time, index);
                    const color = lesson ? lessonColors[lesson.discipline] : 'inherit';
                    return (
                        isLesson(lessons, time, index) ?
                            <LessonCell
                                color={color}
                                lesson={lesson}
                                key={lesson.id}
                                time={time}
                            />
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