import React, {Fragment, useEffect, useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import {getLessonsByDate} from "../../../store/actions/lesson";
import {createConfirmedLesson} from "../../../store/actions/confirmedLesson";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import {createNewConfirmedLesson} from '../../../utils/confirmLesson';
import './MainPage.scss'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },

    container: {
        marginTop: '30px'
    }
}));

const columns = [
    { id: 'discipline', label: 'Дисципліна', minWidth: 150, align: 'left' },
    { id: 'teacher', label: 'Вчитель', minWidth: 150, align: 'left' },
    { id: 'student', label: 'Учень', minWidth: 150, align: 'left' },
    { id: 'time', label: 'Час', minWidth: 50, align: 'center' },
    { id: 'room', label: 'Класс', minWidth: 50, align: 'center' },
    { id: 'duration', label: 'Трывалість', minWidth: 50, align: 'center' },
    { id: 'status', label: 'Статус', minWidth: 50, align: 'center' },
    { id: 'actions', label: 'Дії', minWidth: 50, align: 'center' },
];


function MainPage(props) {
    const {lessonsLoading, lessons, getLessonsByDate, createConfirmedLesson} = props;
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [date, changeDate] = useState(new Date());

    useEffect(() => {
        getLessonsByDate(date);
    }, [date]);

    const showMinutes = (minutes) => {
        return minutes ? minutes : '0'+minutes;
    }

    const confirmLesson = (lesson) => {
        createConfirmedLesson(createNewConfirmedLesson(lesson, date), date)
    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={6} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                autoOk
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={date}
                                onChange={changeDate}
                            />
                        </MuiPickersUtilsProvider>
                    </Paper>
                </Grid>
            </Grid>
            {
                lessonsLoading ?
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
                                    {lessons.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                <IconButton onClick={() => confirmLesson(row)}>
                                                                    <CheckBoxIcon/>
                                                                </IconButton>
                                                                <IconButton>
                                                                    <CancelIcon/>
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'teacher') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                {row.teacher.firstName + ' ' + row.teacher.lastName}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'student') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                {row.student.firstName + ' ' + row.student.lastName}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'time') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                {row.timeHour + ':' + showMinutes(row.timeMinutes)}
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
        </Fragment>
    )
}

MainPage.propTypes = {
    lessonsLoading: PropTypes.bool.isRequired,
    lessons: Preloader.array
};

MainPage.defaultProps = {
    lessons: []
}

const mapStateToProps = ({lesson}) => ({
    lessonsLoading: lesson.lessonsByDateLoading,
    lessons: lesson.lessonsByDate
})

const mapDispatchToProps = dispatch => ({
    getLessonsByDate: (day) => dispatch(getLessonsByDate(day)),
    createConfirmedLesson: (lesson, date) => dispatch(createConfirmedLesson(lesson, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);