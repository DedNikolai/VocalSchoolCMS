import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getAllLessons} from "../../../store/actions/lesson";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import {isLesson, isFullLesson, findLessonId} from "../../../utils/timetable";
import {NavLink} from 'react-router-dom';
import './Lessons.scss';

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
        height: '40px',
    },

    headCell: {
        backgroundColor: '#fff',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderBottom: 'none',
        borderRight: 'none',
        textAlign: 'center',
        boxSizing: 'border-box'
    },

    tableHead: {
        top: '57px'
    },

    lesson: {
        backgroundColor: '#4caf50'
    }
});

const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
const times = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];

function Lessons(props) {
    const classes = useStyles();
    const {allLessons, allLessonsLoading, getAllLessons} = props;

    useEffect(() => {
        getAllLessons();
    }, []);

    if (allLessonsLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

    const daysList = days.map(day => <TableCell className={classes.headCell} colspan="4">{day}</TableCell>);
    const roomsList = Array.apply(null, {length: 24}).map((room, index) => <TableCell className={classes.headCell} style={{top: 57}}>{index%4 + 1}</TableCell>);
    const timesList = times.map(time => {
        return (
            <TableRow>
                <TableCell className='lessons-timetable__cell lessons-timetable__cell--padding'>{time}</TableCell>
                {Array.apply(null, {length: 24}).map((item, index) => {
                    return (
                        isLesson(allLessons, time, index) ?
                                <TableCell
                                    className={`lessons-timetable__cell ${classes.lesson}`}
                                    rowspan={isFullLesson(allLessons, time, index) && 2}
                                >
                                    <NavLink
                                        to={`/admin/lessons/edit/${findLessonId(allLessons, time, index)}`}
                                        className={`lessons-timetable__lesson-link ${isFullLesson(allLessons, time, index) && 'lessons-timetable__lesson-link--double-lesson'}`}
                                    >
                                        1
                                    </NavLink>
                                </TableCell>
                        :
                            <TableCell
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
                            <TableCell className={classes.headCell} rowspan="2"></TableCell>
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

Lessons.propTypes = {
    allLessons: PropTypes.array,
    allLessonsLoading: PropTypes.bool.isRequired,
    getAllLessons: PropTypes.func.isRequired,
};

Lessons.defaultProps = {
    allLessons: [],
}

const mapStateToProps = ({lesson}) => {
    return {
        allLessons: lesson.lessons,
        allLessonsLoading: lesson.lessonsLoading
    }
};

const mapDispatchToProps = dispatch => ({
    getAllLessons: () => dispatch(getAllLessons())
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);