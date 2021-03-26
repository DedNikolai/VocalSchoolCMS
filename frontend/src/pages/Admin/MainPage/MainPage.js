import React, {Fragment, useEffect, useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
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
import {createCredit} from "../../../store/actions/credits";
import {createConfirmedLesson} from "../../../store/actions/confirmedLesson";
import {getTransferedLessonsByDate} from "../../../store/actions/transferLessons";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import {createNewConfirmedLesson} from '../../../utils/confirmLesson';
import EditIcon from '@material-ui/icons/Edit';
import {NavLink} from 'react-router-dom';
import uaLocale from "date-fns/locale/uk";
import disciplineValue from '../../../constants/disciplineValue';
import status from '../../../constants/lessonStatus';
import rooms from '../../../constants/rooms';
import './MainPage.scss';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },

    container: {
        marginTop: '30px'
    },

    cell: {
        textAlign: 'center'
    },

    colorGreen: {
        color: '#4caf50',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    colorYellow: {
        color: '#ff9100',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    colorRed: {
        color: '#ff3d00',
        textAlign: 'center',
        fontWeight: 'bold'
    }
}));

const columns = [
    { id: 'discipline', label: 'Дисципліна', minWidth: 50, align: 'center' },
    { id: 'teacher', label: 'Вчитель', minWidth: 150, align: 'center' },
    { id: 'student', label: 'Учень', minWidth: 150, align: 'center' },
    { id: 'balance', label: 'Баланс', minWidth: 50, align: 'center' },
    { id: 'time', label: 'Час', minWidth: 50, align: 'center' },
    { id: 'room', label: 'Класс', minWidth: 50, align: 'center' },
    { id: 'duration', label: 'Трывалість, хв', minWidth: 50, align: 'center' },
    { id: 'status', label: 'Статус', minWidth: 50, align: 'center' },
    { id: 'isTest', label: 'Тип', minWidth: 50, align: 'center' },
    { id: 'actions', label: 'Дії', minWidth: 150, align: 'center' },
];


function MainPage(props) {
    const {lessonsLoading, lessons, getLessonsByDate, createConfirmedLesson,
        transferedLessons, transferedLessonsByDateLoading, getTransferedLessonsList, createCreditForStudent} = props;
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [date, changeDate] = useState(new Date());

    useEffect(() => {
        getLessonsByDate(date);
        getTransferedLessonsList(date);
    }, [date]);

    const confirmLesson = (lesson) => {
        createConfirmedLesson(createNewConfirmedLesson(lesson, date), date)
    };

    const createStudentCredit = (lesson) => {
        createCreditForStudent(createNewConfirmedLesson(lesson, date), date);
    };

    const balanceColor = (num) => {
        return num === 0 ? classes.colorRed : num === 1 ? classes.colorYellow : classes.colorGreen
    };

    const statusColor = status => {
      return status === 'DELETED' ? classes.colorRed : status === 'TRANSFERED' ? classes.colorYellow : classes.colorGreen
    };
    const confirmedDate = moment(date).format().slice(0, 10);

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fixedHeightPaper}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uaLocale}>
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
                lessonsLoading || transferedLessonsByDateLoading ?
                    <div className="wrapper"><Preloader/></div>
                    :
                    <div>
                        <h2>Планові уроки</h2>
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
                                                        if (column.id === 'actions' && !row.status) {
                                                            return (
                                                                <TableCell key={column.id} className={classes.cell}>
                                                                    {/*<IconButton>*/}
                                                                        {/*<NavLink to={`/admin/lessons/transfer/${row.id}/date/${date}`}>*/}
                                                                            {/*<EditIcon/>*/}
                                                                        {/*</NavLink>*/}
                                                                    {/*</IconButton>*/}
                                                                    <IconButton>
                                                                        <NavLink to={`/admin/lessons/confirm/${row.id}/${confirmedDate}`}>
                                                                            <CheckBoxIcon/>
                                                                        </NavLink>
                                                                    </IconButton>
                                                                    <IconButton>
                                                                        <NavLink to={`/admin/lessons/reject/${row.id}/date/${confirmedDate}`}>
                                                                            <CancelIcon/>
                                                                        </NavLink>
                                                                    </IconButton>
                                                                    {/*<IconButton onClick={() => createStudentCredit(row)}>*/}
                                                                        {/*<CreditCardIcon/>*/}
                                                                    {/*</IconButton>*/}
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === 'teacher') {
                                                            return (
                                                                <TableCell key={column.id} className={classes.cell}>
                                                                    {row.teacher.firstName + ' ' + row.teacher.lastName}
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === 'discipline') {
                                                            return (
                                                                <TableCell key={column.id} className={classes.cell}>
                                                                    {disciplineValue[row.discipline]}
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === 'student') {
                                                            return (
                                                                <TableCell key={column.id} className={classes.cell}>
                                                                    {row.student.firstName + ' ' + row.student.lastName}
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === 'isTest') {
                                                            return (
                                                                <TableCell key={column.id} className={classes.cell}>
                                                                    {row.isSingleLesson ? 'Разове' : 'Постійне'}
                                                                </TableCell>
                                                            )
                                                        }

                                                        if (column.id === 'balance') {
                                                            return (
                                                                <TableCell key={column.id} className={balanceColor(row.currentStudenBalance)}>
                                                                    {row.currentStudenBalance}
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === 'status') {
                                                            return (
                                                                <TableCell key={column.id} className={statusColor(row.status)}>
                                                                    {status[row.status]}
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === 'room') {
                                                            return (
                                                                <TableCell key={column.id} className={classes.cell}>
                                                                    {rooms[row.room]}
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
            }
        </Fragment>
    )
}

MainPage.defaultProps = {
    lessons: []
};

const mapStateToProps = ({lesson, transferLessons}) => ({
    lessonsLoading: lesson.lessonsByDateLoading,
    lessons: lesson.lessonsByDate,
    transferedLessons: transferLessons.transferedLessonsByDate,
    transferedLessonsByDateLoading: transferLessons.transferedLessonsByDateLoading,
});

const mapDispatchToProps = dispatch => ({
    getLessonsByDate: (day) => dispatch(getLessonsByDate(day)),
    createConfirmedLesson: (lesson, date) => dispatch(createConfirmedLesson(lesson, date)),
    getTransferedLessonsList: date => dispatch(getTransferedLessonsByDate(date)),
    createCreditForStudent: (credit, date) => dispatch(createCredit(credit, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);